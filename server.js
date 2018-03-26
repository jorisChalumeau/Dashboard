var http = require('http');
var fs = require('fs');
var mysql = require('mysql');
var express = require('express');
var app = express();
var listConnectedUser = [];

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dashboard"
});

con.connect(function(err) {
  if (err) throw err;
});

var server = http.createServer(function(req, res) {
  if (req.url === '/main-style.css') {
    fs.readFile('main-style.css', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/css'
      });
      res.write(data);
      res.end();
    });
  } else if (req.url === '/index-style.css') {
    fs.readFile('index-style.css', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/css'
      });
      res.write(data);
      res.end();
    });
  } else if (req.url === '/index-script.js') {
    fs.readFile('index-script.js', function(err, data) {
      res.write(data);
      res.end();
    });
  } else if (req.url === '/main-script.js') {
    fs.readFile('main-script.js', function(err, data) {
      res.write(data);
      res.end();
    });
  } else if (req.url === '/main.html') {
    fs.readFile('main.html', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(data);
      res.end();
    });
  } else if (req.url === '/images/connectBackground.png') {
    fs.readFile('images/connectBackground.png', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'image/png'
      });
      res.write(data);
      res.end();
    });
  } else if (req.url === '/images/connectBackgroundOpacity.png') {
    fs.readFile('images/connectBackgroundOpacity.png', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'image/png'
      });
      res.write(data);
      res.end();
    });
  } else if (req.url === '/images/fb_logo.png') {
      fs.readFile('images/fb_logo.png', function(err, data) {
          res.writeHead(200, {
              'Content-Type': 'image/png'
          });
          res.write(data);
          res.end();
      });
  } else if (req.url === '/images/g_plus.png') {
      fs.readFile('images/g_plus.png', function(err, data) {
          res.writeHead(200, {
              'Content-Type': 'image/png'
          });
          res.write(data);
          res.end();
      });
  } else if (req.url === '/images/github.png') {
      fs.readFile('images/github.png', function(err, data) {
          res.writeHead(200, {
              'Content-Type': 'image/png'
          });
          res.write(data);
          res.end();
      });
  } else if (req.url === '/images/horloge.png') {
      fs.readFile('images/horloge.png', function(err, data) {
          res.writeHead(200, {
              'Content-Type': 'image/png'
          });
          res.write(data);
          res.end();
      });
  } else if (req.url === '/images/twitter.png') {
      fs.readFile('images/twitter.png', function(err, data) {
          res.writeHead(200, {
              'Content-Type': 'image/png'
          });
          res.write(data);
          res.end();
      });
  } else if (req.url === '/images/youtube.png') {
      fs.readFile('images/youtube.png', function(err, data) {
          res.writeHead(200, {
              'Content-Type': 'image/png'
          });
          res.write(data);
          res.end();
      });
  } else {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(data);
      res.end();
    });
  }
}).listen(8080);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  socket.on('tryConnect', function(message) {
    var sql = 'Select count(*) as count from User where Name ="' + message[0] + '" and Password = "' + message[1] + '"';
    con.query(sql, function(err, count) {
      if (err) throw err;
      if (count[0].count > 0) {
        socket.emit("ConnectSuccess");
      } else {
        socket.emit("ConnectFailure");
      }
    });
  });
  socket.on('signin', function(params) {
    var sql = "Select count(*) as count from User where Name='" + params[0] + "'";
    con.query(sql, function(err, name) {
      if (err) throw err;
      if (name[0].count > 0) {
        socket.emit("NameInUse");
      } else {
        var sql = "Insert into User (Name, Password) values ('" + params[0] + "','" + params[1] + "')";
        con.query(sql, function(err, mail) {
          if (err) throw err;
          socket.emit("AccountCreated");
        });
      }
    });
  });
  socket.on('getAuthorizations', function(params) {
    var sql = "Select count(*) as count from User where Name='" + params[0] + "'";
    con.query(sql, function(err, name) {
      if (err) throw err;
      if (name[0].count <= 0) {
        socket.emit("connexionProblem"); // kick user
      } else {
        var sql = "Select horloge, facebook, twitter," +
            " youtube, gplus, github " +
            "from User where Name='" + params[0] + "';";
        con.query(sql, function(err, tokens) {
          if (err) throw err;
          socket.emit("authorizations", tokens);
        });
      }
    });
  });
});

module.exports = app;
