# Auth0 Login + Context based Data Example

![https://media.giphy.com/media/zBtFBVVo5iZPO/giphy.gif](https://media.giphy.com/media/zBtFBVVo5iZPO/giphy.gif)

# prerequisites

generate self-signed ssl cert, and put the files in `api/`

```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

# use

start api with F5 (vscode), or run `npm start`. api will be available on `localhost:5000`

start frontend with `npm start`. frontend will be available on `localhost:3000`

register or signup with google.

create sites. sites are scoped to your user.

this example is using an in memory db, so say bye bye to your changes if you restart the backend process ;)

# notes

## auth0 steps

1. create api -> create scopes
2. create client -> enable scopes
3. setup audience in api
4. request token for audience in client (config) -> otherwise we dont get a valid jwt

https://auth0.com/docs/universal-login/configure-default-login-routes
