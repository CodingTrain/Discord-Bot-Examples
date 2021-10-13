// Coding a Bot with discord.js (With Env)
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/03-discordjs.html
// https://youtu.be/8k-zyUyuvlM

require('dotenv').config();

const fetch = require('node-fetch');

console.log('Beep beep! 🤖');

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Login to Discord with your client's token
client.login(process.env.TOKEN);

// When the client is ready, run this code (only once)
client.once('ready', readyDiscord);

function readyDiscord() {
  // require('./deploy-commands');
  console.log('💖');
}

const replies = ['🚂🌈💖', 'Choo choo!', 'Ding! 🛎', 'Never forget this dot!'];

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'choochoo') {
    const index = Math.floor(Math.random() * replies.length);
    await interaction.reply({
      content: replies[index],
      ephemeral: true,
    });
  } else if (commandName === 'gif') {
    let keywords = options.getString('keywords') || 'coding train';

    // Avoiding the 3 second issue?
    await interaction.deferReply();
    let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=high`;
    let response = await fetch(url);
    let json = await response.json();
    const index = Math.floor(Math.random() * json.results.length);

    await interaction.editReply({
      content: `GIF from Tenor: ${keywords}\n${json.results[index].url}`,
    });

    // NOTE TO SELF: look at embeds
    // https://discordjs.guide/popular-topics/embeds.html#embed-preview
  }
});
