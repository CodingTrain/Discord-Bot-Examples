// Coding a Bot with discord.js (With Env)
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/03-discordjs.html
// https://youtu.be/8k-zyUyuvlM

// Setup dotenv and tell it to look for `.env` in the same folder as our main file
const dotenv = require("dotenv");
dotenv.config();

console.log("Beep beep! 🤖");

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

function readyDiscord() {
  console.log("💖");
}

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, readyDiscord);

// Login to Discord with your client's token
client.login(process.env.TOKEN);
