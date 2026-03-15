const axios = require("axios");
const Message = require("./Message");

class Sender {
    /**
     * Send via Application
     *
     * @param {object} options
     * @param {string} options.botToken - Discord bot token
     * @param {string} options.channelId - Target channel or thread ID
     * @param {boolean} [options.crosspost=false] - Auto publish (Announcement channels only)
     */
    static createBotSender({ botToken, channelId, crosspost = false }) {
        if (!botToken) throw new TypeError("botToken is required.")
        if (!channelId) throw new TypeError("channelId is required.")

        return new BotSender({ botToken, channelId, crosspost });
    }

    /**
     * Send via Webhook
     * NOTE: Basic Server webhooks is not supported, Only Application webhooks.
     *
     * @param {object} options
     * @param {string} options.webhookUrl - Discord webhook url
     * @param {string} [options.threadId] - Optional thread ID
     */
    static createWebhookSender({ webhookUrl, threadId }) {
        if (!webhookUrl) throw new TypeError("webhookUrl is required.")

        return new WebhookSender({ webhookUrl, threadId });
    }
}

class BotSender {
    constructor({ botToken, channelId, crosspost }) {
        this._botToken = botToken;
        this._channelId = channelId;
        this._crosspost = crosspost;
    }

    /**
     * Send a Message to the channel.
     * @param {Message|object} message - Message instance or plain payload object
     * @returns {Promise<object>} Discord API response data
     */
    async send(message) {
        const payload = message instanceof Message ? message.toJSON() : message;

        const response = await axios.post(`https://discord.com/api/v10/channels/${this._channelId}/messages`,
            payload,
            {
                headers: {
                    "Authorization": `Bot ${this._botToken}`,
                    "Content-Type": "application/json"
                },
            }
        );

        if (this._crosspost && response.data?.id) {
            await this._crosspostMessage(response.data.id);
        }

        return response.data;
    }

    async _crosspostMessage(messageId) {
        await axios.post(`https://discord.com/api/v10/channels/${this._channelId}/messages/${messageId}/crosspost`,
            {},
            {
                headers: {
                    "Authorization": `Bot ${this._botToken}`,
                    "Content-Type": "application/json"
                },
            }
        );
    }
}

class WebhookSender {
    constructor({ webhookUrl, threadId }) {
        this._webhookUrl = webhookUrl;
        this._threadId = threadId;
    }

    /**
     * Send a Message via webhook.
     * @param {Message|object} message
     * @returns {Promise<object>} Discord API response data
     */
    async send(message) {
        const payload = message instanceof Message ? message.toJSON() : message;

        const url = this._threadId
            ? `${this._webhookUrl}?thread_id=${this._threadId}&wait=true`
            : `${this._webhookUrl}?wait=true`

        const response = await axios.post(url, payload, {
            headers: { "Content-Type": "application/json" }
        });

        return response.data;
    }
}

module.exports = { Sender, BotSender, WebhookSender };