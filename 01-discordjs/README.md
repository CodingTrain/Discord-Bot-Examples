# Episode 1

## Steps to deploy your bot!

Make sure you first follow all the steps in the main README file of this repository before trying to deploy the bot. These include some steps on creating a Discord application in case you don't have that yet!

### 1. Set up your project

Make sure you open a terminal inside this directory! Next, execute the following code to install all the required dependencies:

```sh
$ npm install
```

### 2. Deploy the commands

Deploy the slash commands so Discord knows about them and can show them to your Discord users! Use the following command to deploy the commands:

```sh
node deploy-commands.js
```

You only have to do this once. If you change the command (altering descriptions, changing options, etc.), then you do need to re-run `deploy-commands.js`.

### 10. Start the bot

Now start the bot using the following command:

```sh
node bot.js
```

You should get a little message indicating the bot is ready! If you get an error, make sure you've entered the correct bot token in the `.env` file!

### Recap of the code elements showcased in this episode

-   `commands/choochoo.js`: Defines a simple slash command.
-   `bot.js`: Handles interactions with Discord and executes commands.
-   `deploy-commands.js`: Script to register slash commands with Discord API.
