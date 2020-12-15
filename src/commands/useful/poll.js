const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "poll",
  description: "",
  category: "useful",
  cooldown: 5,
  memberPermissions: "MANAGE_MESSAGES",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const question = args.join(" ");

    if (!question) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }

    const embed = BaseEmbed(message)
    .setTitle(question));

    const sendMessage = await message.channel.send(embed);

    sendMessage.react("👍");
    sendMessage.react("👎");
    sendMessage.react("🤷");
  },
};
