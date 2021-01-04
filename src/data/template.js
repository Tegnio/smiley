const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "",
  description: "",
  category: "",
  aliases: [],
  cooldown: 2,
  usage: "",
  botPermissions: [],
  memberPermissions: [],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);

    // Remove this and write some code

  },
};
