import { $, file } from 'bun';

const page = JSON.stringify(await file('./page.html').text());
const copy = file('./index-temp.ts');
await copy.write((await file('./index.ts').text()).replace("file('./page.html')", page));
await $`bun build ./index-temp.ts --compile --outfile webquery`;
await copy.delete();
