const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(process.cwd(), 'public/assets/hui.png');
const outputPath = path.join(process.cwd(), 'public/assets/hui.webp');

console.log(`Compressing ${inputPath} to ${outputPath}...`);

sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(info => {
        console.log('Conversion complete:', info);
    })
    .catch(err => {
        console.error('Error converting image:', err);
        process.exit(1);
    });
