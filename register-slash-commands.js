const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // console.log(command)
    if (file != "mindustry.js") {
        json = command.data.toJSON()
        console.log(json)
        commands.push(json);
    } else {
        console.log(command.data)
        commands.push(command.data)
    }
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        // client.api.applications(client.user.id).guilds("861522903522607124").commands("875399483465277470").delete();
        console.log(await rest.put(
            Routes.applicationGuildCommands("874725576638890044", "861522903522607124"),
            { body: commands },
        ));


        console.log('Successfully reloaded application (/) commands.');

        if (!client.application?.owner) await client.application?.fetch();

        const command = await client.guilds.cache.get('861522903522607124')?.commands.fetch('875412788938440715').then(console.log);    

        console.log(command)

        const permissions = [
            {
                id: '865104128690880512',
                type: 'ROLE',
                permission: true,
            },
        ];

        // await command.permissions.add({ permissions });
    } catch (error) {
        console.error(error);
    }

})();

