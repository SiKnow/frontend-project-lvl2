/* eslint-disable no-unused-expressions */
import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

const getData = (filename) => {
  const data = readFileSync(filename, 'utf-8');
  return JSON.parse(data);
};

const genDiff = (filePath1, filePath2) => {
  const pathToFile1 = path.resolve(process.cwd(), filePath1);
  const pathToFile2 = path.resolve(process.cwd(), filePath2);
  const file1 = getData(pathToFile1);
  const file2 = getData(pathToFile2);

  const result = [];
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const unionKeys = _.union(keys1, keys2).sort();

  unionKeys.forEach((key) => {
    const inBoth = _.has(file1, key) && _.has(file2, key);
    const inFirst = _.has(file1, key);
    if (inBoth) {
      (file1[key] === file2[key])
        ? result.push(`  ${key}: ${file1[key]}`)
        : result.push(`- ${key}: ${file1[key]}`, `+ ${key}: ${file2[key]}`);
    } else {
      (inFirst)
        ? result.push(`- ${key}: ${file1[key]}`)
        : result.push(`+ ${key}: ${file2[key]}`);
    }
  });
  return `{\n\t${result.join('\n\t')}\n}`;
};

export { getData };
export default genDiff;
