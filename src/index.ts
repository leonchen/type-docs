import * as fs from 'fs';
import * as yargs from 'yargs';

const args = yargs
  .option('dir', {
    alias: 'd',
    describe: 'source directory',
  })
  .option('out', {
    alias: 'o',
    describe: 'output file',
  })
  .demandOption(['dir', 'out'], 'dir and out arguments are required')
  .help().argv;

const START_SIGN = '// @s';
const END_SIGN = '// @e';

const DEFINITION_REGEXP = new RegExp(`^\s*${START_SIGN}(.*)^\s*${END_SIGN}`, 'gm');
function scan(file: string): any[] {
  const matches = fs
    .readFileSync(file)
    .toString()
    .match(DEFINITION_REGEXP);
  console.log(matches);
  return [];
}

function update(content: any[], marks: any[]) {
  console.log(content, marks);
}

function parseToMarkdown(c: any): string {
  console.log(c);
  return '';
}

const files = fs.readdirSync(args.dir);

const content: any[] = [];

for (const file of files) {
  const marks = scan(file);
  update(content, marks);
}

const markdowns: string[] = [];
for (const c of content) {
  markdowns.push(parseToMarkdown(c));
}

fs.writeFileSync(args.out, markdowns.join('\n'), { encoding: 'utf8' });
