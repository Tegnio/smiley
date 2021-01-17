const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "captcha",
  category: "fun",
  cooldown: 2,
  botPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
  async execute(bot, message, args) {
    message.channel.startTyping();
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);
    const username = await encodeURIComponent(member.user.username);
    const image = member.user.displayAvatarURL({ size: 512, format: "jpeg", dynamic: true });
    const data = await fetch(`https://nekobot.xyz/api/imagegen?type=captcha&url=${image}&username=${username}`)
      .then((res) => res.json());

    const embed = BaseEmbed(message)
    .setTitle(lang.IMAGE.FAILED_TO_LOAD)
    .setURL(data.message)
    .setImage(data.message);

    message.channel.stopTyping(true);
    message.channel.send(embed);
  },
};
