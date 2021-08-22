import path from 'path';
import fs from 'fs';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const getData = (name) => {
  const data = readFile(name);
  return JSON.parse(data);
};

export default getData;
