const Discord = require("discord.js");
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

const prefix = '!'; // Prefix for bot commands
const roleIds = {
    RED: '1244748579524968483',     // ID of the RED role
    BLUE: '1244748633967038587',   // ID of the BLUE role
    GREEN: '1244748706671099904'  // ID of the GREEN role
};
const TOKEN = 'MTI0NDczMTQ5MzQ0NDYxNjI1Mg.GdW_8t.MxHEui6r7EuKmoDnus26PsWVs3bOEG0a9zW2i8'; // Your bot token

module.exports = {
	// data: new SlashCommandBuilder()...
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

		const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Confirm Ban')
			.setStyle(ButtonStyle.Danger);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cancel')
			.setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
        .addComponents(cancel, confirm);

		await interaction.reply({
			content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
			components: [row],
		});
	},
};

client.once('ready', () => {
    console.log('Baker Belle is ready!');
});

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === '!roles') {
    }
});

// Replace 'YOUR_TOKEN' with your bot token
client.login(TOKEN);