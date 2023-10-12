// Import the necessary discord.js classes using ES6 syntax
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import * as choochoo from './commands/choochoo.js';
import * as gif from './commands/gif.js';

config();

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, readyDiscord);

// Login to Discord with your client's token
client.login(process.env.TOKEN);

function readyDiscord() {
  console.log('💖 Logged in as', client.user.tag);
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'choochoo') {
    await choochoo.execute(interaction);
  } else if (interaction.commandName === 'gif') {
    await gif.execute(interaction);
  }
});
