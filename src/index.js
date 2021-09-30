import path from 'path';
import { readFileSync } from 'fs';
import buildTree from './tree.js';
import format from './formatters/index.js';
import parse from './parsers.js';

const getPath = (fileName) => path.resolve(process.cwd(), fileName);

const getExtName = (fileName) => path.extname(fileName).substr(1);

const getData = (filePath) => readFileSync(filePath, 'utf-8');

const genDiff = (file1, file2, formatName = 'stylish') => {
  const filePath1 = getPath(file1);
  const filePath2 = getPath(file2);

  const fileExt1 = getExtName(file1);
  const fileExt2 = getExtName(file2);

  const data1 = getData(filePath1);
  const data2 = getData(filePath2);

  const obj1 = parse(data1, fileExt1);
  const obj2 = parse(data2, fileExt2);
  const tree = buildTree(obj1, obj2);

  return format(tree, formatName);
};

export default genDiff;
