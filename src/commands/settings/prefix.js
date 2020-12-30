const { getGuildById, updateGuildById } = require("../../utils/functions");
const { ownerId } = require("../../../config.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "prefix",
  description: "",
  category: "settings",
  cooldown: 2,
  memberPermissions: ["MANAGE_GUILD"],
  botPermissions: ["ADD_REACTIONS"],
  async execute(bot, message, args) {
    const prefix = args[0];
    const lang = await bot.getGuildLang(message.guild.id);
    const guild = await getGuildById(message.guild.id);

    if (!prefix)
      return message.channel.send(
        `${lang.GLOBAL.SERVER_PREFIX}: \`${guild.prefix}\`\n${lang.OTHER.PREFIX_UPDATE.replace("{cmd}", `${guild.prefix}prefix <prefix>`)}`
      );

    if (message.author.id === ownerId) {
      setPrefix(message, prefix);
      message.react("✅");
    } else if (message.member.permissions.has(["MANAGE_GUILD"])) {
      setPrefix(message, prefix);
      message.react("✅");
    } else {
      return message.channel.send(`<:err:786969738030612547> ${lang.MEMBER.NO_PERMS}`);
    }
  },
};

async function setPrefix(message, prefix) {
  await updateGuildById(message.guild.id, { prefix });


}
