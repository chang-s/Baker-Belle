const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

const roles = [
    {
        id: '1235260276090208286',
        label: 'Hearthstone',
        emoji: '1237332553384333373',
    },
    {
        id: '1235259946539417620',
        label: 'League of Legends',
        emoji: '1237332551715258379',
    },
    {
        id: '1244887663224422401',
        label: 'Teamfight Tactics',
        emoji: '1244888653692538951',
    },
    {
        id: '1237326691198832671',
        label: 'Other Games',
        emoji: '1237332548695101482',
    },
];

module.exports = {
    name: 'gameroles',
    description: 'This is the ping command!',

    run: async (client, message, args) => {
        try {
            const channel = await client.channels.fetch('1244768958247342121');
            if (!channel) return;

            const row = new ActionRowBuilder();
        
            roles.forEach((role) => {
                row.components.push(
                    new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setEmoji(role.emoji).setStyle(ButtonStyle.Primary)
                )
            })
    
           await  channel.send({
                content: 'Add or remove a role by clicking on a button below!',
                components: [row],
            });

		} catch (error) {
			console.error(`There was an error: ${error}`);
		}
    }
}