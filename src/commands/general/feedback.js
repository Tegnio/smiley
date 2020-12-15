const { feedBackChannelId } = require("../../../config.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "feedback",
  description: "",
  category: "general",
  cooldown: 20,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const feedback = args.join(" ");

    if (!feedback) return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);

    if (!feedBackChannelId || feedBackChannelId === "") return;

    const embed = BaseEmbed(message)
      .setTitle(lang.OTHER.FEEDBACK_NEW)
      .setDescription(feedback);

    bot.channels.cache.get(feedBackChannelId).send(embed);

    message.channel.send(lang.OTHER.FEEDBACK_SENT);
  },
};
