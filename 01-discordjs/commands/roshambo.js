// Importing necessary classes and methods from the Discord.js library
import {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ComponentType,
} from 'discord.js';

// Define the slash command using SlashCommandBuilder
export const data = new SlashCommandBuilder()
  .setName('roshambo') // Command name that users will type
  .setDescription('Play a game of rock paper scissors!'); // Description of the command

// Function to execute when the slash command is called
export async function execute(interaction) {
  console.log('starting');

  // Creating button components for the rock-paper-scissors game
  const rockButton = new ButtonBuilder()
    .setCustomId('rock') // Identifier for this button
    .setStyle(ButtonStyle.Primary) // Button color/style
    .setEmoji('🪨'); // Emoji displayed on the button

  const paperButton = new ButtonBuilder()
    .setCustomId('paper')
    .setStyle(ButtonStyle.Primary)
    .setEmoji('📄');

  const scissorsButton = new ButtonBuilder()
    .setCustomId('scissors')
    .setStyle(ButtonStyle.Primary)
    .setEmoji('✂️');

  // Organizing buttons in a row using ActionRowBuilder
  const row = new ActionRowBuilder().addComponents(
    rockButton,
    paperButton,
    scissorsButton
  );

  // Sending the initial interaction message with attached buttons
  await interaction.reply({
    content: 'Roshambo!', // Message content
    components: [row], // Attaching the button row to the message
  });

  // Filter function to ensure only the user who initiated the interaction can respond
  const filter = (i) => {
    return i.user.id === interaction.user.id;
  };

  // Awaiting user's button interaction (waiting max 10 seconds)
  const buttonInteraction = await interaction.channel
    .awaitMessageComponent({
      filter,
      componentType: ComponentType.Button,
      time: 10000, // Timeout period in milliseconds
    })
    .catch((err) => {
      // Handling the scenario where user doesn’t respond in time
      interaction.followUp('You took too long! Game over.');
    });
  if (!buttonInteraction) return; // Exit function if no valid interaction is collected

  // Game logic follows...
  const userChoice = buttonInteraction.customId;
  const botChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
  await buttonInteraction.reply(`You chose ${userChoice} and I chose ${botChoice}!`);

  // Outcome responses...
  if (userChoice === botChoice) {
    return await buttonInteraction.followUp("It's a tie!");
  }
  if (
    (userChoice === 'rock' && botChoice === 'scissors') ||
    (userChoice === 'paper' && botChoice === 'rock') ||
    (userChoice === 'scissors' && botChoice === 'paper')
  ) {
    return await buttonInteraction.followUp('You won!');
  }
  return await buttonInteraction.followUp('I won!');
}

// Note: An alternative to using awaitMessageComponent is a MessageComponentCollector.
// The MessageComponentCollector allows the bot to collect multiple button interactions over a specified
// period of time or until certain conditions are met. This would be useful if you wanted to allow
// the user to play multiple rounds without sending a new command, for example.
//
// Example of creating a collector (not implemented in this function):
// const collector = interaction.channel.createMessageComponentCollector({
//   filter,
//   componentType: ComponentType.Button,
//   time: 30000,  // Time in milliseconds collector will run for; here, 30 seconds
// });
//
// Example of how the collector can be used:
// collector.on('collect', (buttonInteraction) => {
//   // Logic to handle button interaction
// });
//
// collector.on('end', (collected) => {
//   // Logic for when the collector stops collecting interactions
// });
