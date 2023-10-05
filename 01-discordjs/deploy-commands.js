// Slash Commands Deployment Script
// https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands/

// Importing modules using ES6 syntax
import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import fs from 'node:fs';

config(); // Using dotenv config function directly

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`); // Using dynamic import
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(`[WARNING] The command ${file} is missing a required "data" or "execute" property.`);
  }
}

// Construct and prepare an insance of the REST module
const rest = new REST().setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.SERVERID), {
      body: commands,
    });

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
