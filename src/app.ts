import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('a user connected');
});

//  A simple route for testing
app.get('/', (req, res) => {
  const resp = { result: 'success', message: 'Hello World!' }
  res.send(resp);
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});
