const { SlashCommandBuilder } = require('@discordjs/builders');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('show status!'),
    async execute(interaction, server) {
        var buffer = '';
        const embed = {
            "color": "#00ffff",
            "description":""
        }
        await interaction.deferReply();
        server.on('data', function (data) {
            var prev = 0, next;
            data = data.toString('utf8'); // assuming utf8 data...
            while ((next = data.indexOf('\n', prev)) > -1) {
                buffer += data.substring(prev, next);
                buffer = buffer.replace("[33m", "")
                buffer = buffer.replace("\x1B", "")
                buffer = buffer.replace("", "")
                buffer = buffer.replace("[93m", "")
                buffer = buffer.replace("[95m", "")
                buffer = buffer.replace("[33m", "")
                buffer = buffer.replace("[94m", "")
                buffer = buffer.replace("[96m", "")
                buffer = buffer.replace("[93m", "")
                buffer = buffer.replace("[1m", "")
                buffer = buffer.replace("[3m", "")
                buffer = buffer.replace("undifined", "")
                buffer = buffer.replace("", "")
                buffer = buffer.replace(/[^a-zA-Z0-9[] ]/g, "")
                buffer = buffer.replace("FPS","TPS")


                // do something with `buffer` here ...
                console.log('buffer: ' + buffer);
                if (buffer != undefined) {
                    if (buffer == "Status:") {
                        buffer = "**Status: **"
                        embed.title = buffer;
                    } else {
                        embed.description += buffer + "\n"
                    }
                }

                buffer = '';
                prev = next + 1;
            }
            buffer += data.substring(prev);
        });

        server.write(`status\n`);
        await delay(1000)
        console.log(embed)
        interaction.editReply({ embeds: [embed] })

    },
};