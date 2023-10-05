const { SlashCommandBuilder } = require('discord.js');
const replies = ['🚂🌈💖', 'Choo choo!', 'Ding! 🛎', 'Never forget this dot!'];

module.exports = {
  data: new SlashCommandBuilder().setName('choochoo').setDescription('Replies with a random phrase!'),
  async execute(interaction) {
    const index = Math.floor(Math.random() * replies.length);
    await interaction.reply(replies[index]);
  },
};
