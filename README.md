# Discord Bot Examples

This repository provides the source code used throughout the Discord bot tutorial series of [TheCodingTrain](https://www.youtube.com/@TheCodingTrain). Each folder corresponds to the final code showcased in that episode of the tutorial series.

## General steps to follow when setting up your bot

### 1. Create a Discord application

-   Navigate to the [Discord Developer Portal](https://discord.com/developers/applications/) and create a new application.
-   Optionally, set the application name, description, and avatar.
-   Note down the "Application ID" (also known as "Client ID").

### 2. Create and configure your bot

-   In the Discord Developer Portal, select "Bot" from the left navigation.
-   Set a name and icon for your bot.
-   Note down the "Bot Token" (keep this secret).

### 3. Add bot to a server

-   Go to your application page in the Discord developer portal.
-   Navigate to "OAuth" -> "URL Generator".
-   Check "application.commands" and "bot".
-   Open the URL that populates at the bottom and authorize the bot to access your server.

### 4. Enable developer mode in Discord

-   Enable "Developer Mode" under the "Advanced" settings tab on your Discord client.
-   Right-click on the server icon, and select "Copy ID" to get the server ID.

### 5. Configure environment variables

Create a `.env` file in your project root and add your client ID, server ID, and bot token:

```plaintext
CLIENTID=1234
SERVERID=1234
TOKEN=1234
```

> `⚠️` **Note**: Some of the examples here require additional values in the `.env` files to function. You can always find a `.env-example` alongside the files. This contains all the environmental variables that need to be configured!

These environment variables are used to keep sensitive data, like your bot token, out of your code. This is especially important if you're sharing your code with others or storing your code publicly on GitHub. (Notice how `.env` is included in `.gitignore`.)

### 6. Deploy the code!

Follow the `README.md` files inside if each episode to deploy and run the Discord bot!

## Additional resources

-   [Discord.js Guide](https://discordjs.guide/)
-   [Discord.js Documentation](https://discord.js.org/#/docs/main/stable/general/welcome)
-   [Discord Developer Portal](https://discord.com/developers/applications/)

## Get help!

Stuck on an issue that you can't figure out how to fix? Do you want to create a new feature but don't know how to tackle it? The amazing [Coding Train Discord community](https://discord.gg/codingtrain) is always prepared to help you with any issue you're having!
