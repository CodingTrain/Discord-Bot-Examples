// Importing modules using ES6 syntax
import { SlashCommandBuilder } from 'discord.js';

// Replies array
const replies = ['🚂🌈💖', 'Choo choo!', 'Ding! 🛎', 'Never forget this dot!'];

// Command Builder export
export const data = new SlashCommandBuilder()
  .setName('choochoo')
  .setDescription('Replies with a random phrase!');

// Execute function export
export async function execute(interaction) {
  const index = Math.floor(Math.random() * replies.length);
  await interaction.reply(replies[index]);
}
