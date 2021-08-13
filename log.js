const { Interaction } = require('discord.js');
const net = require('net');
const server = new net.Socket();
server.connect(6859, 'localhost', () => console.log('Connected'));
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
async function log() {
    const sendEmbed = {
        "title": "activated logging",
        "color": "#ff0000"
    }
    
    while (true) {
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
        await delay(1000)
        if (buffer != '') {
            const embed = {
                "title":`${buffer}`,
                "color": "#ff0000"
            }
        }
    }
}
log()