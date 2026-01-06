const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(process.cwd(), 'public/assets/logo.jpg');
const publicDir = path.join(process.cwd(), 'public');

async function generateIcons() {
    console.log(`Generating icons from ${inputPath}...`);

    // 1. Generate favicon.ico (32x32 mostly, but let's make a 48x48 PNG and rename/convert if needed)
    // Sharp doesn't strictly output .ico format easily without libvips support or plugins.
    // We can output a 48x48 png and save as favicon.ico (browsers often accept this, but truly it should be ICO)
    // For better compatibility, we'll generate regular PNG icons that Google likes.

    // Google recommends multiples of 48px: 48x48, 96x96, 144x144, 192x192
    const sizes = [48, 96, 144, 192, 512];

    for (const size of sizes) {
        await sharp(inputPath)
            .resize(size, size)
            .toFile(path.join(publicDir, `icon-${size}x${size}.png`));
        console.log(`Generated icon-${size}x${size}.png`);
    }

    // Generate standard favicon.ico (32x32)
    // We can just copy the 32x32 png logic or just use 48x48.
    await sharp(inputPath)
        .resize(32, 32)
        .toFile(path.join(publicDir, 'favicon.ico')); // technically a PNG, but modern browsers treat it fine. 
    // Ideally we use a real ICO generator but this often works for basic overriding the Vercel default.

    console.log('Icons generated successfully.');
}

generateIcons().catch(err => {
    console.error('Error generating icons:', err);
    process.exit(1);
});
