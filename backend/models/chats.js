const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chatId: { type: String, unique: true, required: true },
    chatName: { type: String },
    members: {type: [String]},
    messages: {
      type: [
        { 
            userId: String,
            message: String, 
            timeStamp: Number, 
        },
      ],
      default: [],
    },

  },
  {
    collection: "chats",
  }
);

module.exports = mongoose.model("chats", chatSchema);
