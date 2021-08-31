import type { RequestHandler } from "@sveltejs/kit";
import * as dotenv from "dotenv";

dotenv.config();

// function retrieveAccessToken(code) {
//   return fetch(tokenURL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json", Accept: "application/json" },
//     body: JSON.stringify({
//       client_id: clientId,
//       client_secret: secret,
//       code,
//     }),
//   })
//     .then((r) => r.json())
//     .then((r) => r.access_token);
// }

export const post: RequestHandler = async (request) => {
  console.log("token.ts: POST /api/token");
//   console.log(request.body);
  const requestPayload = request.body;
  const tokenURL = process.env["TOKEN_URL"];
  const clientId = process.env["CLIENT_ID"];
  const clientSecret = process.env["CLIENT_SECRET"];

  const code = requestPayload.code;
  const accessToken = await fetch(tokenURL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: 'http://localhost:3000/callback'
    }),
  })
    .then((r) => r.json())
//    .then((r) => r.access_token);
  console.log(`accessToken: ${accessToken.access_token}`);
  console.dir(accessToken);
  return {
    body: {
      accessToken: accessToken.access_token,
      idToken: accessToken.id_token
    },
  };
};
