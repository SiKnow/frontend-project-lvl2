/* eslint-disable no-unused-expressions */
import getData from './parsers.js';
import buildTree from './tree.js';
import format from './formatters/index.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);

  const tree = buildTree(data1, data2);

  return format(tree, formatName);
};

export default genDiff;
