/* eslint-disable no-case-declarations */
import _ from 'lodash';

const getIndent = (depth, spaces = 4) => ' '.repeat(depth * spaces - 2);

const diffSymbols = {
  delete: '-',
  add: '+',
  unchange: ' ',
};

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }

  const indent = getIndent(depth);
  const lines = Object
    .entries(value)
    .map(([key, val]) => {
      const depthIndent = getIndent(depth + 1);
      return `${depthIndent} ${key}: ${stringify(val, depth + 1)}`;
    });

  return [
    '{',
    ...lines,
    `${indent} }`,
  ].join('\n');
};

const stylish = (tree) => {
  const style = (diffTree, depth) => {
    const indent = getIndent(depth);
    return diffTree.map((node) => {
      switch (node.type) {
        case 'nested':
          const value = `${indent} ${node.name}: ${[
            '{',
            style(node.children, depth + 1),
            `${indent} }`,
          ].join('\n')}`;
          return value;
        case 'change':
          const data1 = stringify(node.value1, depth);
          const data2 = stringify(node.value2, depth);
          const node1 = `${indent}${diffSymbols.delete} ${node.name}: ${data1}`;
          const node2 = `${indent}${diffSymbols.add} ${node.name}: ${data2}`;
          return [node1, node2].join('\n');
        case 'unchange':
        case 'add':
        case 'delete':
          const val = stringify(node.value, depth);
          return `${indent}${diffSymbols[node.type]} ${node.name}: ${val}`;
        default:
          throw new Error('Error type!');
      }
    })
      .join('\n');
  };
  return [
    '{',
    style(tree, 1),
    '}',
  ].join('\n');
};

export default stylish;
