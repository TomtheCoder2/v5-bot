const { SlashCommandBuilder } = require('@discordjs/builders');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
module.exports = {
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('Send a message in the chat ingame!')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message.')
                .setRequired(true)),
    async execute(interaction, server, client) {
        author = client.users.cache.find(user => user.id === interaction.user.id)
        const message = interaction.options.getString('message');
        // console.log(author)
        console.log(`send message: "${message}"`)

        command = `js Call.sendMessage("[#ADD8E6]${author.username}#${author.discriminator}@discord[accent] > [white]${message}");"[#ADD8E6]${author.username}#${author.discriminator}@discord[accent] > [white]${message}";`
        console.log(command)

        server.write(`${command}\n`)
        const embed = {
            "title":"Sent message!",
            "description":`"${author.username}#${author.discriminator}@discord>${message}`
        }
        interaction.reply({embeds:[embed]})

    },
};