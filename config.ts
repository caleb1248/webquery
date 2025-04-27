import { createInterface } from 'readline/promises';

const reader = createInterface(process.stdin, process.stdout);

function prompt(prompt: string, defaultAnswer?: string): Promise<string> {
  reader.setPrompt(
    `\x1b[1;36m${prompt}\x1b[0;34m${defaultAnswer ? ` (${defaultAnswer})` : ''}\x1b[0m `
  );
  reader.prompt();
  return new Promise((resolve) => {
    reader.once('line', (line) => {
      const trimmed = line.trim();
      reader.setPrompt('');
      resolve(trimmed || !defaultAnswer ? trimmed : defaultAnswer);
    });
  });
}
export default {
  username: await prompt('Username?'),
  password: await prompt('Password?'),
  database: await prompt('Database?'),
};
