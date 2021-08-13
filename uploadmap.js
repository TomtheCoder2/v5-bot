const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const download = require("download")
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
// connect to the mindustry server
const {server} = require("./server");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

client.once('ready', () => {
    // console.log('Ready!');
    console.log(`Ready! Logged in as ${client.user.tag}`);
    // client.getCommands().then(console.log).catch(console.error);
});

client.on("messageCreate", async message => {
    console.log(message.content)
    if (message.content != "/uploadmap") { return console.log("not /uploadmap") }
    if (!message.member.roles.cache.has('861523420076179457')) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`There was an error trying to execute that command!`)
            .setDescription(`you need Moderator role in order to use this command`)
            .setColor("#ff0000")
        // .addField("Usuario", '${message.author.username}#${message.author.discriminator}')
        // .addField("ID", message.author.id)
        // .addField("Creación", message.author.createdAt);
        message.channel.send(embed);
        return;
    }
    if (message.attachments.first()) {//checks if an attachment is sent
        console.log(message.attachments.first().url.substr(message.attachments.first().url.length - 4))
        if (message.attachments.first().url.substr(message.attachments.first().url.length - 4) === "msav") {
            console.log("download map")
            download(message.attachments.first().url, "/root/Mindustry/v5/config/maps/").then(async function () {
                var buffer = '';
                const embed = {
                    "color": "#ffff00",
                    "description": "**Output:**\n"
                }
                var buffer = '';
                server.on('data', function (data) {
                    // console.log("start while loop!")
                    var prev = 0, next;
                    data = data.toString('utf8'); // assuming utf8 data...
                    while ((next = data.indexOf('\n', prev)) > -1) {
                        buffer += data.substring(prev, next);
                        buffer = buffer.replace("[93m", "")
                        buffer = buffer.replace("[95m", "")
                        buffer = buffer.replace("[33m", "")
                        buffer = buffer.replace("[93m", "")
                        buffer = buffer.replace("[1m", "")
                        buffer = buffer.replace("[3m", "")
                        buffer = buffer.replace("", "")
                        buffer = buffer.replace("\x1B", "")
                        buffer = buffer.replace("", "")
                        buffer = buffer.replace(/[^a-zA-Z0-9[] ]/g, "")

                        erase = false;
                        eraseCount = 0
                        finalBuffer = ""
                        for (i in buffer) {
                            if (buffer[i] == "[" && buffer[i + 3] == "m") {
                                erase = true
                                eraseCount = 3
                            }
                            if (eraseCount == 0) {
                                finalBuffer += buffer[i]
                            } else {
                                eraseCount -= 1;
                            }
                        }
                        buffer = finalBuffer
                        console.log('buffer: ' + buffer);
                        embed.description += buffer + "\n"
                        buffer = '';
                        prev = next + 1;
                    }
                    buffer += data.substring(prev);

                });
                server.write("reloadmaps\n");
                await delay(1000)

                console.log(embed)
                message.channel.send({ embeds: [embed] })


                console.log("finished")
            })
        }
        return
    }
})


client.login(token)