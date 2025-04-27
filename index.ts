import config from './config';
import { SQL, file, serve } from 'bun';
const sql = new SQL({ ...config, url: 'postgres://localhost:5432' });

const server = serve({
  port: 1434,
  async fetch(req, server) {
    const url = new URL(req.url).pathname;
    if (server.upgrade(req)) {
      return;
    }
    if (url === '/') {
      return new Response(file('./page.html'), { headers: { 'Content-Type': 'text/html' } });
    } else {
      return new Response('Not Found', { status: 404 });
    }
  },

  websocket: {
    async message(ws, message) {
      try {
        const result = await sql.unsafe(message.toString());
        ws.send(JSON.stringify(result));
      } catch (e) {
        ws.send(JSON.stringify('Error: ' + e!.toString()));
      }
    },
  },
});

console.log(`\nServer running on http://${server.hostname}:${server.port}`);
