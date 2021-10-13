require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Note to self: define options for command arguments
const commands = [
  new SlashCommandBuilder().setName('choochoo').setDescription('Replies with a random message!'),
  new SlashCommandBuilder()
    .setName('gif')
    .setDescription('Replies with a gif!')
    .addStringOption((option) =>
      option.setName('keywords').setDescription('The gif to search for').setRequired(false)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest
  .put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.SERVERID), {
    body: commands,
  })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
