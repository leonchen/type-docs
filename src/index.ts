import * as fs from 'fs';
import * as yargs from 'yargs';
import * as path from 'path';

const args = yargs
  .option('dir', {
    alias: 'd',
    describe: 'source directory',
  })
  .option('out', {
    alias: 'o',
    describe: 'output file',
  })
  .option('template', {
    alias: 't',
    describe: 'template file',
  })
  .demandOption(['dir', 'template', 'out'], 'dir/template/out arguments are required')
  .help().argv;

const START_SIGN = '// @docstart';
const END_SIGN = '// @docend';

const DEFINITION_REGEXP = new RegExp(`^\\s*${START_SIGN}[\\s\\S]*?^\\s*${END_SIGN}`, 'mg');
const KEY_REGEXP = new RegExp(`^\\s*${START_SIGN}\\s*([\\S]+)`);

const doc: any = {};

function scan(file: string): any[] {
  return (
    fs
      .readFileSync(file)
      .toString()
      .match(DEFINITION_REGEXP) || []
  );
}

function parseDoc(str: string) {
  const lines = str.trim().split(/\n/);
  const headLine = lines.shift();
  lines.pop();
  const m = headLine!.match(KEY_REGEXP);
  if (m && m[1]) {
    console.log(`set ${m[1]}`);
    doc[m[1].toLowerCase()] = `\`\`\`typescript\n${lines.join('\n')}\n\`\`\``;
  }
}

function getFiles(dir: string): string[] {
  let list: string[] = [];
  const files = fs.readdirSync(dir);

  files.forEach(function(file) {
    const stats = fs.lstatSync(path.join(dir, file));
    if (stats.isDirectory()) {
      list = list.concat(getFiles(path.join(dir, file)));
    } else {
      list.push(path.join(dir, file));
    }
  });

  return list;
}

const files = getFiles(args.dir);
const template = fs.readFileSync(args.template).toString();

for (const file of files) {
  if (/\.ts$/.test(file)) {
    const docs = scan(file);
    docs.forEach(parseDoc);
  }
}

const markdowns = template.replace(/\$\{(.+)\}/g, function(match, key) {
  const k = key.toLowerCase();
  if (doc[k]) {
    return doc[k];
  } else {
    console.warn(`${key} not set`);
    return match;
  }
});

fs.writeFileSync(args.out, markdowns, { encoding: 'utf8' });
