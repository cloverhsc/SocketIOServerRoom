import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { faker } from '@faker-js/faker';
import cors from 'cors';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from 'websocket.interface';

const app = express();
const port = 3000;

// remove CORS error
var corsOptions = {
  origin: `*`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: corsOptions,
});





io.of('cloudPodViewContent').on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('room2', "Hollo world");


  // // works when broadcast to all
  // io.emit('noArg');

  // // works when broadcast to a room
  // io.to('room1').emit('basicEmit', 1, '2', Buffer.from([3]));
});

//  A simple route for testing
app.get('/', (req, res) => {
  const resp = { result: 'success', message: 'Hello World!' }
  res.send(resp);
});

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });