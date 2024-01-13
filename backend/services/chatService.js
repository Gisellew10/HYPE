const Chats = require("../models/chats");
const Startup = require("../models/startup");
const Student = require("../models/student");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

const getChats = async (userId) => {

    const studentPromise = Student.findOne({ userId: userId });
    const startupPromise = Startup.findOne({ userId: userId });
    const values = await Promise.all([studentPromise, startupPromise])

    const userInfo = values.filter((value) => value != null)[0]

    if (!userInfo) {
        return [false, null];
    }

    const chatsInfo = await Chats.find({ chatId: { $in: userInfo.chats } });

    if (!chatsInfo) {
        return [false, null];
    }
    
    //alway place user id first
    chatsInfo.forEach(chat => {
        const filteredMembers = chat.members.filter(id => id !== userId);
        chat.members = [userId, ...filteredMembers];
    });
    return [true, chatsInfo];
};

const getChat = async (chatId, userId) => {

    const Chat = await Chats.findOne({ chatId: chatId });
    if (!Chat ||  !Chat.members.includes(userId)) {
        return [false, null];
    }
    return [true, Chat];
};

const createChat = async (chatname, userId, othersUserID) => {

    try {
        // const userAccounts = (await User.find({ email: { $in: othersEmails}  })).map((account) => account.userId);
    
        const chatid = uuidv4()
        const members = [userId, ...othersUserID]

        const newChat = new Chats({
            chatId: chatid,
            chatName: chatname,
            members: members,
            messages: [],
        })
    
        await newChat.save();

        members.map(async (user) => {
            const studentPromise = Student.findOne({ userId: user });
            const startupPromise = Startup.findOne({ userId: user });
            const values = await Promise.all([studentPromise, startupPromise])
        
            if (values[0] != null) {
                await Student.findOneAndUpdate({ userId: user }, 
                    { $push: { 
                        chats: {
                            $each: [chatid],
                            $position: 0
                        }
                    }
                })
            }
            else if (values[1] != null) {
                await Startup.findOneAndUpdate({ userId: user }, 
                    { $push: { 
                        chats: {
                            $each: [chatid],
                            $position: 0
                        }
                    }
                })
            }
        })

        return { success: true, message: "Chat was created successfully", chatId: chatid};
    } catch (error) {
        return { success: false, message: "An error occurred during chat creation" };
    }

    
};

const deleteChat = async (chatId, userId) => {
    try {
        const chat = await Chats.findOne({ chatId: chatId });
        const studentPromise = await Student.findOne({ userId: userId });
        const startupPromise = await Startup.findOne({ userId: userId });
  
        if (!studentPromise) {
            startupPromise.chats.pull(chatId);
            await startupPromise.save();
        }
        else{
            studentPromise.chats.pull(chatId);
            await studentPromise.save();
        }
        // Delete the chat if there are no members
        if (chat.members.length === 1) {
            await Chats.deleteOne({ chatId: chatId });
            return [true, chat, studentPromise];
        }

        // Remove the member from the chat
        chat.members.pull(userId);
        await chat.save();

        return [true, studentPromise];
    
    } catch (err) {
      console.log(err);
      throw err;
    }
};

const deleteMessage = async (chatId, clickedMessageIndex) => {
    try {
        const chat = await Chats.findOne({ chatId: chatId });

        if (!chat) {
            // Chat not found
            return;
        }

        if (clickedMessageIndex < 0 || clickedMessageIndex >= chat.messages.length) {
            throw new Error("Invalid message index");
        }

        // Delete the message at the specified index
        chat.messages.splice(clickedMessageIndex, 1);
        await chat.save();

        return { success: true, message: "Message was deleted successfully"};
    
    } catch (err) {
      console.log(err);
      throw err;
    }
};

const addMessage = async (chatId, userId, message) => {

    const Chat = await Chats.findOneAndUpdate({ chatId: chatId }, 
            { $push: { 
                messages: {
                    $each: [{
                        userId: userId,
                        message: message,
                        timeStamp: Date.now()
                    }],
                }
            }
        }, {
            new: true
          });
    if (!Chat) {
        return [false, null];
    }


    return [true, Chat];
};

const addMembers = async (chatId, members) => {

    try {
        
        members.map(async (user) => {
            const studentPromise = Student.findOne({ userId: user });
            const startupPromise = Startup.findOne({ userId: user });
            const values = await Promise.all([studentPromise, startupPromise])

            const Chat = await Chats.findOneAndUpdate({ chatId: chatId }, 
                { $addToSet: { 
                    members: user
                }
            }, {
                new: true
            });
        
            if (values[0] != null) {
                const mem = await Student.findOne({ userId: user })
                if (!mem.chats.includes(Chat.chatId)) {
                    mem.chats = [...mem.chats, Chat.chatId]
                    await mem.save()
                }
            }
            else if (values[1] != null) {
                const mem = await Startup.findOne({ userId: user })
                if (!mem.chats.includes(Chat.chatId)) {
                    mem.chats = [...mem.chats, Chat.chatId]
                    await mem.save()
                }
            }
        })
        return { success: true, message: "Chat members were updated successfully" };
    } catch (error) {
        return { success: false, message: "An error occurred during chat update" };
    }
};

module.exports = { getChats, getChat, addMessage, createChat, addMembers, deleteChat, deleteMessage};
