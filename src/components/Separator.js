const { TYPES, SEPARATOR_SPACING } = require("../constants");

class Separator {
    /**
     * @param {object} [options]
     * @param {boolean} [options.divider=true] - Show a visible line
     * @param {"small"|"large"} [options.spacing="small"] - Spacing size
     */
    constructor(options = {}) {
        this._divider = options.divider !== undefined ? options.divider : true;
        this._spacing = options.spacing || "small";

        this._validateSpacing(this._spacing);
    }

    /**
     * Show or hide the divider line.
     * @param {boolean} divider
     * @returns {Separator}
     */
    setDivider(divider) {
        this._divider = Boolean(divider);
        return this;
    }

    /**
     * Set the spacing size.
     * @param {"small"|"large"} spacing
     * @returns {Separator}
     */
    setSpacing(spacing) {
        this._validateSpacing(spacing);
        this._spacing = spacing;
        return this;
    }

    _validateSpacing(spacing) {
        if (!["small", "large"].includes(spacing)) {
            throw new TypeError(`Separator spacing must be "small" or "large", got "${spacing}"`);
        }
    }

    toJSON() {
        return {
            type: TYPES.SEPARATOR,
            divider: this._divider,
            spacing: SEPARATOR_SPACING[this._spacing]
        };
    }
}

module.exports = Separator;