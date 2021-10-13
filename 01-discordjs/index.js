// Coding a Bot with discord.js (With Env)
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/03-discordjs.html
// https://youtu.be/8k-zyUyuvlM

require('dotenv').config();

const serverID = process.env.SERVERID;
const channelID = process.env.CHANNELID;

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
  console.log('💖');
}

const replies = ['🚂🌈💖', 'Choo choo!', 'Ding! 🛎', 'Never forget this dot!'];

// client.on('message', gotMessage);

// function gotMessage(msg) {
//   if (msg.guild.id === serverID && msg.channel.id === channelID) {
//     if (msg.content === '!choochoo') {
//       const index = Math.floor(Math.random() * replies.length);
//       msg.channel.send(replies[index]);
//     }
//   }
// }
