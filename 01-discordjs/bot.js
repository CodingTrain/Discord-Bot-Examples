// Import the necessary discord.js classes using ES6 syntax
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';

// Import everything the commands/choochoo.js file exports and store it inside the choochoo variable.
import * as choochoo from './commands/choochoo.js';

// Call the config() function on dotenv to load the environmental variables from the .env file
config();

// Create a new Discord client instance and define its intents
// Intents are subscriptions to specific events and define what events your bot will receive updates for
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

// A function executed when the Discord client is ready and connected
function readyDiscord() {
  console.log('🚂 ', client.user.tag);
}

// A function executed when the Discord client receives an interaction
async function handleInteraction(interaction) {
  // Ensure interaction is a command before proceeding
  if (!interaction.isCommand()) return;

  // Command execution mapping
  if (interaction.commandName === 'choochoo') {
    await choochoo.execute(interaction);
  }
}

// Event listener that executes once when the client successfully connects to Discord
client.once(Events.ClientReady, readyDiscord);

// Event listener for when a slash command is executed
client.on(Events.InteractionCreate, handleInteraction);

// Login to Discord with your bot's token (stored in the .env file)
client.login(process.env.TOKEN);

