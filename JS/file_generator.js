const fs = require("fs");
const path = require("path");
const readline = require("readline");

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

const VALID_DIFFICULTIES = [
  "very easy",
  "easy",
  "medium",
  "hard",
  "very hard",
  "expert",
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Paste the problem title: ", (title) => {
  rl.question("Difficulty (very easy/easy/medium/hard/very hard/expert): ", (difficulty) => {
    difficulty = difficulty.toLowerCase();

    if (!VALID_DIFFICULTIES.includes(difficulty)) {
      console.log("❌ Invalid difficulty. Try again with one of:");
      console.log(VALID_DIFFICULTIES.join(", "));
      rl.close();
      return;
    }

    const filename = slugify(title) + ".js";
    const folder = slugify(difficulty);
    const filePath = path.join(folder, filename);

    if (!fs.existsSync(folder)) {
      console.log(`❌ Folder '${folder}' does not exist.`);
      rl.close();
      return;
    }

    if (fs.existsSync(filePath)) {
      console.log("⚠️ File already exists.");
      rl.close();
      return;
    }

    const content = `/*
Problem: ${title}
Difficulty: ${difficulty}
Link: 
Date: ${new Date().toISOString().split("T")[0]}
*/

`;

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Created: ${filePath}`);

    // LOGGING
    const logFilePath = path.join("log.json");
    let logs = [];

    if (fs.existsSync(logFilePath)) {
      logs = JSON.parse(fs.readFileSync(logFilePath, "utf8"));
    }

    logs.push({
      title,
      filename,
      difficulty,
      fullPath: filePath,
      createdAt: new Date().toISOString(),
    });

    fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
    rl.close();
  });
});
