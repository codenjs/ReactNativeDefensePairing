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
        existingNames.push(newPlayerName);

        let pairingStringArray = this.GeneratePairings(existingNames);
        let pairingObjectArray = pairingStringArray.map(s => ({ name: s }));

        return this._getSuccessResult(newArray, pairingObjectArray);
    }

    static _getSuccessResult(depthChartArray, pairingArray) {
        return {
            Error: false,
            UpdatedDepthChartArray: depthChartArray,
            UpdatedPairingArray: pairingArray
        };
    }

    static _getErrorResult(message) {
        return {
            Error: true,
            ErrorMessage: message
        };
    }

    static GeneratePairings(names) {
        var pairings = [];

        for (let i = 0; i < names.length - 1; i++) {
            for (let j = i + 1; j < names.length; j++) {
                var pairing = names[i] + '/' + names[j];
                pairings.push(pairing)
            }
        }

        return pairings;
    }
}

module.exports = DepthChart;
