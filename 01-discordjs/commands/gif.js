// Importing modules using ES6 syntax
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('gif')
  .setDescription('Searches Tenor for gifs!')
  .addStringOption((option) =>
    option.setName('keywords').setDescription('The keywords to search Tenor with')
  );

// Execute function to interact with Tenor API and reply with a GIF
export async function execute(interaction) {
  // Initially acknowledging the command interaction
  // can use { ephemeral: true } for reply to be seen by user only
  await interaction.deferReply();

  // Default keyword set to 'kitten' if none provided
  let defaultKeyword = 'kitten';
  const keywords = interaction.options.getString('keywords') ?? defaultKeyword;

  // URL constructed with the provided or default keyword
  let url = `https://tenor.googleapis.com/v2/search?q=${keywords}&key=${process.env.TENORKEY}&client_key=a2z_discord_bot&contentfilter=high`;

  // Fetching data from Tenor API
  let response = await fetch(url);
  let json = await response.json();
  console.log(json);
  console.log(json.results[0].media_formats);

  // Randomly select a GIF from the response
  const index = Math.floor(Math.random() * json.results.length);

  // Creating an embed to display the GIF in the Discord message
  const embed = new EmbedBuilder().setImage(json.results[index].media_formats.gif.url);

  // Following up with the selected GIF embedded in the message
  await interaction.followUp({
    embeds: [embed],
    content: 'GIF from Tenor: ' + keywords,
  });
}
