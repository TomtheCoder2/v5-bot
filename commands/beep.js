const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('beep')
        .setDescription('Beep!'),
    async execute(interaction) {
        const embed = {
            "title":"Boop!",
            "color":"#00f0f0"
        }
        return interaction.reply({embeds: [embed]});
    },
};