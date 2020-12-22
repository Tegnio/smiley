const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "poll",
  description: "",
  category: "useful",
  cooldown: 5,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const question = args.join(" ");

    if (!question) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }
    if(question.length > 256) {
      return message.channel.send(lang.GLOBAL.LONG_ARGS
        .replace("{length}", question.length)
        .replace("{limit}", "256"));
    }

    const embed = BaseEmbed(message)
    .setTitle(question);

    const sendMessage = await message.channel.send(embed);
    message.delete();

    sendMessage.react("👍");
    sendMessage.react("👎");
    sendMessage.react("🤷");
  },
};
