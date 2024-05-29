const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require('discord.js');

const games = [
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

  run: async (client, message, _args) => {
    try {
      const channel = await client.channels.fetch('1244768958247342121');
      if (!channel) return;

      const row = new ActionRowBuilder();

      games.forEach((role) => {
        row.components.push(
          new ButtonBuilder()
            .setCustomId(role.id)
            .setLabel(role.label)
            .setEmoji(role.emoji)
            .setStyle(ButtonStyle.Primary)
        );
      });

      const embed = new EmbedBuilder()
        .setTitle('Embed title')
        .setDescription('This is an embed description')
        .setColor('Random')
        .addFields(
          {
            name: 'Field title',
            value: 'Some random value',
            inline: true,
          },
          {
            name: '2nd Field title',
            value: 'Some random value',
            inline: true,
          }
        );

      message.channel.send({ embeds: [embed] }, { components: [row] });

      await channel.send({
        components: [row],
      });

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
    } catch (error) {
      console.error(`There was an error: ${error}`);
    }
  },
};
