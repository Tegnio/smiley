const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "magik",
  category: "fun",
  aliases: ["magic"],
  cooldown: 2,
  botPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
  async execute(bot, message, args) {
    message.channel.startTyping();
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);
    const image = member.user.displayAvatarURL({ size: 512, format: "png" });
    let intensity = args[1] || Math.floor(Math.random() * 10);
    if (member.user.id === message.author.id) {
      intensity = args[0] || Math.floor(Math.random() * 10);
    }
    const data = await fetch(`https://nekobot.xyz/api/imagegen?type=magik&image=${image}&intensity=${intensity}`)
      .then((res) => res.json());

    const embed = BaseEmbed(message)
    .setTitle(lang.IMAGE.FAILED_TO_LOAD)
    .setURL(data.message)
    .setImage(data.message);

    message.channel.stopTyping(true);
    message.channel.send(embed);
  },
};
