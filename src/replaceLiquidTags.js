const { getLiquidTagValue } = require('./getLiquidTagValue');
const getObjectContent = require('./getObjectContent');

function replaceLiquidTags(html, event, contact) {
    return html.replace(/\{\{\s*([^{}]+)\s*\}\}(?:\|\|\{([^{}]*)\})?/g, (match, key, fallback) => {
        console.log(key, fallback);
        let propValue = ""
        const value = getLiquidTagValue(`{{${key}}}`, event, contact);
        console.log(value, typeof value);
        if (typeof value === 'object' && value) {
            if (value instanceof Date) {
                propValue = value.toISOString();
            } else if (Array.isArray(value) && value[0] && typeof value[0] == 'object') {
                value.forEach((obj, index) => {
                    propValue += getObjectContent(obj, false, key, index + 1);
                });
            } else if (Array.isArray(value) && value[0] && typeof value[0] != 'object') {
                propValue = value;
            } else {
                if (key.toLowerCase().includes("address")) {
                    propValue += getObjectContent(value, true, key);
                } else {
                    propValue += getObjectContent(value, false, key);
                }
            }
        } else if (value) {
            propValue = value;
        }

        console.log(propValue);
        return propValue !== "" ? propValue : (fallback || '');
    });
}

module.exports = { replaceLiquidTags };