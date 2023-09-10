// Command Handler
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/06-command-handler.html
// https://youtu.be/B60Q74FHFBQ -- Outdated!

const fetch = require("node-fetch");
const {
  SlashCommandBuilder,
  AttachmentBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Searches Tenor for gifs!")
    .addStringOption((option) =>
      option
        .setName("keywords")
        .setDescription("The keywords to search Tenor with")
    ),
  async execute(interaction) {
    let defaultKeyword = "coding train";
    const keywords =
      interaction.options.getString("keywords") ?? defaultKeyword;
    let url = `https://tenor.googleapis.com/v2/search?q=${keywords}&key=${process.env.TENORKEY}&client_key=a2z_discord_bot&contentfilter=high`;
    let response = await fetch(url);
    let json = await response.json();
    console.log(json);
    console.log(json.results[0].media_formats);
    const index = Math.floor(Math.random() * json.results.length);
    const embed = new EmbedBuilder().setImage(
      json.results[index].media_formats.gif.url
    );
    await interaction.deferReply({ ephemeral: true });
    await interaction.followUp({
      embeds: [embed],
      content: "GIF from Tenor:" + keywords,
      ephemeral: true,
    });
  },
};
