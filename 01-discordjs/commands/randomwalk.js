// Importing modules using ES6 syntax
import { SlashCommandBuilder, AttachmentBuilder } from 'discord.js';
import { createCanvas } from 'canvas';

// Command Builder export
export const data = new SlashCommandBuilder()
  .setName('randomwalk')
  .setDescription('Generates a random walk image!');

// Execute function export
export async function execute(interaction) {
  console.log('generating...');
  const buffer = generateImage();
  const attachment = new AttachmentBuilder(buffer, { name: 'randomwalk.png' });
  await interaction.reply({ content: 'Here is your random walk!', files: [attachment] });
}

// Generates random walk image and returns buffer
function generateImage() {
  const width = 1280;
  const height = 720;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);

  let x = width / 2;
  let y = height / 2;
  const stepSize = 1;
  for (let i = 0; i < 500000; i++) {
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, stepSize, stepSize);
    const r = Math.floor(Math.random() * 4);
    switch (r) {
      case 0:
        x = x + stepSize;
        break;
      case 1:
        x = x - stepSize;
        break;
      case 2:
        y = y + stepSize;
        break;
      case 3:
        y = y - stepSize;
        break;
    }
  }
  const buffer = canvas.toBuffer('image/png');
  return buffer;
}
