import path from 'path';
import fs from 'fs';
import url from 'url';
import yaml from 'js-yaml';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const getData = (name) => {
  const ext = path.extname(name);
  const data = readFile(name);
  const dataFile = (ext === '.yaml' || ext === '.yml') ? yaml.load(data) : JSON.parse(data);
  return dataFile;
};

export default getData;
