var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    //pyydettiin mitä tahansa, lähetä aina index.html...
    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  //sender
  socket.emit('news', { hello: 'wadap' });
  //listener
  socket.on('my other event', function (data) {
    console.log(data);
  });
  //listener
  socket.on('message', function (data) {
    console.log(data);
  });
});