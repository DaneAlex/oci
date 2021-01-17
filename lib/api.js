var fetch = require("node-fetch");

var api = function api(opts) {

    var url = opts.url;

    var response = {};
    console.log(opts);
    const promise = fetch(url, {
        method: opts.method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${opts.accessToken}`
        },
        body: JSON.stringify(opts.body)
    });

    promise.then(res => {
        response = { 
            statusCode: res.status, 
            headers: res.headers 
        };
        return res.json();
    })
    .then(
        data => console.log(data),
        err => console.error(err)
    );
    
}

module.exports = api;