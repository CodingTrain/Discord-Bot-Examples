// Command Handler
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/06-command-handler.html
// https://youtu.be/B60Q74FHFBQ

const { SlashCommandBuilder } = require("discord.js");
const replies = ["🚂🌈💖", "Choo choo!", "Ding! 🛎", "Never forget this dot!"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("choochoo")
    .setDescription("Replies with a random phrase!"),
  async execute(interaction) {
    const index = Math.floor(Math.random() * replies.length);
    await interaction.reply(replies[index]);
  },
};
