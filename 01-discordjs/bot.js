// Import the necessary discord.js classes using ES6 syntax
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import * as choochoo from './commands/choochoo.js';
import * as gif from './commands/gif.js';
import * as randomwalk from './commands/randomwalk.js';
import * as roshambo from './commands/roshambo.js';

// Call the config() function on dotenv to load the environmental variables from the .env file
config();

// Create a new Discord client instance and define its intents
// Intents are subscriptions to specific events and define what events your bot will receive updates for
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

// Event listener that executes once when the client successfully connects to Discord
client.once(Events.ClientReady, readyDiscord);

// Login to Discord with your bot's token (stored in the .env file)
client.login(process.env.TOKEN);

// A function executed when the Discord client is ready and connected
function readyDiscord() {
  console.log('💖 Logged in as', client.user.tag);
  startTalking();
}

// Event listener for when a slash command is executed
client.on('interactionCreate', async (interaction) => {
  // Ensure interaction is a command before proceeding
  if (!interaction.isCommand()) return;

  // Command execution mapping
  if (interaction.commandName === 'choochoo') {
    await choochoo.execute(interaction);
  } else if (interaction.commandName === 'gif') {
    await gif.execute(interaction);
  } else if (interaction.commandName === 'randomwalk') {
    await randomwalk.execute(interaction);
  } else if (interaction.commandName === 'roshambo') {
    await roshambo.execute(interaction);
  }
});

// Function that sends a message to a specific channel every 60 minutes
function startTalking() {
  // Retrieve the desired channel using its ID
  const channel = client.channels.cache.get('1139569830761070651');

  // Send a message to the channel every 60*60*1000 milliseconds (1 hour)
  setInterval(() => {
    channel.send('Hello, this is your bot speaking!');
  }, 60 * 60 * 1000);
}

// Event listener for when a reaction is added to a message
client.on('messageReactionAdd', (reaction, user) => {
  // Retrieve the emoji used for the reaction
  let emoji = reaction.emoji.name;

  // If the emoji is custom, format it accordingly
  if (reaction.emoji.id) {
    emoji = `<:${reaction.emoji.name}:${reaction.emoji.id}>`;
  }

  // Retrieve the channel using its ID and send a message indicating the user and emoji
  const channel = client.channels.cache.get('1139569830761070651');
  channel.send(`${user.username} reacted with ${emoji}`);
});

// Event listener for handling any received message
client.on('messageCreate', (message) => {
  // If the message author is not a bot and the bot is mentioned in the message
  if (!message.author.bot && message.mentions.has(client.user)) {
    // Remove the bot mention from the message content
    const mention = /<@.*?\s/;
    const content = message.content.replace(mention, '').trim();

    // Respond to the message
    message.reply(`How does ${content} make you feel?`);
  }
});
