const { SlashCommandBuilder } = require('@discordjs/builders');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
module.exports = {
    // data: new SlashCommandBuilder()
    //     .setName('mindustry')
    //     .setDescription('Runs a mindustry command in the console!')
    //     .addStringOption(option =>
    //         option.setName('command')
    //             .setDescription('The command.')
    //             .setRequired(true)),
    data: {
        name: 'mindustry',
        description: 'Runs a mindustry command in the console! (only for admins)',
        default_permission: true,
        options: [
            {
                type: 3,
                name: 'command',
                description: 'The command.',
                required: true,
                choices: undefined
            }
        ],
        permissions: [
            {
                id: '865104128690880512',
                type: 'ROLE',
                permission: true,
            },
        ]
    },
    async execute(interaction, server, client) {
        // console.log(interaction.user, client)
        author = client.users.cache.find(user => user.id === interaction.user.id)
        // console.log(author)
        if (author.id != '770240444466069514' && author.id != "687347431548911644") {
            const embed = {
                "title":`There was an error trying to execute that command!`,
                "description":`you need Moderator role in order to use this command`,
                "color":"#ff0000"
            }
            // .addField("Usuario", '${message.author.username}#${message.author.discriminator}')
            // .addField("ID", message.author.id)
            // .addField("Creación", message.author.createdAt);
            interaction.reply({embeds:[embed]})
            return;
        }

        console.log(interaction.channelId)

        if (interaction.channelId != "864903369188180048" && interaction.channelId != "864922006565552148") {
            const embed = {
                "title":`There was an error trying to execute that command!`,
                "description":`Please use this command in #staff-bot`,
                "color":"#ff0000"
            }
            // .addField("Usuario", '${message.author.username}#${message.author.discriminator}')
            // .addField("ID", message.author.id)
            // .addField("Creación", message.author.createdAt);
            interaction.reply({embeds:[embed]})
            return;
        }

        const command = interaction.options.getString('command');
        console.log(`run command: "${command}"`)
        // ff
        await interaction.deferReply();

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
                    if (buffer[i] == "[" && buffer[i+3] == "m") {
                        erase = true
                        eraseCount = 3
                    }
                    if (eraseCount == 0) {
                        finalBuffer+=buffer[i]
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

        server.write(`${command}\n`);

        await delay(1000) /// waiting 1 second.
        console.log(embed)
        interaction.editReply({ embeds: [embed] })

        console.log("finished")
    },
};