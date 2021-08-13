const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('options-info')
        .setDescription('Information about the options provided.')
        .addStringOption(option => option.setName('input').setDescription('The input to echo back')),
    async execute(interaction) {
        const value = interaction.options.getString('input');
        if (value) {
            const embed = {
                "title": `The options value is: \`${value}\``
            }
            return interaction.reply({ embeds: [embed] })
        };
        return interaction.reply({ embeds: [{ "title": 'No option was provided!', "color": "#ff0000" }] });
    },
};