const api = require("./api");

var client = function client(opts){

    if(this instanceof client == false) { 
        return new client (opts); 
    }

    this.AccessToken = opts.AccessToken; 
    this.BotUsername = opts.BotUsername;
    this.OwncastUrl = opts.OwncastUrl;
}

client.prototype.sendSystemMessage = function sendSystemMessage(message){
    if(!message) { return };

    var opts = {
        url: this.OwncastUrl + "/api/integrations/chat/system",
        accessToken: this.AccessToken,
        method: "POST",
        body: {"body": message}
    }

    return api(opts);
}

client.prototype.sendUserMessage = function sendUserMessage(message){
    if(!message) { return };

    var opts = {
        url: this.OwncastUrl + "/api/integrations/chat/user",
        accessToken: this.AccessToken,
        method: "POST",
        body: {"author": this.BotUsername, "body": message}
    }

    return api(opts);
}

if(typeof module !== "undefined" && module.exports) {
	module.exports = client;
}
