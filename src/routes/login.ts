const authURL = import.meta.env.VITE_AUTH_URL;
const clientId = import.meta.env.VITE_CLIENT_ID;

export async function get(req) {
  //const sessionId = '1234'; // dans callback on peut vérifier cette valeur
  const redir = 'http://localhost:3000/callback';
  return {
    status: 302,
    headers: {

      location: `${authURL}?response_type=code&client_id=${clientId}&redirect_uri=${redir}&scope=openid%20profile%20email`
    }
  }
}
