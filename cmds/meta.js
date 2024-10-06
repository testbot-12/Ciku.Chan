const axios = require("axios");
const API = "https://xakibin-fs8d.onrender.com";

module.exports = {
    name: "meta",
    info: "Ask Banglish",
    dev: "Sakibin",
    onPrefix: true,
    dmUser: false,
    nickName: ["miuki", "bot"],
    usages: "Message",
    cooldowns: 0,

    onLaunch: async function ({ api, event, actions }) {
        try {
            let message = event.body.trim();
            if (!message) {
                const defaultReply = `⭓ Hi, I'm Meta 2.0⚡\n⭓ My official Database created by @Sakibin Sinha 🚀`;
                await actions.reply(defaultReply);

                actions.onReply({
                    name: this.name,
                    messageID: event.messageID,
                    author: event.senderID,
                    type: "continue"
                });
                return;
            }

            const response = await axios.get(`${API}/sim?type=ask&ask=${message}`);
            const respond = response.data.answer;
            await actions.reply(respond);

            actions.onReply({
                name: this.name,
                messageID: event.messageID,
                author: event.senderID,
                type: "continue"
            });

        } catch (error) {
            console.error("An error occurred:", error);
            await actions.reply("Oops! Something went wrong.");
        }
    },

    onReply: async function ({ reply, api, event, actions }) {
        try {
            const message = reply;
            const response = await axios.get(`${API}/sim?type=ask&ask=${message}`);
            const respond = response.data.answer;

            await actions.reply(respond);

            actions.onReply({
                name: this.name,
                messageID: event.messageID,
                author: event.senderID,
                type: "continue"
            });

        } catch (error) {
            console.error("An error occurred:", error);
            await actions.reply("Oops! Something went wrong.");
    