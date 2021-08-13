const net = require('net');
const server = new net.Socket();
server.connect(6859, 'localhost', () => console.log('Connected'));

module.exports = {server}