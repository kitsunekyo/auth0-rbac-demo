const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { startDb } = require("./database/mongo");
const { addUser, getUsers, getUser } = require("./database/users");
const { addSite, getSites } = require("./database/sites");

const port = process.env.PORT || 5000;

const requireToken = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://mostvierteltech.eu.auth0.com/.well-known/jwks.json",
    }),
    audience: "auth-example-express",
    issuer: "https://mostvierteltech.eu.auth0.com/",
    algorithms: ["RS256"],
});

const checkTokenUser = async (req, res, next) => {
    if (!req.user) {
        res.status(400).json({
            message: "no userdata available",
        });
    }

    const sub = req.user.sub;
    const user = await getUser(sub);

    if (!user) {
        await addUser(req.user);
    }

    next();
};
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));

app.get("/api/users", requireToken, checkTokenUser, async (req, res) => {
    res.json(await getUsers());
});

app.get("/api/sites", requireToken, checkTokenUser, async (req, res) => {
    res.json(await getSites(req.user.sub));
});

app.post("/api/sites", requireToken, checkTokenUser, async (req, res) => {
    const site = {
        name: req.body.name,
        userSub: req.user.sub,
    };

    res.json(await addSite(site));
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status);
    res.json({ error: err });
});

startDb().then(async () => {
    await addSite({ name: "you should not see me", userSub: "" });
    https
        .createServer(
            {
                key: fs.readFileSync("./key.pem"),
                cert: fs.readFileSync("./cert.pem"),
                passphrase: "local",
            },
            app
        )
        .listen(port, () => {
            console.log(`API listening on https://localhost:${port}`);
        });
});
