const logoutURL = import.meta.env.VITE_LOGOUT_URL;
const clientId = import.meta.env.VITE_CLIENT_ID;

export async function get(request) {
    request.locals.user = null;
    request.locals.token = null;
    request.locals.idToken = null;
    const logout = await fetch(`${logoutURL}?federated&client_id=${clientId}`);
    return {
      status: 302,
      headers: {
        location: '/'
      }
    }
}
