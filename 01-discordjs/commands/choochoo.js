// Importing modules using ES6 syntax
import { SlashCommandBuilder } from 'discord.js';

// Command Builder export
export const data = new SlashCommandBuilder()
  .setName('choochoo')
  .setDescription('This is a demo choo choo!');

// Execute function export
export async function execute(interaction) {
  await interaction.reply('choo choo!');
}
