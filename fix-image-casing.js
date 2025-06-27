import fs from 'fs';
import path from 'path';

const imageDir = path.resolve('./public/images');
const codeDir = path.resolve('./src');

const validExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.webp'];

// Rename image files to lowercase
const renamedMap = {};

fs.readdirSync(imageDir).forEach((file) => {
  const ext = path.extname(file);
  if (validExtensions.includes(ext.toLowerCase())) {
    const newName = file.toLowerCase();
    if (file !== newName) {
      fs.renameSync(path.join(imageDir, file), path.join(imageDir, newName));
      renamedMap[file] = newName;
      console.log(`✅ Renamed: ${file} → ${newName}`);
    }
  }
});

// Recursively walk and replace image paths in code files
function walkAndFix(dir) {
  fs.readdirSync(dir).forEach((item) => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      walkAndFix(fullPath);
    } else if (/\.(ts|tsx|js|jsx)$/.test(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let updated = content;

      Object.entries(renamedMap).forEach(([original, lower]) => {
        const regex = new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        updated = updated.replace(regex, lower);
      });

      if (updated !== content) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log(`✏️  Updated references in: ${fullPath}`);
      }
    }
  });
}

walkAndFix(codeDir);

console.log('\n🎉 All image names and references lowercased successfully.');
