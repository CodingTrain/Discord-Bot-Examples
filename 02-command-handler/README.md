# Choo Choo Discord Bot! (Deploying Commands)

[<img src="https://i.ytimg.com/vi/7A-bnPlxj4k/maxresdefault.jpg" alt="Discord Bot Tutorial" width="320">](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6avBYxeBSwF48YhAnSn_sA4)

🚂🌈💖🤖 All aboard! [Coding Train Tutorial Videos](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6avBYxeBSwF48YhAnSn_sA4) 🚂🌈💖🤖

Once you've set up your bot, it's time to add commands!

## Organizing command folders

1. Create a folder named `commands`. This is where we'll put all of our command files.
2. discord.js recommends you organize commands in topic folders under your `commands` folder. Inside your `commands` folder, add a folder called `testing`.

## Writing a command

1. In `testing`, let's add our first command file! This command will just send a random phrase to the user whenever it gets called. In this example the file is called `choochoo.js`, but you can call it whatever you want!
2. Import the `SlashCommandBuilder` class and make a list of phrases the bot should say:

```javascript
const { SlashCommandBuilder } = require("discord.js");
const replies = ["🚂🌈💖", "Choo choo!", "Ding! 🛎", "Never forget this dot!"];
```

3. Set command options and write an `execute()` function:

```javascript
// We're putting this all inside `module.exports` so our command handler will be able to import our command later
module.exports = {
  data: new SlashCommandBuilder()
    .setName("choochoo")
    .setDescription("Replies with a random phrase!"),
  async execute(interaction) {
    const index = Math.floor(Math.random() * replies.length);
    await interaction.reply(replies[index]);
  },
};
```

## Writing the command handler

Now our main bot file needs to import our command files.

1. In your `index.js`, add a command collection and set your command folder:

```javascript
client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);
```

2. Add a nested `for` loop to iterate over command folders and import your commands, logging to the console if the command has an error:

```javascript
for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandFolder = path.join(commandsPath, folder);
  const commandFiles = fs
    .readdirSync(commandFolder)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandFolder, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or execute property.`
      );
    }
  }
}
```

## Registering commands

1. Create a file in the root of your project called `deploy-commands.js`
2. Copy the deployment script from the discord.js [guide](https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands)
3. Replace...

```javascript
const { clientId, guildId, token } = require("./config.json");
```

...with...

```javascript
require("dotenv").config();
```

4. And replace...

```javascript
Routes.applicationGuildCommands(clientId, guildId),
```

...with....

```javascript
Routes.applicationGuildCommands(
  process.env.CLIENTID,
  process.env.SERVERID
),
```

5. Run the deployment script!

```bash
$ node deploy-commands.js
```

## Executing commands

1. Back in `index.js`, let's add a callback that will execute a command whenever it's called by the user.

```javascript
client.on(Events.InteractionCreate, async (interaction) => {
  // Ignore interaction if it isn't a slash command
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction.client.commands);

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  // Execute the command and send a followup if the command fails
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
  console.log(interaction);
});
```

2. Run the bot!

```bash
$ node index.js
```
