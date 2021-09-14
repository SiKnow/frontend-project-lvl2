/* eslint-disable no-unused-expressions */
import getData from './parsers.js';
import stylish from './formatters/stylish.js';
import buildTree from './tree.js';

const genDiff = (filePath1, filePath2) => {
  const file1 = getData(filePath1);
  const file2 = getData(filePath2);

  const tree = buildTree(file1, file2);
  const formatter = stylish(tree);

  return formatter;
};

export default genDiff;
