class DepthChart {
    static isValidName(existingNames, newName) {
        return !existingNames.includes(newName);
    }
}

module.exports = DepthChart;
