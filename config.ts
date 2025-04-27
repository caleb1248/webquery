import { createInterface } from 'readline/promises';
import { Writable } from 'stream';

let muted = false;

const mutableStdout = new Writable({
  write(chunk, encoding, callback) {
    if (!muted) process.stdout.write(chunk, encoding);
    callback();
  },
});

const reader = createInterface({
  input: process.stdin,
  output: mutableStdout,
  terminal: true,
});

function prompt(prompt: string, mute?: boolean): Promise<string> {
  reader.setPrompt(`\x1b[1;36m${prompt}\x1b[0m `);
  reader.prompt();
  if (mute) muted = true;
  return new Promise((resolve) => {
    reader.once('line', (line) => {
      muted = false;
      const trimmed = line.trim();
      if (mute) console.log();
      reader.setPrompt('');
      resolve(trimmed);
    });
  });
}

export default {
  username: await prompt('Enter username:'),
  password: await prompt('Enter password:', true),
  database: await prompt('Enter database name:'),
};

reader.close();
