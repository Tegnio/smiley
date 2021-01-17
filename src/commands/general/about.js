const moment = require("moment");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "about",
  description: "",
  category: "general",
  aliases: ["bot", "botinfo", "info", "ping", "stats", "uptime"],
  cooldown: 2,
  botPermissions: ["EMBED_LINKS"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const avatar = bot.user.displayAvatarURL({ dynamic: true });

    const embed = BaseEmbed(message)
      .setAuthor(lang.BOT.ABOUT, avatar)
      .addField(lang.BOT.GENERAL_INFO,
        `
        **${lang.BOT.DEVELOPER}**: Tegnio#6882
        **${lang.BOT.PLATFORM}**: ${process.platform} (${process.arch})
        **${lang.BOT.LATENCY}**: ${bot.formatNumber(Math.round(bot.ws.ping))} ${lang.TIME.MILLISECONDS}
        **${lang.BOT.SHARDS}**: ${bot.formatNumber(bot.ws.totalShards)}
        **${lang.BOT.SERVERS}**: ${bot.formatNumber(bot.guilds.cache.size)}
        **${lang.BOT.USERS}**: ${bot.formatNumber(bot.users.cache.size)}
        **${lang.BOT.COMMANDS}**: ${bot.commands.size}
        `, true)
      .addField(lang.BOT.USEFUL_LINKS,
        `
        [${lang.BOT.SUPPORT_SERVER}](https://discord.gg/FJmgqt2ktg)
        [${lang.BOT.ADD}](https://discord.com/api/oauth2/authorize?client_id=781179810700984330&permissions=8&scope=bot)
        **${lang.BOT.USED_APIS}**
        [NekoBot API](https://nekobot.xyz/api/)
        [Nekos.life](https://nekos.life/api/v2/endpoints/)
        [No API Key](https://no-api-key.com/)
        [Some Random API](https://some-random-api.ml/)
        [Useless API](https://useless-api--vierofernando.repl.co/)
        **${lang.BOT.VOTE}**
        [Bots S-D.C](https://bots.server-discord.com/781179810700984330)
        [TopCord](https://bots.topcord.ru/bots/781179810700984330)
        [BotiCord](https://boticord.top/bot/781179810700984330)
        [Top.gg](https://top.gg/bot/781179810700984330)
        `, true)
        .addField(lang.BOT.SPECIAL_THANKS,
`\`\`\`rb
[ElectroPlayer ✔]#0256 [ID: 283666032823107585]
CasperTheGhost#4546 [ID: 406323530301571072]\`\`\`
`);

    message.channel.send(embed);
  },
};
