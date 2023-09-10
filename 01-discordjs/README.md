# Choo Choo Discord Bot! (Setting Up Your Bot)

[<img src="https://i.ytimg.com/vi/7A-bnPlxj4k/maxresdefault.jpg" alt="Discord Bot Tutorial" width="320">](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6avBYxeBSwF48YhAnSn_sA4)

🚂🌈💖🤖 All aboard! [Coding Train Tutorial Videos](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6avBYxeBSwF48YhAnSn_sA4) 🚂🌈💖🤖

## Steps to create new bot

1. Create node project and install discord.js and dotenv module.

```bash
$ npm init
$ npm install discord.js dotenv
```

3. [Create an application](https://discord.com/developers/applications/) - optionally set name, description, avatar.

4. Select Bot from left navigation and "Add Bot" - set name and icon.

5. Add bot to the A2Z server with the url: `https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot`

6. Write the code!

Load environment variables using `dotenv` and `.env`:

1. Create `.env` file:

```dotenv
CLIENTID=123456789
SERVERID=123456789
TOKEN=123456789
```

2. Use `process.env` to access `.env` variables in your javascript:

```javascript
const dotenv = require("dotenv");
const TOKEN = process.env.TOKEN;

// We'll use these later when we deploy commands
const clientID = process.env.CLIENTID;
const serverID = process.env.SERVERID;
```

Login to bot account:

```javascript
const { Client, Events, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(TOKEN);
```

Callback for when the bot is connected and ready:

```javascript
client.once(Events.ClientReady, () => {
  console.log("Ready!");
});
```

9. Run the bot!

```
$ node index.js
```
