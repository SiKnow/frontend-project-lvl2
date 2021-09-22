#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import gendiff from '../src/index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1>, <filepath2>')
  .action((filePath1, filePath2, formatName) => {
    console.log(gendiff(filePath1, filePath2, formatName.format));
  });
program.parse();
