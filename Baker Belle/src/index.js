// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const wait = require('node:timers/promises').setTimeout;
const { Client, IntentsBitField, Events, GatewayIntentBits, SlashCommandBuilder, Collection } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent
	],
});

client.commands = new Collection();
client.prefix = new Map();

// Combines all Prefix files
const prefixPath = path.join(__dirname, 'prefix');
const prefixFolders = fs.readdirSync(prefixPath).filter((f) => f.endsWith('.js'));

for (arx of prefixFolders) {
	const cmd = require(prefixPath + '\\' + arx)
	client.prefix.set(cmd.name, cmd);
}

client.on('messageCreate', async message => {
	const prefix = '!';

	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	const prefixCmd = client.prefix.get(command);
	if (prefixCmd) {
		prefixCmd.run(client, message, args)
	}
});

// Combines all Command files
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Combines all Events files
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Game Roles prefix command
/*
client.on('interactionCreate', async (interaction) => {
	try {
	  if (!interaction.isButton()) return;
	  await interaction.deferReply({ ephemeral: true });
  
	  const role = interaction.guild.roles.cache.get(interaction.customId);
	  if (!role) {
		interaction.editReply({
		  content: "I couldn't find that role",
		});
		return;
	  }
  
	  const hasRole = interaction.member.roles.cache.has(role.id);
  
	  if (hasRole) {
		await interaction.member.roles.remove(role);
		await interaction.editReply(`The role ${role} has been removed.`);
		return;
	  }
  
	  await interaction.member.roles.add(role);
	  await interaction.editReply(`The role ${role} has been added.`);

	  await wait(3_000);
	  await interaction.deleteReply();
	} catch (error) {
	  console.log(error);
	}
});
*/

// Log in to Discord with your client's token
client.login(token);