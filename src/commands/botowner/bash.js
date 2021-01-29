const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "bash",
  category: "botowner",
  ownerOnly: true,
  aliases: ["sh"],
  botPermissions: ["EMBED_LINKS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    message.channel.send(lang.OTHER.PROCESSING)
    .then(msg => msg.edit(require('child_process')
      .execSync(args.join(' '))
      .toString('utf8') + ' '));
  },
};
