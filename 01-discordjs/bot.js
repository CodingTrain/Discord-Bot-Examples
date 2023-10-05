// Import the necessary discord.js classes using ES6 syntax
import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { readFile, readdir } from 'fs/promises'; // Node.js built-in module for file system actions
import path from 'path';
import * as choochoo from './commands/choochoo.mjs'; // Assume the command file also uses ES6 syntax
import * as gif from './commands/gif.mjs'; // Assume the command file also uses ES6 syntax

dotenv.config();

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

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'choochoo') {
    await choochoo.execute(interaction);
  } else if (interaction.commandName === 'gif') {
    await gif.execute(interaction);
  }
});
