const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "iq",
  description: "",
  category: "fun",
  cooldown: 2,
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const iq = Math.floor(Math.random() * 160) + 1;

    const embed = BaseEmbed(message)
      .setTitle(lang.OTHER.IQ.replace("{iq}", iq));

    message.channel.send(embed);
  },
};
