const { SlashCommandBuilder } = require('@discordjs/builders');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
module.exports = {
    data: new SlashCommandBuilder()
        .setName('players')
        .setDescription('list all players'),
    async execute(interaction, server) {
        console.log("search for players: ")

        await interaction.deferReply();

        var buffer = '';
        const embed = {
            "color": "#ffff00",
            "description": "**Players:**\n"
        }
        // server.on('data', function (data) {
        //     var prev = 0, next;
        //     data = data.toString('utf8'); // assuming utf8 data...
        //     while ((next = data.indexOf('\n', prev)) > -1) {
        //         buffer += data.substring(prev, next);

        //         // do something with `buffer` here ...
        //         console.log('got whole message: ' + buffer);
        //         // embed.description += buffer + "\n"

        //         buffer = '';
        //         prev = next + 1;
        //         // interaction.edit({ embeds: [embed] })
        //     }
        //     buffer += data.substring(prev);
        // });
        // server.write(`players\n`);

        var buffer = '';
        server.on('data', function (data) {
            // console.log("start while loop!")
            var prev = 0, next;
            data = data.toString('utf8'); // assuming utf8 data...
            players = 1
            while ((next = data.indexOf('\n', prev)) > -1) {
                buffer += data.substring(prev, next);
                buffer = buffer.replace("[93m", "")
                buffer = buffer.replace("[95m", "")
                buffer = buffer.replace("", "")
                console.log('buffer: ' + buffer);
                // console.log(`1111${buffer.split(" ")[1]}1111`)
                if (buffer.split(" ")[0] == "Players:") {
                    console.log(`currently ${buffer.split(" ")[1]} are online!`)
                    players = buffer.split(" ")[1]
                    buffer = '';
                    prev = next + 1;
                    continue
                }
                players -= 1
                // do something with `buffer` here ...

                playerName = buffer.split(" ")[2]
                console.log(buffer.split(" "))
                if (playerName != "are") {
                    finalName = ""
                    erase = false;
                    for (i in playerName) {
                        if (playerName[i] == "[") {
                            erase = true;
                        }
                        if (!erase) {
                            finalName += playerName[i]
                        }
                        if (playerName[i] == "]") {
                            erase = false;
                        }
                    }
                    console.log(finalName)
                    embed.description += finalName + "\n"
                } else {
                    embed.description += "No players are currently in the server.\n"
                }
                buffer = '';
                prev = next + 1;
                if (players < 0) {
                    break;
                }
            }
            buffer += data.substring(prev);
        });

        server.write(`players\n`);

        await delay(1000) /// waiting 1 second.
        console.log(embed)
        interaction.editReply({ embeds: [embed] })

        // await interaction.deferReply();
        // players = ""
        // console.log(myServer.connect())
        // myServer.command("players", (data) => {
        //     console.log("executing the command: players")
        //     console.log(`data: ${data}`)
        //     players = data
        //     console.log(players)
        //     const embed = {
        //         "title": `Players:\n${players}`,
        //         "color": "#ffff00"
        //     }
        //     // return embed;
        //     console.log("send embed")
        //     return interaction.reply({ embeds: [embed] });
        // })
        // 
        // myServer.disconnect()
        console.log("finished")
    },
};