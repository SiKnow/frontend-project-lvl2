import _ from 'lodash';

const toPlain = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (tree) => {
  const iter = (treeDiff, path) => treeDiff.flatMap((node) => {
    const name = path.concat(node.name).join('.');
    switch (node.type) {
      case 'add':
        return `Property '${name}' was added with value: ${toPlain(node.value)}`;
      case 'delete':
        return `Property '${name}' was removed`;
      case 'change':
        return `Property '${name}' was updated. From ${toPlain(node.value1)} to ${toPlain(node.value2)}`;
      case 'nested':
        return iter(node.child, [name]);
      default:
        return [];
    }
  });

  return iter(tree, []).join('\n');
};

export default plain;
