# Discord Bot Examples

This repository provides examples and a step-by-step guide on how to create a simple Discord bot using [discord.js](https://discord.js.org/#/).

## Steps to Create Your Bot!

### 1. Set Up Your Project

Create a new Node.js project and install necessary dependencies.

```sh
$ npm init
$ npm install discord.js dotenv
```

### 2. Create a Discord Application

- Navigate to the [Discord Developer Portal](https://discord.com/developers/applications/) and create a new application.
- Optionally, set the application name, description, and avatar.
- Note down the "Application ID" (also known as "Client ID").

### 3. Create and Configure Your Bot

- In the Discord Developer Portal, select "Bot" from the left navigation and click "Add Bot".
- Set a name and icon for your bot.
- Note down the "Bot Token" (keep this secret).

### 4. Add Bot to a Server

- Go to your application page in the Discord developer portal.
- Navigate to "OAuth" -> "URL Generator".
- Check "application.commands" and "bot".
- Open the URL that populates at the bottom and authorize the bot to access your server.

### 5. Enable Developer Mode in Discord

- Enable "Developer Mode" under the "Advanced" settings tab on your Discord client.
- Right-click on the server icon, and select "Copy ID" to get the server ID.

### 6. Configure Environment Variables

Create a `.env` file in your project root and add your client ID, server ID, and bot token:

```plaintext
CLIENTID=1234
SERVERID=1234
TOKEN=1234
```

These environment variables are used to keep sensitive data, like your bot token, out of your code. This is especially important if you're sharing your code with others or storing your code publicly on GitHub. (Notice how `.env` is included in `.gitignore`.)

### 7. Create the bot code!

Create `bot.js` (or `index.js`) and paste this code:

```javascript
import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, readyDiscord);

// Login to Discord with your client's token
client.login(process.env.TOKEN);

function readyDiscord() {
  console.log('💖');
}
```

Run to see if it works! (If you see the 💖 it's working!)

```sh
$ node bot.js
```

## 8. Create a Command

Each command should be handled in a separate JS file, there are many ways you can manage this, but I suggest putting them in a folder called commands:

```javascript
import { SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('choochoo')
    .setDescription('Says choo choo back!'),
  async execute(interaction) {
    await interaction.reply('Choo Choo! 🚂');
  },
};
```

## 9. Deploy the commands

Create `deploy-commands.js` and copy the example code. Then run it!

```sh
node deploy-commands.js
```

You only have to do this once. If you change the command (altering descriptions, changing options, etc.), then you do need to re-run `deploy-commands.js`.

## 10. Add the code to handle the command

You also need to handle the command in bot.js, add the equivalent code:

```javascript
import * as choochoo from './commands/choochoo.js';

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'choochoo') {
    await choochoo.execute(interaction);
  }
});
```

Then run the bot again!

```sh
node bot.js
```

## Recap of the code elements

- `commands/choochoo.js`: Defines a simple slash command.
- `index.js`: Handles interactions with Discord and executes commands.
- `deploy-commands.js`: Script to register slash commands with Discord API.

## Additional Resources

- [Discord.js Guide](https://discordjs.guide/)
- [Discord.js Documentation](https://discord.js.org/#/docs/main/stable/general/welcome)
- [Discord Developer Portal](https://discord.com/developers/applications/)
