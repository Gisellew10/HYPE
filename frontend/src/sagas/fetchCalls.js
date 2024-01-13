import { endpointRoot } from "./endpoints";


export const fetchCall = async (endpoint, method, body) => {

    body = body || {};
    const authToken = body.authToken || "";
    body.authToken = null;

    let response;
    
    if (method === "GET") {
        response = await fetch(endpointRoot.concat(endpoint), {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "authToken": authToken,
            },
        });
    } else {
        response = await fetch(endpointRoot.concat(endpoint), {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "authToken": authToken,
            },
            body: JSON.stringify(body),
        });
    }

    if (response.status !== 200 && response.status !== 201) {

        // <-- handle generic error codes here

        if (response.status === 401) {
            
        }
    }
    return response;
}


