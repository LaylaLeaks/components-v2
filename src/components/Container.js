const { TYPES } = require("../constants");
const TextDisplay = require("./TextDisplay");
const Separator = require("./Separator");

class Container {
    constructor() {
        this._accentColor = null;
        this._components = [];
    }

    /**
     * Set the accent color (left border).
     * Accepts hex string ("#7923c4"), hex number (0x7923c4) or decimal number.
     * @param {string|number} color
     * @returns {Container}
     */
    setAccentColor(color) {
        if (typeof color === "string") {
            const hex = color.replace("#", "");
            const parsed = parseInt(hex, 16);
            if (isNaN(parsed)) throw new Error(`Invalid hex color: "${color}"`);
            this._accentColor = parsed;
        } else if (typeof color === "number") {
            this._accentColor = color;
        } else {
            throw new Error("Accent color must be a hex string or number.");
        }

        return this;
    }

    /**
     * Add a TextDisplay component.
     * @param {TextDisplay|string} component - TextDisplay instance or raw string
     * @returns {Container}
     */
    addTextDisplay(component) {
        if (typeof component === "string") {
            component = new TextDisplay(component);
        }
        if (!(component instanceof TextDisplay)) {
            throw new TypeError("Expected a TextDisplay instance or string.");
        }
        this._components.push(component);
        return this;
    }

    /**
     * Add a Separator component.
     * @param {Separator|object} [component] - Separator instance or options object
     * @returns {Container}
     */
    addSeparator(component) {
        if (!component) {

            component = new Separator();
        } else if (!(component instanceof Separator)) {
            component = new Separator(component);
        }
        this._components.push(component);
        return this;
    }

    /**
     * Add any component (TextDisplay or Separator).
     * @param {TextDisplay|Separator} component
     * @returns {Container}
     */
    add(component) {
        if (component instanceof TextDisplay || component instanceof Separator) {
            this._components.push(component);
            return this;
        }
        throw new TypeError("Component must be a TextDisplay or Separator instance.");
    }

    toJSON() {
        if (this._components.length === 0) {
            throw new Error("Container must have at least one component.");
        }

        const json = {
            type: TYPES.CONTAINER,
            components: this._components.map(c => c.toJSON())
        };

        if (this._accentColor !== null) {
            json.accent_color = this._accentColor;
        }

        return json;
    }
}

module.exports = Container;