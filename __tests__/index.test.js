import { expect, test } from '@jest/globals';
import path from 'path';
import url from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('getData', () => {
  const result = genDiff('file1.json', 'file2.json');
  const answer = readFile('expect.txt').trim();
  expect(result).toEqual(answer);
});

test('YAML', () => {
  const result = genDiff('file1.yaml', 'file2.yml');
  const answer = readFile('expect.txt').trim();
  expect(result).toEqual(answer);
});
