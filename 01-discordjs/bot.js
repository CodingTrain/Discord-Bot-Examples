// Import the necessary discord.js classes using ES6 syntax
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import * as choochoo from './commands/choochoo.js';
import * as gif from './commands/gif.js';
import * as randomwalk from './commands/randomwalk.js';

config();

// Create a new client instance
// const client = new Client({
//   intents: [GatewayIntentBits.Guilds],
// });

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
  }
});

// Some new experimental features

function startTalking() {
  const channel = client.channels.cache.get('1139569830761070651');
  // channel.send('Hello, this is your bot speaking!');
  setInterval(() => {
    channel.send('Hello, this is your bot speaking!');
  }, 60 * 60 * 1000);
}

client.on('messageReactionAdd', (reaction, user) => {
  let emoji = reaction.emoji.name;
  // Check if it's a custom emoji
  if (reaction.emoji.id) {
    emoji = `<:${reaction.emoji.name}:${reaction.emoji.id}>`;
  }
  const channel = client.channels.cache.get('1139569830761070651');
  channel.send(`${user.username} reacted with ${emoji}`);
});

client.on('messageCreate', (message) => {
  if (!message.author.bot && message.mentions.has(client.user)) {
    const mention = /<@.*?\s/;
    const content = message.content.replace(mention, '').trim();
    message.reply(`How does ${content} make you feel?`);
  }
});
