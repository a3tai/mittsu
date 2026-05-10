#!/usr/bin/env node
import {main} from '../src/index.js';

main(process.argv.slice(2)).catch((err) => {
  console.error(`\nmittsu: ${err.message ?? err}\n`);
  process.exit(1);
});
