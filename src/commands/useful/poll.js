const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "poll",
  description: "",
  category: "useful",
  cooldown: 5,
  botPermissions: ["ADD_REACTIONS", "EMBED_LINKS"],
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

    message.channel.startTyping();
    const embed = BaseEmbed(message)
    .setTitle(question);

    message.channel.stopTyping(true);
    const sendMessage = await message.channel.send(embed);

    sendMessage.react("👍");
    sendMessage.react("👎");
    sendMessage.react("🤷");

  },
};
