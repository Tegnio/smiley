const { addGuild } = require("../utils/functions");
const Logger = require("../modules/Logger");

module.exports = {
  name: "guildCreate",
  async execute(bot, guild) {
    await addGuild(guild.id);
    Logger.log("guilds", `Added guild ${guild.name} (ID: ${guild.id}, ${guild.memberCount} members)`);

    bot.channels.cache.get('786683848830222357')
    .send(`<:plus:786969737899802634> Added guild **${guild.name}** (ID: **${guild.id}**, **${guild.memberCount}** members)`);

    if(!message.guild.me.hasPermission("EMBED_LINKS" || "VIEW_CHANNELS")) {
      return message.channel.send(lang.BOT.NO_PERMS
        .replace("{link}",
      "https://discord.com/api/oauth2/authorize?client_id=781179810700984330&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2FFJmgqt2ktg&response_type=code&scope=guilds.join%20bot"))
    }
  },
};
