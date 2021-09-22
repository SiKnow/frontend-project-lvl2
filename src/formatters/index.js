import _ from 'lodash';
import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const formatters = {
  json: jsonFormat,
  stylish: stylishFormat,
  plain: plainFormat,
};

const formats = (tree, formatName) => {
  if (!_.has(formatters, formatName)) {
    throw new Error('Format Error!');
  }

  return formatters[formatName](tree);
};

export default formats;
