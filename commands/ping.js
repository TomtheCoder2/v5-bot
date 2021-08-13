const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        const embed = {
            "title":"Pong!",
            "color":"#00f0f0"
        }
        return interaction.reply({embeds: [embed]});
    },
};