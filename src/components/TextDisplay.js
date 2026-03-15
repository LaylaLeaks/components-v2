const { TYPES } = require("../constants");

class TextDisplay {
    /**
     * @param {string} content - Markdown text content
     */
    constructor(content) {
        if (typeof content !== "string") {
            throw new TypeError("TextDisplay content must be a string.");
        }
        if (content.length > 4000) {
            throw new TypeError("TextDisplay content cannot exceed 4000 characters.");
        }

        this._content = content;
    }

    /**
     * Set the text content.
     * @param {string} content
     * @returns {TextDisplay}
     */
    setContent(content) {
        if (typeof content !== "string") {
            throw new TypeError("TextDisplay content must be a string.");
        }
        if (content.length > 4000) {
            throw new TypeError("TextDisplay content cannot exceed 4000 characters.");
        }

        this._content = content;
        return this;
    }

    /**
     * Truncate content to 4000 characters if needed.
     * @returns {TextDisplay}
     */
    truncate() {
        this._content = this._content.substring(0, 4000);
        return this;
    }

    toJSON() {
        return {
            type: TYPES.TEXT_DISPLAY,
            content: this._content
        };
    }
}

module.exports = TextDisplay;