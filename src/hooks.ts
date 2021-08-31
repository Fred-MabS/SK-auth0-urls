import cookie from 'cookie'
import { decode } from 'jsonwebtoken';
import * as dotenv from "dotenv";

dotenv.config();

const protectedPages = ['/admin', '/admin/index.svelte', '/api/data'];
const issuer = process.env["ISSUER"];

export async function handle({request, resolve}) {
  const cookies = cookie.parse(request.headers.cookie || '');
  // console.log('Current cookies:');
  // console.dir(cookies);
  console.log('HOOKS request.path = ', request.path);
  
  // code here happens before the endpoint or page is called
  if (protectedPages.includes(request.path)) {
    console.log('THIS SHOULD BE PROTECTED');
    console.log(cookies.user);
    console.log(cookies.idToken);
    console.log(isTokenOK(cookies.idToken))

    if (!cookies.user || !isTokenOK(cookies.idToken)) {
      return {
        status: 401
      }
    }
  } else {
    console.log('THIS PAGE DOES NOT REQUIRE PROTECTION');
  }
  request.locals.user = cookies.user;
  request.locals.token = cookies.token;
  request.locals.idToken = cookies.idToken;
  console.log({ user: request.locals.user })

  const response = await resolve(request)

  // code here happens after the endpoint or page is called

  response.headers['set-cookie'] = [
    `user=${request.locals.user || ''}; Path=/; HttpOnly`,
    `token=${request.locals.token || ''}; Path=/; HttpOnly`,
    `idToken=${request.locals.idToken || ''}; Path=/; HttpOnly`,
  ];

  return response
}

export async function getSession(request) {
    return {
      user: request.locals.user
    }
}



function isTokenOK(idToken: string): boolean {
  const decoded = decode(idToken);
  if (!decoded) return false;
  console.log(`decoded: ${JSON.stringify(decoded)}`)
  if (decoded.iss !== issuer) return false;
  const dateExp = new Date(decoded.exp*1000);
  console.log(dateExp)
  if (dateExp < new Date()) return false;
  return true;
}