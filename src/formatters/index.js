import _ from 'lodash';
import stylishFormat from './stylish.js';

const formatters = {
  stylish: stylishFormat,
};

const formats = (tree, formatName) => {
  if (!_.has(formatters, formatName)) {
    throw new Error('Format Error!');
  }

  return formatters[formatName](tree);
};

export default formats;
