const { Server } = require('mindustry-node-control');

// For locally hosted server
const myServer = new Server('127.0.0.1');

// console.log(myServer)
myServer.ping((ping) => {
    console.log(`${myServer.hostname}:${myServer.socketPort} ping is ${ping}!`);
});

myServer.connect();
myServer.command("players", (data) => {
    console.log(data)
})
// myServer.disconnect()