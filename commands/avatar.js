const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar URL of the selected user, or your own avatar.')
        .addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        if (user) {
            const embed = {
                "title":`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`,
                "image": {
                    "url": `${user.displayAvatarURL({ dynamic: true })}`,
                },
            }
            return interaction.reply({ embeds: [embed] })
        };
        const embed = {
            "title":`Your avatar: ${interaction.user.displayAvatarURL({ dynamic: true })}`,
            "image": {
                "url": `${interaction.user.displayAvatarURL({ dynamic: true })}`,
            },
        }
        return interaction.reply({embeds:[embed]});
    },
};