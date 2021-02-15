const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  user_id: { type: String, required: true },
  guild_id: { type: String, required: true },
});

module.exports = model("User", userSchema);
