const api = require("./api");
const log = require("./log");

var client = function client(opts){

    if(this instanceof client == false) { 
        return new client (opts); 
    }

    this.AccessToken = opts.AccessToken; 
    this.BotUsername = opts.BotUsername;
    this.StreamKey = opts.StreamKey;
    this.OwncastUrl = opts.OwncastUrl;
}

client.prototype.sendSystemMessage = function sendSystemMessage(message){
    if(!message) { return log("ERROR", "Message should not be empty") };

    var opts = {
        url: this.OwncastUrl + "/api/integrations/chat/system",
        accessToken: this.AccessToken,
        method: "POST",
        body: {"body": message}
    }

    return api.integration(opts, (err, res, jsonBody) => {
        if(err){
            return log("ERROR", err);
        }

        log("INFO", `Successfully sent: ${message}`);
        return jsonBody;
    });
}

client.prototype.sendUserMessage = function sendUserMessage(message){
    if(!message) { return log("ERROR", "Message should not be empty") };

    var opts = {
        url: this.OwncastUrl + "/api/integrations/chat/user",
        accessToken: this.AccessToken,
        method: "POST",
        body: {"author": this.BotUsername, "body": message}
    }

    return api.integration(opts, (err, res, jsonBody) => {
        if(err){
            return log("ERROR", err);
        }

        log("INFO", `Successfully sent: ${message}`);
        return jsonBody;
    });
}

client.prototype.getChatMessages = function getChatMessages(callback){
    var opts = {
        url: this.OwncastUrl + "/api/chat",
        streamKey: this.StreamKey,
        method: "GET"
    }

    return api.api(opts, (err, res, jsonBody) => {
        if(err){
            return log("ERROR", err);
        }

        log("INFO", "Get Messages Succeeded");
        return callback(jsonBody);
    });

}

if(typeof module !== "undefined" && module.exports) {
	module.exports = client;
}
