// Import the necessary discord.js classes using ES6 syntax
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import * as choochoo from './commands/choochoo.js';
import * as gif from './commands/gif.js';
import * as randomwalk from './commands/randomwalk.js';
import * as roshambo from './commands/roshambo.js';

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, readyDiscord);

// Login to Discord with your client's token
client.login(process.env.TOKEN);

function readyDiscord() {
  console.log('💖 Logged in as', client.user.tag);
  startTalking();
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
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

// This is a function that posts message every N milliseconds seconds
function startTalking() {
  const channel = client.channels.cache.get('1139569830761070651');
  // channel.send('Hello, this is your bot speaking!');
  setInterval(() => {
    channel.send('Hello, this is your bot speaking!');
  }, 60 * 60 * 1000);
}

// This is a function that handles emoji reactions to all messages
client.on('messageReactionAdd', (reaction, user) => {
  let emoji = reaction.emoji.name;
  // Check if it's a custom emoji
  if (reaction.emoji.id) {
    emoji = `<:${reaction.emoji.name}:${reaction.emoji.id}>`;
  }
  const channel = client.channels.cache.get('1139569830761070651');
  channel.send(`${user.username} reacted with ${emoji}`);
});

// This is a function that handles any message posted to any channel
client.on('messageCreate', (message) => {
  // If it's not a bot and if it's @ mentioning this bot
  if (!message.author.bot && message.mentions.has(client.user)) {
    // Strip out the @mention
    const mention = /<@.*?\s/;
    const content = message.content.replace(mention, '').trim();
    message.reply(`How does ${content} make you feel?`);
  }
});
