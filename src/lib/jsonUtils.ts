// src/lib/jsonUtils.js
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Read JSON data from file
 * @param {string} filename - Name of the JSON file (without .json extension)
 * @returns {Object} - Parsed JSON data
 */
export function readJsonFile(filename: string) {
  try {
    const filePath = path.join(DATA_DIR, `${filename}.json`);

    if (!fs.existsSync(filePath)) {
      return [];
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading ${filename}.json:`, error);
    return [];
  }
}
