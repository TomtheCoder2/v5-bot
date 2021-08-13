const { SlashCommandBuilder } = require('@discordjs/builders');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
module.exports = {
    data: new SlashCommandBuilder()
        .setName('log')
        .setDescription('activate logging!'),
    async execute(interaction, server) {
        channel = interaction.guild.channels.cache.get("875376378843922473")
        const sendEmbed = {
            "title": "activated logging",
            "color": "#ff0000"
        }
        interaction.reply({ embeds: [sendEmbed] })
        while (true) {
            var buffer = '';
            const embed = {
                "title": "Log:",
                "color": "#ff0000",
                "description":"",
            }
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
                    buffer = buffer.replace("[93m", "")
                    buffer = buffer.replace("[96m", "")
                    buffer = buffer.replace("[1m", "")
                    buffer = buffer.replace("[3m", "")
                    buffer = buffer.replace("undifined", "")
                    buffer = buffer.replace("", "")
                    buffer = buffer.replace(/[^a-zA-Z0-9[] ]/g, "")


                    // do something with `buffer` here ...
                    console.log('buffer: ' + buffer);
                    if (buffer != undefined) {
                        embed.description += buffer + "\n"
                    }

                    buffer = '';
                    prev = next + 1;
                }
                buffer += data.substring(prev);
            });

            await delay(1000)
            if (embed.description != null && embed.description != "") {
                console.log(embed)
                channel.send({ embeds: [embed] })
            }
        }
    },
};