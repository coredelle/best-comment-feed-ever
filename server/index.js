const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataAccessObject = new DataAccessObject(path.join(__dirname, '../database.sqlite3'));
const comment = new Comment(dataAccessObject);

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/createComment', async function(request, response) {
  const { body } = request;
  try {
    const result = await comment.createComment(body);
    const newComment = { ...body, id: result.id, created: new Date().toISOString() };
    io.emit('commentAdded', newComment);
    response.send(newComment);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

app.get('/getComment', async function(request, response) {
  const { id } = request.query;
  try {
    const result = await comment.getComment(id);
    response.send(result);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

app.get('/getComments', async function(request, response) {
  try {
    const result = await comment.getComments();
    response.send(result);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

app.delete('/deleteComments', async function(request, response) {
  try {
    await comment.deleteComments();
    response.send({ message: 'All comments deleted' });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

server.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(path.join(rootDir, 'src', 'index.html'));
});

