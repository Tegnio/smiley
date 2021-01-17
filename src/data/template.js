const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "",
  category: "",
  aliases: [],
  cooldown: 2,
  botPermissions: [],
  memberPermissions: [],
  async execute(bot, message, args) {
    message.channel.startTyping();
    const lang = await bot.getGuildLang(message.guild.id);

    // Remove this and write some code

    message.channel.stopTyping(true);
    message.channel.send(embed);
  },
};
