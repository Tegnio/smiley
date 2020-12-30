const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "github",
  description: "",
  category: "useful",
  cooldown: 5,
  aliases: ["gh"],
  botPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const username = args[0];

    if (!username) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }

    const wait_msg = await message.channel.send(lang.OTHER.PROCESSING);
    const url = `https://api.github.com/users/${encodeURIComponent(username)}`;
    const result = await fetch(url).then((res) => res.json());
    const user = result;

    if (user?.message === "Not Found") {
      return message.channel.send(lang.OTHER.GH_NOT_FOUND)
        .then(() => wait_msg.delete());
    }

    wait_msg.delete();

    const twitter = user.twitter_username
      ? `[@${user.twitter_username}](https://twitter.com/${user.twitter_username})`
      : lang.GLOBAL.NOT_SPECIFIED;
    const website = user.blog ? user.blog : lang.GLOBAL.NOT_SPECIFIED;
    const location = user.location ? user.location : lang.GLOBAL.NOT_SPECIFIED;
    const job = user.company ? user.company : lang.GLOBAL.NOT_SPECIFIED;
    const bio = user.bio ? user.bio : lang.GLOBAL.NOT_SPECIFIED;

    const embed = BaseEmbed(message)
      .setTitle(user.login)
      .setURL(user.html_url)
      .addField("Twitter", twitter, true)
      .addField(lang.OTHER.GH_FOLLOWING, user.following, true)
      .addField(lang.OTHER.GH_FOLLOWERS, user.followers, true)
      .addField(lang.OTHER.GH_REPOS, user.public_repos, true)
      .addField(lang.OTHER.GH_LOCATION, location, true)
      .addField(lang.OTHER.GH_JOB, job, true)
      .addField(lang.OTHER.GH_WEBSITE, website)
      .addField(lang.OTHER.GH_BIO, bio)
      .setThumbnail(user.avatar_url);

    message.channel.send(embed);
  },
};
