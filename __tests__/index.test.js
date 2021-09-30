import { expect, test } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import url from 'url';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileJson1 = getFixturePath('file1.json');
const fileJson2 = getFixturePath('file2.json');
const fileYaml1 = getFixturePath('file1.yml');
const fileYaml2 = getFixturePath('file2.yml');

test.each`
      file1    |     file2    |   format     | expected
  ${fileJson1} | ${fileJson2} | ${'stylish'} | ${'expect.txt'}
  ${fileJson1} | ${fileJson2} | ${'plain'}   | ${'expected.txt'}
  ${fileJson1} | ${fileJson2} | ${'json'}    | ${'expectJson.txt'}
  ${fileYaml1} | ${fileYaml2} | ${'stylish'} | ${'expect.txt'}
  ${fileYaml1} | ${fileYaml2} | ${'plain'}   | ${'expected.txt'}
  ${fileYaml1} | ${fileYaml2} | ${'json'}    | ${'expectJson.txt'}
  `('genDiff(file1, file2, format) must to be $expected', ({
  file1, file2, format, expected,
}) => {
  expect(genDiff(file1, file2, format)).toBe(readFile(expected));
});
