import type { RequestHandler } from "@sveltejs/kit";
import * as dotenv from "dotenv";

dotenv.config();

export const post: RequestHandler = async (request) => {
  console.log('userinfo.ts: post');
  const requestPayload = request.body;
  console.dir(requestPayload);
  const userURL = process.env["USER_URL"];
  const accessToken = requestPayload.accessToken;
  const response = await fetch(userURL, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await response.json();
  console.log(json);
  return {
    body: json
  }
};
