const {
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('funban')
    .setDescription('Pretend to ban someone!')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The member to ban')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('reason').setDescription('The reason for banning')
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason =
      interaction.options.getString('reason') ?? 'No reason provided';

    const confirm = new ButtonBuilder()
      .setCustomId('confirm')
      .setLabel('Confirm Ban')
      .setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(cancel, confirm);

    const response = await interaction.reply({
      content: `Are you sure you want to ban ${user} for reason: ${reason}?`,
      components: [row],
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    const confirmation = await response.awaitMessageComponent({
      filter: collectorFilter,
      time: 60_000,
    });

    if (confirmation.customId === 'confirm') {
      await confirmation.update({
        content: `${user.username} has been banned for reason: ${reason}`,
        components: [],
      });
    } else if (confirmation.customId === 'cancel') {
      await confirmation.update({
        content: `Phew, ${user.username} hasn't been banned!`,
        components: [],
      });
    }
  },
};
