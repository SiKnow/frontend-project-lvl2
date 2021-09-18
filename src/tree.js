import _ from 'lodash';

const buildTree = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const unionKeys = _.union(keys1, keys2).sort();
  const result = unionKeys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    if (!_.has(file1, key)) {
      return {
        type: 'add',
        name: key,
        value: value2,
      };
    }

    if (!_.has(file2, key)) {
      return {
        type: 'delete',
        name: key,
        value: value1,
      };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        type: 'nested',
        name: key,
        child: buildTree(value1, value2),
      };
    }

    if (!_.isEqual(value1, value2)) {
      return {
        type: 'change',
        name: key,
        value1,
        value2,
      };
    }

    return {
      type: 'unchange',
      name: key,
      value: value2,
    };
  });

  return result;
};

export default buildTree;
