#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import gendiff from '../index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1>, <filepath2>')
  .action((filePath1, filePath2) => console.log(gendiff(filePath1, filePath2)));
program.parse();
