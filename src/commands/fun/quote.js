const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "quote",
  description: "",
  category: "fun",
  cooldown: 2,
  usage: "quote <text>",
  botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  memberPermissions: [],
  async execute(bot, message, args) {
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

    message.channel.send(embed);
    message.delete();
  },
};
