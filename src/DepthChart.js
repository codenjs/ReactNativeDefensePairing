class DepthChart {

    static Add(existingDepthChartArray, newPlayerName) {
        if (!newPlayerName) {
            return this._getErrorResult('');
        }

        var newArray = [];
        var existingNames = [];

        existingDepthChartArray.forEach(element => {
            newArray.push(element);
            existingNames.push(element.name);
        });

        if (existingNames.includes(newPlayerName)) {
            return this._getErrorResult('This player is already in the list');
        }

        newArray.push({
            name: newPlayerName
        });
        return this._getSuccessResult(newArray);
    }

    static _getSuccessResult(depthChartArray) {
        return {
            Error: false,
            UpdatedDepthChartArray: depthChartArray
        };
    }

    static _getErrorResult(message) {
        return {
            Error: true,
            ErrorMessage: message
        };
    }
}

module.exports = DepthChart;
