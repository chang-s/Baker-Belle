const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

const GAMES = [
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
    label: 'TeamFight Tactics',
    emoji: '1244888653692538951',
  },
  {
    id: '1237326691198832671',
    label: 'Other Games',
    emoji: '1237332548695101482',
  },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gameRoles')
    .setDescription('Grant server roles for different games'),
  async execute(interaction) {
    const getEmote = (gameName) => {
      const game = GAMES.find((game) => game.label == gameName);
      return interaction.client.emojis.cache.get(game.emoji);
    };

    const getRole = (gameName) => {
      const game = GAMES.find((game) => game.label == gameName);
      return interaction.guild.roles.cache.get(game.id);
    };

    const message = interaction.reply({
      content: `
Please react with the emote for your game:
${GAMES.map(({ label }) => `${getEmote(label)} - ${label}`).join('\n')}
`,
      ephemeral: true,
      fetchReply: true,
    });

    try {
      await message.react(getEmote('Hearthstone'));
      await message.react(getEmote('League of Legends'));
      await message.react(getEmote('TeamFight Tactics'));
      await message.react(getEmote('Other Games'));
    } catch (err) {
      console.error('Error on reacting with emojis', err);
    }

    const collectorFilter = (reaction, user) => {
      return (
        GAMES.map((game) => getEmote(game.label)).includes(reaction.emoji) &&
        user.id == interaction.user.id
      );
    };

    const collector = message.createReactionCollector({
      filter: collectorFilter,
      max: GAMES.length,
      time: 60_000,
    });

    const handleReact = async (interaction, reaction, user) => {
      let roleId;
      switch (reaction.emoji) {
        case getEmote('Hearthstone'):
          roleId = getRole('Hearthstone');
          break;
        case getEmote('League of Legends'):
          roleId = getRole('League of Legends');
          break;
        case getEmote('TeamFight Tactics'):
          roleId = getRole('TeamFight Tactics');
          break;
        case getEmote('Other Games'):
          roleId = getRole('Other Games');
          break;
        default:
          console.error('Unexpected emote', reaction.emoji);
      }

      try {
        const role = interaction.guild.roles.cache.get(roleId);
        if (!role) {
          throw new Error('RoleNotFound');
        }

        const hasRole = user.roles.cache.has(role.id);
        if (hasRole) {
          await user.roles.remove(role);
          await interaction.editReply(`The role ${role} has been removed.`);
        } else {
          await user.roles.add(role);
          await interaction.editReply(`The role ${role} has been added.`);
        }

        await wait(3_000);
        await interaction.deleteReply();
      } catch (err) {
        console.error('Error while trying to react to role', err);
        interaction.editReply({
          content: "I couldn't find that role",
        });
      }
    };

    collector.on('collect', (reaction, user) => {
      handleReact(interaction, reaction, user);
    });
  },
};
