/* eslint-disable no-unused-expressions */
import _ from 'lodash';
import getData from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  const file1 = getData(filePath1);
  const file2 = getData(filePath2);

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
  return `{\n ${result.join('\n ')}\n}`;
};

export default genDiff;
