const moment = require("moment");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "about",
  category: "general",
  aliases: ["bot", "botinfo", "info", "ping", "stats"],
  cooldown: 2,
  botPermissions: ["EMBED_LINKS"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const avatar = bot.user.displayAvatarURL({ dynamic: true });

    const embed = BaseEmbed(message)
      .setAuthor(lang.BOT.ABOUT, avatar)
      .addField(lang.BOT.GENERAL_INFO,
        `
        **${lang.BOT.PLATFORM}**: ${process.platform} (${process.arch})
        **${lang.BOT.LATENCY}**: ${bot.formatNumber(Math.round(bot.ws.ping))} ${lang.TIME.MILLISECONDS}
        **${lang.BOT.SHARDS}**: ${bot.formatNumber(bot.ws.totalShards)}
        **${lang.BOT.SERVERS}**: ${bot.formatNumber(bot.guilds.cache.size)}
        **${lang.BOT.USERS}**: ${bot.formatNumber(bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0))}
        **${lang.BOT.COMMANDS}**: ${bot.commands.size}
        **${lang.BOT.VOICE_CONNECTIONS}**: ${bot.formatNumber(bot.voice.connections.size)}
        `, true)
      .addField(lang.BOT.USEFUL_LINKS,
        `
        [${lang.BOT.SUPPORT_SERVER}](https://discord.gg/FJmgqt2ktg)
        [${lang.BOT.ADD}](https://discord.com/api/oauth2/authorize?client_id=781179810700984330&permissions=1177939008&scope=bot)
        **${lang.BOT.VOTE}**
        [BotiCord](https://boticord.top/bot/781179810700984330)
        [Bots-SDC](https://bots.server-discord.com/781179810700984330)
        [Bots For Discord](https://botsfordiscord.com/bot/781179810700984330)
        [Discord Bots](https://discord.bots.gg/bots/781179810700984330)
        [Discord Boats](https://discord.boats/bot/781179810700984330)
        `, true)
        .addField(lang.BOT.ACKNOWLEDGMENTS,
`\`\`\`rb
[ElectroPlayer ✔]#0256 [ID: 283666032823107585]
CasperTheGhost#4546 [ID: 406323530301571072]\`\`\`
`);

    message.channel.send(embed);
  },
};
