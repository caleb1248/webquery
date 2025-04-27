import config from './config';
console.log('your config:', config);
const sql = new Bun.SQL({ ...config, url: 'postgres://localhost:5432' });

Bun.serve({
  port: 1434,
  async fetch(req, server) {
    const url = new URL(req.url).pathname;
    if (server.upgrade(req)) {
      return;
    }
    if (url === '/') {
      return new Response(Bun.file('./page.html'));
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
