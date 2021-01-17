var fetch = require("node-fetch");
var base64 = require("base-64");
var log = require("./log");

var integration = function integration(opts, callback) {

    var url = opts.url;
    var response = {};

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
        json => callback(null, response, json),
        err => log("ERROR", err)
    );
    
}

var api = function api(opts, callback) {

    var url = opts.url;
    var response = {};

    const promise = fetch(url, {
        method: opts.method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${base64.encode("admin:" + opts.streamKey)}`
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
        json => callback(null, response, json),
        err => log("ERROR", err)
    );
    
}

module.exports = {
    integration, 
    api
};