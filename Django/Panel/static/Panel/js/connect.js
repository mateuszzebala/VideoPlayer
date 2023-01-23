function send(what, to=window.location.pathname, method="POST"){
    return fetch(to, {
        method: method,
        body:JSON.stringify(what),
        headers:{
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf_token,
        }
    })
}