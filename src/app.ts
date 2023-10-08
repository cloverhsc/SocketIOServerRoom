import express from 'express';
import { Server } from 'socket.io';
import { faker } from '@faker-js/faker';
import cors from 'cors';

const app = express();
const port = 3000;
const socketPort = 3001;

const io = new Server(socketPort, {
  cors: {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    maxAge: 3600,
  }
})

var corsOptions = {
  origin: `http://localhost:${port}`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

io.on('connection', (socket) => {
  console.log('a user connected');
});

//  A simple route for testing
app.get('/', (req, res) => {
  const resp = { result: 'success', message: 'Hello World!' }
  res.send(resp);
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
