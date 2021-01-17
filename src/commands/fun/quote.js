const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "quote",
  category: "fun",
  cooldown: 2,
  botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  async execute(bot, message, args) {
    message.channel.startTyping();
    const lang = await bot.getGuildLang(message.guild.id);
    const quote = args.join(" ");

    if (!quote) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS)
    };
    if (quote.length > 1024) {
      return message.channel.send(lang.GLOBAL.LONG_ARGS
      .replace("{length}", quote.length)
      .replace("{limit}", "1024"))
    }

    const embed = BaseEmbed(message)
    .setDescription(`**${quote}**`);

    message.channel.stopTyping(true);
    message.channel.send(embed);
  },
};
