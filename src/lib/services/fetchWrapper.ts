
function handleErrors(response) {
    if (!response.ok) {
        console.log('[fetchWrapper] THIS IS NOT OK');
        return Promise.reject({
            status: response.status,
            statusText: response.statusText
        })
    }
    return response;
}

// TODO update type of data to enable the post of an Array
export async function post(url: string, data: Record<string, unknown>): Promise<void|Response> {
    console.log(`Posting to ${url}`);
    console.dir(data);
    return await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        body: JSON.stringify(data)
    })
    .then( handleErrors )
    .then( (resp) => {
        console.log('THIS POST IS OK');
        // console.dir(resp.headers);
        return resp;
    })
    .catch( (error) => {
        console.log('THIS POST FAILED:');
        console.dir(error);
        //console.log('dir');
        return Promise.reject({
            status: error.status,
            statusText: error.statusText
        })
    })
}
