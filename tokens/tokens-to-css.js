#!/usr/bin/env node
/**
 * tokens-to-css.js
 * Reads tokens/tokens.json and prints the @theme block for app/globals.css.
 * Run: node tokens/tokens-to-css.js
 */
const tokens = require('./tokens.json');

const lines = ['@theme {'];

// Colors
for (const [key, token] of Object.entries(tokens.color)) {
  lines.push(`  --color-${key}: ${token.$value};`);
}

// Typography — fonts
lines.push(`  --font-sans: ${tokens.typography['font-sans'].$value};`);
lines.push(`  --font-mono: ${tokens.typography['font-mono'].$value};`);

// Typography — sizes
for (const [key, token] of Object.entries(tokens.typography)) {
  if (key.startsWith('size-')) {
    const name = key.replace('size-', '');
    lines.push(`  --text-${name}: ${token.$value};`);
  }
}

// Spacing
for (const [key, token] of Object.entries(tokens.spacing)) {
  lines.push(`  --spacing-${key}: ${token.$value};`);
}

// Radius
for (const [key, token] of Object.entries(tokens.radius)) {
  lines.push(`  --radius-${key}: ${token.$value};`);
}

// Shadows
for (const [key, token] of Object.entries(tokens.shadow)) {
  lines.push(`  --shadow-${key}: ${token.$value};`);
}

lines.push('}');
console.log(lines.join('\n'));
