const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

const roles = [
    {
        id: '1244748579524968483',
        label: 'Red',
    },
    {
        id: '1244748633967038587',
        label: 'Blue',
    },
    {
        id: '1244748706671099904',
        label: 'Green',
    },
];

module.exports = {
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('gamerole')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
        const channel = await interaction.guild.channels.cache.get('1244768958247342121');
        if (!channel) return;

        const row = new ActionRowBuilder();
        
        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )
        })

       await  channel.send({
            content: 'Add or remove a role by clicking on a button below!',
            components: [row],
        });

        process.exit();
	},
};