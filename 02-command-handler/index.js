// Command Handler
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/06-command-handler.html
// https://youtu.be/B60Q74FHFBQ

console.log("Beep beep! 🤖");

// Setup dotenv and tell it to look for `.env` in the same folder as our main file
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const fs = require("node:fs");
const path = require("node:path");

const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = process.env.TOKEN;
client.login(token);

client.on("ready", readyDiscord);

function readyDiscord() {
  console.log("💖");
}

// Create a new Collection to hold our slash commands
client.commands = new Collection();

// Read the slash commands from the `commands` directory
const commandsPath = path.join(__dirname, "commands");
console.log(commandsPath);
const commandFolders = fs.readdirSync(commandsPath);

// Add slash commands to the client
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
