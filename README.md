# Discord Bot Examples

## Steps to create your bot!

The following is based on the [discord.js guide](https://discordjs.guide/#before-you-begin).

1. Create node project and install discord.js module as well as dotenv.

```
$ npm init
$ npm install discord.js dotenv
```

2. [Create an application](https://discord.com/developers/applications/) - optionally set name, description, avatar. Note the "Application ID" (aka "Client ID").

3. Select Bot from left navigation and "Add Bot" - set name and icon. Note the "Bot Token" (keep this secret).

4. Add bot to the A2Z server with the url: `https://discord.com/oauth2/authorize?client_id=YOUR_APPLICATION_ID&scope=bot`

5. Enable "Developer Mode" under the "Advanced" settings tab on your discord client, right-click the server icon, and "copy ID" for the server ID.

6. Create a `.env` file with your CLIENTID, SERVERID, and TOKEN:

```
CLIENTID=1234
SERVERID=1234
TOKEN=1234
```

7. Add slash commands permission. Go to your applicaiton page in the Discord developer portal, select "OAuth", check "application.commands", and open the URL that populates at the bottom.

8. Create `deploy-commands.js`, see example code for content. Customize your commands and execute!

```
$ node deploy-commands.js
```

9. Create `bot.js`, see example code for content. Handle your commands and run the bot!

```
$ node bot.js
```
