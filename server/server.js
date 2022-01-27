#!/usr/bin/env nodejs
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

let players = 0, hashes = [], curPlayer = 0;

io.on('connection', (sock) => { 

  const validateMove = ({ cookie, id, length, rotation}) => {
    if(hashes[curPlayer] == cookie){
      sock.emit("message", String("" + id +  " " + length + " " + rotation));
      curPlayer ^= 1;
      sock.emit("message", String("= It is now Player " + (curPlayer+1) + "'s turn. ="));
    }
    else{
      // sock.emit("message", "hacking :(");
    }
  };



//   if(players < 2){  // New connection
//     sock.emit('message', String('== You are connected as Player ' + (players+1) + " =="));
// 
//     hashes[players] = Math.round(Math.random()*8999999+1000000).toString(36);
//     sock.emit('cookie', hashes[players]);
//     players++;
//   }
//   else{
    // sock.emit('message', '== You are connected as a viewer ==');
  // }

    sock.emit('message', '<b style="color: navy">== Welcome to Knockball! ==</b>');
    sock.emit('message', 'The goal is simple: alternating turns, knock all your opponents off the iceberg, while avoid falling into the water yourself! Take turns launching your elves by left-clicking and dragging in the direction you desire. Last one standing wins!');
    sock.emit('message', 'Red goes first:');



  

  sock.on('message', (text) => io.emit('message', text));
  // sock.on('playerMove', (text) => io.emit('message', text));
  // sock.on('playerMove', validateMove);

});



server.on('error', (err) => {
  console.error(err);
});

server.listen(8080, () => {
  console.log('server is ready');
});
