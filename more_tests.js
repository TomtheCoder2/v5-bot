const net = require('net');
const server = new net.Socket();
server.connect(6859, 'localhost', () => console.log('Connected'));
// server.on('data', data => console.log('Received: ' + data));
// server.once('data', (buffer) => {
//     const data = buffer.toString();
//     console.log(`data in module: ${data}`)
// });
// server.on('line', (input) => {
//     console.log(`Received: ${input}`);
// });

var buffer = '';
server.on('data', function (data) {
    var prev = 0, next;
    data = data.toString('utf8'); // assuming utf8 data...
    while ((next = data.indexOf('\n', prev)) > -1) {
        buffer += data.substring(prev, next);

        // do something with `buffer` here ...
        console.log('got whole message: ' + buffer);

        buffer = '';
        prev = next + 1;
    }
    buffer += data.substring(prev);
});

server.write(`players\n`);
server.on('close', () => console.log('Connection closed'));
setTimeout(() => server.write('status'), 2000);
console.log("end of the script!");