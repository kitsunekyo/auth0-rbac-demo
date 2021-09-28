const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");

let database = null;

async function startDb() {
    const mongo = new MongoMemoryServer();
    const mongoDBURL = await mongo.getUri();
    const connection = await MongoClient.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true });
    database = connection.db();
}

async function getDb() {
    if (!database) await startDb();
    return database;
}

module.exports = {
    getDb,
    startDb,
};
