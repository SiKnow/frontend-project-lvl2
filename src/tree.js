import _ from 'lodash';

const buildTree = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const unionKeys = _.union(keys1, keys2).sort();
  const result = unionKeys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    if (value1 !== value2) {
      return {
        type: 'change',
        key,
        value1,
        value2,
      };
    }

    if (!_.has(file1, key)) {
      return {
        type: 'add',
        key,
        value: value2,
      };
    }

    if (!_.has(file2, key)) {
      return {
        type: 'delete',
        key,
        value: value1,
      };
    }

    if (_.isObject(file1, key) && _.isObject(file2, key)) {
      return {
        type: 'nested',
        key,
        child: buildTree(value1, value2),
      };
    }

    return {
      type: 'unchange',
      key,
      value: value2,
    };
  });

  return result;
};

export default buildTree;
