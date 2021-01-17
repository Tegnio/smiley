const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "avatar",
  description: "",
  category: "useful",
  aliases: ["ava", "av"],
  cooldown: 2,
  botPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
  async execute(bot, message, args) {
    message.channel.startTyping();
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);
    const sizes = ["64", "128", "256", "512", "1024", "2048", "4096"];

    const avatar = member.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true });

    const embed = BaseEmbed(message)
      .setTitle(lang.IMAGE.FAILED_TO_LOAD)
      .setURL(avatar)
      .setImage(avatar);

    message.channel.stopTyping(true);
    message.channel.send(embed);
  },
};
