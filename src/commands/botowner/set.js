const { updateGuildById, getGuildById } = require("../../utils/functions");

module.exports = {
  name: "set",
  category: "botowner",
  botPermissions: ["ADD_REACTIONS", "EMBED_LINKS"],
  memberPermissions: ["ADMINISTRATOR"],
  ownerOnly: true,
  async execute(bot, message, args) {
    const guildId = message.guild.id;
    const lang = await bot.getGuildLang(guildId);
    const locales = bot.getLanguages();
    const { prefix } = await getGuildById(guildId);
    const option = args[0];
    const item = message.mentions.channels.first() || message.mentions.roles.first();
    const locale = args[1];

    if (!option) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }

    switch (option.toLowerCase()) {
      case "locale": {
        if (!locale) {
          return message.channel.send(
            `${lang.LANG.LIST} ${locales
            .map((l) => `\`${l}\``)
            .join(", ")}`
          );
        } else if(!languages.includes(locale)) {
          return message.channel.send(
        `${lang.LANG.NOT_AVAILABLE} ${locale
          .map((l) => `\`${l}\``)
          .join(", ")}`
          );
        } else updateItem("locale", locale, guildId);
        message.react("✅")
        break;
      }
      default:
        return message.channel.send(`\`${option}\` is not a option!`);
    }
  },
};

async function updateItem(type, item, guildId) {
  await updateGuildById(guildId, {
    [type]: item,
  });
}
