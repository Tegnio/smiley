const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "quote",
  description: "",
  category: "fun",
  aliases: [],
  cooldown: 2,
  usage: "quote <text>",
  botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  memberPermissions: [],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const quote = args[0];

    if (!args) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS)
    }

    const embed = BaseEmbed(message)
    .setDescription(`**${quote}**\n\n© ${message.author.tag}`);

    message.channel.send(embed);
    message.delete();
  },
};
