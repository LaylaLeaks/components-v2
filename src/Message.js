const { FLAGS } = require("./constants");
const Container = require("./components/Container");

class Message {
    constructor() {
        this._components = [];
        this._content = null;
    }

    /**
     * Set a plain text content (show above components, useful for ping roles).
     * @param {string} content
     * @returns {Message}
     */
    setContent(content) {
        this._content = content;
        return this;
    }

    /**
     * Add a Container to the message.
     * Max 10 top-level components per message.
     * @param {Container} container
     * @returns {Message}
     */
    addContainer(container) {
        if (!(container instanceof Container)) {
            throw new TypeError("Expected a Container instance.");
        }
        if (this._components.length > 10) {
            throw new RangeError("A message can have at most 10 top-level components.");
        }
        this._components.push(container);
        return this;
    }

    /**
     * Build the final Discord API payload.
     * @returns {object}
     */
    toJSON() {
        if (this._components.length === 0) {
            throw new Error("Message must have at least one Container.");
        }

        const payload = {
            flags: FLAGS.IS_COMPONENT_V2,
            components: this._components.map(c => c.toJSON())
        };

        if (this._content) {
            payload.content = this._content;
        }

        return payload;
    }
}

module.exports = Message;