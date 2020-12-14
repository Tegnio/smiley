const moment = require("moment");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "about",
  description: "",
  category: "general",
  aliases: ["ping"],
  cooldown: 2,
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const avatar = bot.user.displayAvatarURL({ dynamic: true });
    const uptime = moment
      .duration(bot.uptime)
      .format(`D [${lang.TIME.DAYS}] h [${lang.TIME.HOURS}] m [${lang.TIME.MINUTES}] s [${lang.TIME.SECONDS}]`);

    const embed = BaseEmbed(message)
      .setAuthor(lang.BOT.ABOUT, avatar)
      .addField(lang.BOT.DEVELOPER, `Tegnio#6882`, true)
      .addField(lang.BOT.UPTIME, uptime, true)
      .addField(lang.BOT.LATENCY, `${Math.round(bot.ws.ping / 2)} ${lang.TIME.MILLISECONDS}`, true)
      .addField(lang.BOT.SERVERS, bot.guilds.cache.size, true)
      .addField(lang.BOT.USERS, bot.users.cache.size, true)
      .addField(lang.BOT.COMMANDS, bot.commands.size, true)
      .addField(lang.BOT.USEFUL_LINKS,
        `
      [${lang.BOT.SUPPORT_SERVER}](https://discord.gg/FJmgqt2ktg)
      [${lang.BOT.ADD}](https://discord.com/api/oauth2/authorize?client_id=781179810700984330&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2FFJmgqt2ktg&response_type=code&scope=guilds.join%20bot)
        `, true)
      .addField(lang.BOT.USED_APIS,
      `
      [NekoBot.xyz](https://nekobot.xyz/api)
      [Some Random API](https://some-random-api.ml)
      [LMGTFY](https://lmgtfy.app)
      `, true)
      .addField(lang.BOT.VOTE,
      `
      [bots.s-d.c](https://bots.server-discord.com/781179810700984330)
      `, true);

    message.channel.send(embed);
  },
};
