
(node:44610) UnhandledPromiseRejectionWarning: SyntaxError: Unexpected end of JSON input
    at JSON.parse (<anonymous>)
    at Response.json (file:///Users/fred/Dev/PoC/Auth/authy-sveltekit-github/node_modules/@sveltejs/kit/dist/install-fetch.js:546:15)
    at processTicksAndRejections (internal/process/task_queues.js:95:5)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:44610) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:44610) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.





hooks.ts:handle()
    récupère les éventuels cookies de la requête
    décide s'il faut donner l'accès ou pas (check le token / redirect 401)
    mets les cookies dans request.locals
    résoud la requête
    positionne les cookies selon ce qu'il reste dans request.locals

login.ts
    redirige vers le form d'authent chez auth0 avec un redirect_url sur /callback

logout.ts
    efface les données request.locals comme ça il n'y aura plus rien quand on reviendra dans handle et ça videra les cookies
    redirect vers /

callback.ts:get()
    reçoit un code (query param) qui permet de réclamer les tokens
    appelle retrieveAccessToken qui requête localhost/api/token avec le code et reçoit { accessToken, idToken }
    idToken est un JWT, on le décode, on renseigne request.locals comme ça au retour dans handle() on aura les bonnes données pour les cookies
    redirect vers /

/api/token.ts:post { code: "le code" }
    appelle le endpoint de récupération de token chez auth0
    renvoie { accessToken, idToken }

__layout.svelte:
    si on ne le met pas le filtrage dans la fonction load, alors on peut cliquer sur une page sans être authentifié et ça passe, par contre si on refresh cette page, là on a bien la 401: quand on va sur la page ça n'appelle pas hooks.ts:handle(), mais le refresh l'appelle