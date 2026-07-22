const fs = require('fs');
const path = require('path');

const root = process.cwd();
const outDir = path.join(root, 'www');

const entries = [
  'index.html',
  'stroop.html',
  'config.html',
  'offline.html',
  'privacy.html',
  'manifest.json',
  'service-worker.js',
  'error.mp3',
  'error_sound.mp3',
  'success_sound.mp3',
  'css',
  'icons',
  'js'
];

function ensureInsideRoot(target) {
  const resolved = path.resolve(target);
  const resolvedRoot = path.resolve(root);
  if (!resolved.startsWith(resolvedRoot + path.sep)) {
    throw new Error(`Refusing to write outside project root: ${resolved}`);
  }
}

function copyEntry(relativePath) {
  const source = path.join(root, relativePath);
  const target = path.join(outDir, relativePath);
  if (!fs.existsSync(source)) {
    throw new Error(`Required web asset not found: ${relativePath}`);
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, { recursive: true });
}

ensureInsideRoot(outDir);
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const entry of entries) {
  copyEntry(entry);
}

console.log(`Prepared Capacitor web assets in ${outDir}`);
