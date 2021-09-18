/* eslint-disable no-unused-expressions */
import getData from './parsers.js';
import buildTree from './tree.js';
import formats from './formatters/index.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const file1 = getData(filePath1);
  const file2 = getData(filePath2);

  const tree = buildTree(file1, file2);

  return formats(tree, formatName);
};

export default genDiff;
