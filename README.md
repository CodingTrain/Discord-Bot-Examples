# Discord-Bots-F21

## Steps to create new bot 

1. Create node project and install discord.js module as well as dotenv.

```
$ npm init
$ npm install discord.js
$ npm install dotenv
```

2. [Create an application](https://discord.com/developers/applications/) - optionally set name, description, avatar. Note the "Application ID" (aka "Client ID").

3. Select Bot from left navigation and "Add Bot" - set name and icon. Note the "Bot Token" (keep this secret).

4. Add bot to the A2Z server with the url: `https://discord.com/oauth2/authorize?client_id=YOUR_APPLICATION_ID&scope=bot`

5. Enable "Developer Mode" on your discord client, right-click the server icon, and "copy ID" for the server ID.

6. Create a `.env` file with your CLIENTID, SERVERID, and BOTTOKEN:

```
CLIENTID=1234
SERVERID=1234
TOKEN=1234
```

7. Install additional node packages.

```
$ npm install @discordjs/builders @discordjs/rest discord-api-types
```

8. Add slash commands permission. Go to your applicaiton page in the Discord developer portal, select "OAuth", check "application.commands", and open the URL that populates at the bottom.

9. Create `deploy-commands.js`, see example code for content. Customize your commands and execute!

```
$ node deploy-commands.js
```

10. Create `bot.js`, see example code for content. Handle your commands and run the bot!

```
$ node bot.js
```
