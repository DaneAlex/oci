# oci.js
 Package for interfacing with the Owncast APIs.

## Install

### Node

```bash
$ npm install oci.js
```

```js
const oci = require('oci.js');

const client = new oci.Client({
    AccessToken = YOUR_ACCESS_TOKEN,
    StreamKey = YOUR_STREAM_KEY,
    BaseUrl = YOUR_STREAM_URL,
    BotUsername = YOUR_BOTS_NAME
});

client.getChatMessages(res => {
    console.log(res);
});

```