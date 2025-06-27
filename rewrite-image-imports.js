import fs from 'fs';
import path from 'path';

const projectDir = path.resolve('./src');
const imagePattern = /new URL\(["']@\/assets\/images\/([^"']+)["'], import\.meta\.url\)\.href/g;

function walk(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else if (/\.(tsx?|jsx?)$/.test(fullPath)) {
      callback(fullPath);
    }
  });
}

walk(projectDir, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  const replaced = content.replace(imagePattern, (_, filename) => `"\/images\/${filename}"`);
  if (replaced !== content) {
    fs.writeFileSync(filePath, replaced, 'utf8');
    console.log(`✅ Rewrote image imports in: ${filePath}`);
  }
});
