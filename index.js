const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
// connect to the mindustry server
// const net = require('net');
// const server = new net.Socket();
// server.connect(6859, 'localhost', () => console.log('Connected'));
const {server} = require("./server");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
console.log("all commands:")
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    console.log(`   ${command.data.name}`)
}

client.once('ready', () => {
    // console.log('Ready!');
    console.log(`Ready! Logged in as ${client.user.tag}`);
    // client.getCommands().then(console.log).catch(console.error);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (!client.commands.has(interaction.commandName)) return;

    try {
        commandName = client.commands.get(interaction.commandName).data.name
        console.log(`execute command: ${client.commands.get(interaction.commandName).data.name}`)
        if (commandName != "log") {
            await client.commands.get(interaction.commandName).execute(interaction, server, client);
        } else {
            client.commands.get(interaction.commandName).execute(interaction, server)
        }
        console.log(`finished command: ${commandName}`)
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


client.on("messageCreate", message => {
    console.log(message)
    if (message != "/uploadmap") {return}
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
            download(message.attachments.first().url, "~/Mindustry/v5/config/maps/").then(function () {
                server.write("reloadmaps\n");
            })
        }
        return
    }
})


client.login(token).then(console.log)