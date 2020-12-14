const { getGuildById, updateGuildById } = require("../../utils/functions");
const { ownerId } = require("../../../config.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "prefix",
  description: "",
  category: "settings",
  cooldown: 10,
  async execute(bot, message, args) {
    const prefix = args[0];
    const lang = await bot.getGuildLang(message.guild.id);
    const guild = await getGuildById(message.guild.id);

    if (!prefix)
      return message.channel.send(
        `${lang.GLOBAL.SERVER_PREFIX}: \`${guild.prefix}\` \n Use \`${guild.prefix}prefix <prefix>\` to set a new prefix`
      );

    if (message.author.id === ownerId) {
      setPrefix(message, prefix);
      message.channel.send(lang.OTHER.PREFIX_UPDATED.replace("{prefix}", prefix));
    } else if (message.member.permissions.has(["MANAGE_GUILD"])) {
      setPrefix(message, prefix);
      message.channel.send(lang.OTHER.PREFIX_UPDATED.replace("{prefix}", prefix));
    } else {
      return message.channel.send(`<:err:786969738030612547> ${lang.GLOBAL.NO_PERMS}`);
    }
  },
};

async function setPrefix(message, prefix) {
  await updateGuildById(message.guild.id, { prefix });


}
