import _ from 'lodash';
import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const formats = {
  json: jsonFormat,
  stylish: stylishFormat,
  plain: plainFormat,
};

const format = (tree, formatName) => {
  if (!_.has(formats, formatName)) {
    throw new Error('Format Error!');
  }

  return formats[formatName](tree);
};

export default format;
