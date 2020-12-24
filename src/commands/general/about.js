const moment = require("moment");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "about",
  description: "",
  category: "general",
  aliases: ["bot", "botinfo", "info", "ping", "stats", "uptime"],
  cooldown: 2,
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const avatar = bot.user.displayAvatarURL({ dynamic: true });
    const uptime = moment
      .duration(bot.uptime)
      .format(`D [${lang.TIME.DAYS}] h [${lang.TIME.HOURS}] m [${lang.TIME.MINUTES}] s [${lang.TIME.SECONDS}]`);

    const embed = BaseEmbed(message)
      .setAuthor(lang.BOT.ABOUT, avatar)
      .addField(lang.BOT.DEVELOPER,
        `
        [Tegnio#6882](https://tegnio.carrd.co/)
        `, true)
      .addField(lang.BOT.PLATFORM, `${process.platform} / ${process.arch}`, true)
      .addField(lang.BOT.LATENCY, `${Math.round(bot.ws.ping)} ${lang.TIME.MILLISECONDS}`, true)
      .addField(lang.BOT.SERVERS, bot.guilds.cache.size, true)
      .addField(lang.BOT.USERS, bot.users.cache.size, true)
      .addField(lang.BOT.COMMANDS, bot.commands.size, true)
      .addField(lang.BOT.USEFUL_LINKS,
        `
      [${lang.BOT.SUPPORT_SERVER}](https://discord.gg/FJmgqt2ktg)
      [${lang.BOT.ADD}](https://discord.com/api/oauth2/authorize?client_id=781179810700984330&permissions=8&scope=bot)
        `, true)
      .addField(lang.BOT.USED_APIS,
      `
      [NekoBot API](https://nekobot.xyz/api/)
      [No API Key](https://no-api-key.com/)
      [Some Random API](https://some-random-api.ml/)
      [Useless API](https://useless-api--vierofernando.repl.co/)
      `, true)
      .addField(lang.BOT.VOTE,
      `
      [Bots S-D.C](https://bots.server-discord.com/781179810700984330)
      [Top Bots List](https://top-bots.xyz/bot/781179810700984330)
      [TopCord](https://bots.topcord.ru/bots/781179810700984330)
      [BotiCord](https://boticord.top/bot/781179810700984330)
      [⌛ Top.gg](https://top.gg/bot/781179810700984330)
      `, true)
      .addField(lang.BOT.SPECIAL_THANKS,
      `\`\`\`rb
Xaliks#5991 (448799481777881089)
[ElectroPlayer ✔]#0256 (283666032823107585)
CasperTheGhost#4546 (406323530301571072)\`\`\`
      `);

    message.channel.send(embed);
  },
};
