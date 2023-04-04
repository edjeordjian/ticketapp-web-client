const JSON_HEADER = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

const postTo = (url,
                body) => {
    return fetch(url, {
            method: "POST",
            headers: JSON_HEADER,
            body: JSON.stringify(body)
        }
    ).then(response =>
        response.json()
    ).catch(error => {
        return {
            error: error.toString()
        };
    } );
};

const getTo = (url) => {
    return fetch(url, {
            method: "GET",
            headers: JSON_HEADER
        }
    ).then(response =>
        response.json()
    ).catch(error => {
        return {
            error: error.toString()
        };
    } );
};

export {
    postTo, getTo
};
