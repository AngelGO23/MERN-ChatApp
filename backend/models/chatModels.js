import mongoose from "mongoose";

const chatModel = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroup: { type: Boolean, default: false },
        users: [{
            type: mongoose.Schema.Types.ObjectId, //Contains id to that particular user
            ref: "User",
        },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId, //Containes id to that particular chat
            ref: "Message",
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },


    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatModel);

export default Chat;