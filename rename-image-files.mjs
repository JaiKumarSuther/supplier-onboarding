// // // rename-image-files.mjs
// // import fs from "fs/promises";
// // import path from "path";
// // import { fileURLToPath } from "url";

// // // Workaround to get __dirname in ES module
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // const IMAGES_DIR = path.join(__dirname, "src", "assets", "images");

// // function sanitizeFileName(fileName) {
// //   return fileName.replace(/\s+/g, "-");
// // }

// // try {
// //   const files = await fs.readdir(IMAGES_DIR);
// //   for (const file of files) {
// //     if (file.includes(" ")) {
// //       const oldPath = path.join(IMAGES_DIR, file);
// //       const newFileName = sanitizeFileName(file);
// //       const newPath = path.join(IMAGES_DIR, newFileName);

// //       await fs.rename(oldPath, newPath);
// //       console.log(`Renamed: ${file} → ${newFileName}`);
// //     }
// //   }
// // } catch (err) {
// //   console.error("Error:", err);
// // }




// // import fs from "fs/promises";
// // import path from "path";
// // import { fileURLToPath } from "url";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // const projectRoot = __dirname;
// // const validExtensions = [".ts", ".tsx", ".js"];

// // async function processFile(filePath) {
// //   let content = await fs.readFile(filePath, "utf-8");
// //   const regex = /@\/assets\/images\/([^\s"']+\s[^\s"']+\.[a-zA-Z]{3,4})/g;

// //   let updated = false;
// //   content = content.replace(regex, (match, filename) => {
// //     const fixedFilename = filename.replace(/\s+/g, "-");
// //     updated = true;
// //     return match.replace(filename, fixedFilename);
// //   });

// //   if (updated) {
// //     await fs.writeFile(filePath, content, "utf-8");
// //     console.log(`✅ Fixed imports in: ${filePath}`);
// //   }
// // }

// // async function walk(dir) {
// //   const entries = await fs.readdir(dir, { withFileTypes: true });

// //   for (const entry of entries) {
// //     const fullPath = path.join(dir, entry.name);
// //     if (entry.isDirectory()) {
// //       await walk(fullPath);
// //     } else if (validExtensions.includes(path.extname(entry.name))) {
// //       await processFile(fullPath);
// //     }
// //   }
// // }

// // try {
// //   await walk(projectRoot);
// //   console.log("✅ All imports fixed.");
// // } catch (err) {
// //   console.error("❌ Error:", err);
// // }




// // import fs from "fs/promises";
// // import path from "path";
// // import { fileURLToPath } from "url";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // const PROJECT_DIR = __dirname;
// // const VALID_EXTS = [".ts", ".tsx", ".js", ".jsx"];
// // const IMAGE_EXT_PATTERN = /\.(svg|png|jpg|jpeg|webp)$/i;

// // // Matches: import variable from "@/assets/images/filename.ext";
// // const IMAGE_IMPORT_REGEX =
// //   /import\s+(\w+)\s+from\s+["'](@\/assets\/images\/[^"']+\.(?:svg|png|jpg|jpeg|webp))["']\s*;?/gi;

// // async function fixFile(filePath) {
// //   let content = await fs.readFile(filePath, "utf-8");
// //   let updated = false;

// //   const replaced = content.replace(IMAGE_IMPORT_REGEX, (match, variable, assetPath) => {
// //     updated = true;
// //     return `const ${variable} = new URL("${assetPath}", import.meta.url).href;`;
// //   });

// //   if (updated) {
// //     await fs.writeFile(filePath, replaced, "utf-8");
// //     console.log(`✅ Updated: ${filePath}`);
// //   }
// // }

// // async function walk(dir) {
// //   const entries = await fs.readdir(dir, { withFileTypes: true });

// //   for (const entry of entries) {
// //     const fullPath = path.join(dir, entry.name);
// //     if (entry.isDirectory()) {
// //       await walk(fullPath);
// //     } else if (VALID_EXTS.includes(path.extname(entry.name))) {
// //       await fixFile(fullPath);
// //     }
// //   }
// // }

// // try {
// //   await walk(PROJECT_DIR);
// //   console.log("🎉 All image imports converted to `new URL(...).href` format.");
// // } catch (err) {
// //   console.error("❌ Error:", err);
// // }



// // import fs from "fs/promises";
// // import path from "path";
// // import { fileURLToPath } from "url";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // const PROJECT_ROOT = __dirname;
// // const VALID_EXTS = [".js", ".jsx", ".ts", ".tsx"];
// // const IMAGE_EXTS = ["svg", "png", "jpg", "jpeg", "webp"];

// // const BAD_IMPORT_REGEX = new RegExp(
// //   `import\\s+(\\w+)\\s+from\\s+["'][./]+@/assets/images/([^"']+\\.(${IMAGE_EXTS.join("|")}))["'];?`,
// //   "gi"
// // );

// // async function fixFile(filePath) {
// //   let content = await fs.readFile(filePath, "utf-8");
// //   let updated = false;

// //   const replaced = content.replace(BAD_IMPORT_REGEX, (match, variable, imagePath) => {
// //     updated = true;
// //     return `const ${variable} = new URL("@/assets/images/${imagePath}", import.meta.url).href;`;
// //   });

// //   if (updated) {
// //     await fs.writeFile(filePath, replaced, "utf-8");
// //     console.log(`✅ Fixed: ${filePath}`);
// //   }
// // }

// // async function walk(dir) {
// //   const entries = await fs.readdir(dir, { withFileTypes: true });

// //   for (const entry of entries) {
// //     const fullPath = path.join(dir, entry.name);

// //     if (entry.isDirectory()) {
// //       await walk(fullPath);
// //     } else if (VALID_EXTS.includes(path.extname(entry.name))) {
// //       await fixFile(fullPath);
// //     }
// //   }
// // }

// // try {
// //   await walk(PROJECT_ROOT);
// //   console.log("🎯 All broken '../@/assets/images/...' imports converted.");
// // } catch (err) {
// //   console.error("❌ Script error:", err);
// // }


// import fs from "fs/promises";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const PROJECT_DIR = path.join(__dirname, "src");
// const IMAGE_DIR = path.join(PROJECT_DIR, "assets/images");
// const IMAGE_EXTENSIONS = [".svg", ".png", ".jpg", ".jpeg", ".webp"];
// const CODE_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"];
// const IMPORT_REGEX = /new URL\(["']@\/assets\/images\/([^"')]+)["'],\s*import\.meta\.url\)/g;

// async function getAllImageFiles() {
//   const files = await fs.readdir(IMAGE_DIR);
//   return files.map((f) => f.toLowerCase());
// }

// function normalize(name) {
//   return name.toLowerCase().replace(/\s+/g, "-");
// }

// async function fixFile(filePath, imageFiles) {
//   let content = await fs.readFile(filePath, "utf-8");
//   let modified = false;

//   const updated = content.replace(IMPORT_REGEX, (match, imgPath) => {
//     const normalized = normalize(imgPath);
//     const found = imageFiles.find((f) => f === normalized);

//     if (found && imgPath !== found) {
//       const correctedPath = `@/assets/images/${found}`;
//       console.log(`🛠️  Fixed: ${imgPath} → ${found} in ${filePath}`);
//       modified = true;
//       return `new URL("${correctedPath}", import.meta.url)`;
//     }

//     if (!found) {
//       console.warn(`❌ Not found: ${imgPath} in ${filePath}`);
//     }

//     return match;
//   });

//   if (modified) {
//     await fs.writeFile(filePath, updated, "utf-8");
//   }
// }

// async function walkAndFix(dir, imageFiles) {
//   const entries = await fs.readdir(dir, { withFileTypes: true });

//   for (const entry of entries) {
//     const fullPath = path.join(dir, entry.name);
//     if (entry.isDirectory()) {
//       await walkAndFix(fullPath, imageFiles);
//     } else if (CODE_EXTENSIONS.includes(path.extname(entry.name))) {
//       await fixFile(fullPath, imageFiles);
//     }
//   }
// }

// try {
//   const imageFiles = await getAllImageFiles();
//   await walkAndFix(PROJECT_DIR, imageFiles);
//   console.log("✅ All imports checked and updated where needed.");
// } catch (err) {
//   console.error("❌ Script failed:", err);
// }


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
