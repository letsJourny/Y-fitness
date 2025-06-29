#!/usr/bin/env node

/**
 * Icon Generation Script for Yousef Recharge PWA
 *
 * This script generates all required PWA icons from a source SVG or PNG
 * Run: node scripts/generate-icons.js
 *
 * Requirements:
 * - Install: npm install sharp
 * - Source icon: public/icon-source.svg or public/icon-source.png (1024x1024)
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Icon sizes needed for PWA
const iconSizes = [
  { size: 16, name: "icon-16x16.png" },
  { size: 32, name: "icon-32x32.png" },
  { size: 72, name: "icon-72x72.png" },
  { size: 96, name: "icon-96x96.png" },
  { size: 128, name: "icon-128x128.png" },
  { size: 144, name: "icon-144x144.png" },
  { size: 152, name: "icon-152x152.png" },
  { size: 192, name: "icon-192x192.png" },
  { size: 384, name: "icon-384x384.png" },
  { size: 512, name: "icon-512x512.png" },
];

// Shortcut icons
const shortcutIcons = [
  { name: "shortcut-dashboard.png", size: 96 },
  { name: "shortcut-workout.png", size: 96 },
  { name: "shortcut-meal.png", size: 96 },
];

const sourceIconPath = path.join(__dirname, "../public/icon-source.png");
const iconsDir = path.join(__dirname, "../public/icons");

async function generateIcons() {
  try {
    // Create icons directory if it doesn't exist
    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir, { recursive: true });
    }

    // Check if source icon exists
    if (!fs.existsSync(sourceIconPath)) {
      console.error("❌ Source icon not found at:", sourceIconPath);
      console.log(
        "📝 Please create a 1024x1024 PNG icon at public/icon-source.png",
      );
      console.log("🎨 The icon should represent Yousef Recharge fitness brand");
      return;
    }

    console.log("🚀 Generating PWA icons...");

    // Generate main app icons
    for (const icon of iconSizes) {
      const outputPath = path.join(iconsDir, icon.name);

      await sharp(sourceIconPath)
        .resize(icon.size, icon.size, {
          kernel: sharp.kernel.lanczos3,
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${icon.name}`);
    }

    // Generate favicon.ico
    await sharp(sourceIconPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, "../public/favicon.ico"));

    console.log("✅ Generated favicon.ico");

    // Generate splash screens for iOS
    const splashSizes = [
      { width: 2048, height: 2732, name: "apple-splash-2048-2732.jpg" },
      { width: 1668, height: 2224, name: "apple-splash-1668-2224.jpg" },
      { width: 1536, height: 2048, name: "apple-splash-1536-2048.jpg" },
      { width: 1125, height: 2436, name: "apple-splash-1125-2436.jpg" },
      { width: 828, height: 1792, name: "apple-splash-828-1792.jpg" },
      { width: 750, height: 1334, name: "apple-splash-750-1334.jpg" },
    ];

    for (const splash of splashSizes) {
      const outputPath = path.join(iconsDir, splash.name);

      await sharp({
        create: {
          width: splash.width,
          height: splash.height,
          channels: 3,
          background: { r: 59, g: 130, b: 246 }, // Primary blue color
        },
      })
        .composite([
          {
            input: await sharp(sourceIconPath)
              .resize(Math.min(splash.width * 0.3, splash.height * 0.3))
              .png()
              .toBuffer(),
            gravity: "center",
          },
        ])
        .jpeg()
        .toFile(outputPath);

      console.log(`✅ Generated ${splash.name}`);
    }

    console.log("🎉 All icons generated successfully!");
    console.log("📁 Icons saved to: public/icons/");
  } catch (error) {
    console.error("❌ Error generating icons:", error);
  }
}

// Create a simple placeholder icon if source doesn't exist
async function createPlaceholderIcon() {
  const size = 1024;
  const outputPath = path.join(__dirname, "../public/icon-source.png");

  // Create a simple blue square with "YR" text as placeholder
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 59, g: 130, b: 246, alpha: 1 },
    },
  })
    .composite([
      {
        input: Buffer.from(`
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="#3b82f6"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
              font-family="Arial, sans-serif" font-size="${size * 0.3}" 
              font-weight="bold" fill="white">YR</text>
      </svg>
    `),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toFile(outputPath);

  console.log("✅ Created placeholder icon at:", outputPath);
}

// Run the script
async function main() {
  if (!fs.existsSync(sourceIconPath)) {
    console.log("📝 Creating placeholder icon...");
    await createPlaceholderIcon();
  }

  await generateIcons();
}

// Check if sharp is installed
try {
  require("sharp");
  main();
} catch (error) {
  console.error("❌ Sharp not installed. Please run: npm install sharp");
  console.log("📦 Installing sharp...");

  const { exec } = require("child_process");
  exec("npm install sharp", (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Failed to install sharp:", error);
      return;
    }
    console.log("✅ Sharp installed successfully!");
    main();
  });
}
