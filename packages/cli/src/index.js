/*
 * @a3tai/mittsu CLI entry.
 *
 * Pure-Node, zero-dependency. We deliberately avoid commander/yargs so
 * `npx @a3tai/mittsu` doesn't have to spin up an install hop the
 * first time someone tries it. The argument parser below understands
 * exactly the flags we need.
 */
import {parseArgs} from './args.js';
import {init} from './commands/init.js';
import {add} from './commands/add.js';
import {list} from './commands/list.js';
import {help} from './commands/help.js';

const COMMANDS = {init, add, list, help};

export async function main(argv) {
  const args = parseArgs(argv);
  const cmd = args.command ?? 'help';

  if (cmd === '--version' || cmd === '-v' || cmd === 'version') {
    console.log('@a3tai/mittsu v0.0.1');
    return;
  }

  const handler = COMMANDS[cmd];
  if (!handler) {
    console.error(`Unknown command: ${cmd}`);
    help(args);
    process.exit(1);
  }
  await handler(args);
}
