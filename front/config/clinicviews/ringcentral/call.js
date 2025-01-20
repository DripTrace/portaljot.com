const RC = require("@ringcentral/sdk").SDK;

const RINGOUT_CALLER = "+18888996669";
const RECIPIENT_NUMBER = "";
const SERVER_URL = "https://platform.ringcentral.com";
const CLIENT_ID = "X7rRPyGO3hObKJMxxi8iYN";
const CLIENT_SECRET = "W1WXq78VB1zbGWcmejhO1H3i9Rayma6xCcFN3Pah6TwT";
const JWT_TOKEN = "eyJraWQiOiI4NzYyZjU5OGQwNTk0NGRiODZiZjVjYTk3ODA0NzYwOCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczovL3BsYXRmb3JtLnJpbmdjZW50cmFsLmNvbS9yZXN0YXBpL29hdXRoL3Rva2VuIiwic3ViIjoiNjc0OTg1MDM1IiwiaXNzIjoiaHR0cHM6Ly9wbGF0Zm9ybS5yaW5nY2VudHJhbC5jb20iLCJleHAiOjM4NzczNjYxODUsImlhdCI6MTcyOTg4MjUzOCwianRpIjoiQXE3X0Q1VU1TVm04OW5YcWwzdlh4QSJ9.C3pKSCjuBfMXlzvRuEX-kjmrV2yRsenaby9Mhezui9NxnjbNvecrxN6Ya7kTtefi4_Ymqy3l_ILbFOe2teN1JWLgA7GRzmoX55aMUf-LBadAwZluKyZX7pdQ_b0658Mct6WnPpMlSoJFoT-KaeIB6s8mAlaSpe7qWiVZhvozCQr6jKMpQcigawFEkNi3XlU9jICHDjzJJwIv4GzRid6qfN8_U980zMcUMMJ4JSR0ie4bif0miTZHKPjZMs2X3SfHmcutkIcE7SngDNQFGkJhUSYMhqCYqnVPv13TJtTl6DuIztMcIrvBk0jeju8sCyyl3g6cDb4Zgol_qxiey4jlfg";

var rcsdk = new RC({
    server: SERVER_URL,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
});

var platform = rcsdk.platform();

platform.login({
    jwt: JWT_TOKEN,
});

platform.on(platform.events.loginSuccess, () => {
    call_ringout();
});

async function call_ringout() {
    try {
        var resp = await platform.post(
            "/restapi/v1.0/account/~/extension/~/ring-out",
            {
                from: { phoneNumber: RINGOUT_CALLER },
                to: { phoneNumber: RECIPIENT_NUMBER },
                playPrompt: false,
            }
        );
        var jsonObj = await resp.json();
        console.log("Call placed. Call status: " + jsonObj.status.callStatus);
    } catch (e) {
        console.log(e.message);
    }
}
