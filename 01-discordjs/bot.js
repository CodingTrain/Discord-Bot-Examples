// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');

require('dotenv').config();

const fs = require('fs');
const path = require('path');

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

const choochoo = require('./commands/choochoo');
const gif = require('./commands/gif');

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'choochoo') {
    await choochoo.execute(interaction);
  } else if (interaction.commandName === 'gif') {
    await gif.execute(interaction);
  }
});
