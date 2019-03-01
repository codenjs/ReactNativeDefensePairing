export default class DepthChart {

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
        let pairingObjectArray = this._getObjectsFromNames(pairingStringArray);

        return this._getSuccessResult(newArray, pairingObjectArray);
    }

    static _getDepthChartData(playersArray, pairingsArray) {
        return {
            Players: playersArray,
            Pairings: pairingsArray
        };
    }

    static _getSuccessResult(playersArray, pairingsArray) {
        return {
            Error: false,
            UpdatedDepthChartData: this._getDepthChartData(playersArray, pairingsArray)
        };
    }

    static _getErrorResult(message) {
        return {
            Error: true,
            ErrorMessage: message
        };
    }

    static _getNamesFromObjects(objectArray) {
        return objectArray.map(o => o.name);
    }

    static _getObjectsFromNames(nameArray) {
        return nameArray.map(n => ({ name: n }));
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

    static GeneratePairingsFromPlayerArray(playerArray) {
        let resultPlayers = playerArray || [];

        let names = this._getNamesFromObjects(resultPlayers);
        let pairings = this.GeneratePairings(names);
        let resultPairings = this._getObjectsFromNames(pairings);

        return this._getDepthChartData(resultPlayers, resultPairings);
    }

    static GetEmptyObject() {
        return this._getDepthChartData([], []);
    }
}
