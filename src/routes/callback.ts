import { base } from '$app/paths';
import { post } from '$lib/services/fetchWrapper';
import { decode } from 'jsonwebtoken';

// const userURL = import.meta.env.VITE_USER_URL;

export async function get(req) {
  const code = req.query.get("code");
  // const state = req.query.get("state"); dans login.ts on peut positionner cette valeur, la stocker  et la comparer ici à celle qu'on reçoit en retour
  // console.log(`ICI ${code}`);

  const accessTokenReponse = await retrieveAccessToken(code);
  const { accessToken, idToken } = accessTokenReponse;
  const decoded = decode(idToken);
  // console.log(`decoded token: ${decoded}`);
  // console.dir(decoded);

  // console.log(`callback.ts: accessToken=${accessToken}`);
  // console.dir(accessToken);

  // this mutates the locals object on the request
  // and will be read by the hooks/handle function
  // after the resolve
  req.locals.user = decoded.name;
  req.locals.token = accessToken;
  req.locals.idToken = idToken;
  return {
    status: 302,
    headers: {
      location: "/",
    },
  };
}


async function retrieveAccessToken(code) {
  // const url = `${base}/api/token`;
  const url = `http://localhost:3000/api/token`;
  const data = { code: code };
  const tokenResponse = await post(url, data);
  if (tokenResponse.ok) {
    console.dir(tokenResponse.headers);
    return await tokenResponse.json();
  } else {
    return Promise.reject(tokenResponse);
  }
}