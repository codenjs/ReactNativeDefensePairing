/**
 * @format
 */

import DepthChart from '../src/DepthChart.js';

let expectResponseToBeSuccessful = (depthChartResponse) => {
    expect(depthChartResponse.Error).toBe(false);
    expect(depthChartResponse.ErrorMessage).toBeUndefined();
};

let expectErrorWithMessage = (depthChartResponse, expectedErrorMessage) => {
    expect(depthChartResponse.Error).toBe(true);
    expect(depthChartResponse.ErrorMessage).toBe(expectedErrorMessage);
    expect(depthChartResponse.UpdatedDepthChartData).toBeUndefined();
};

let expectErrorWithNoMessage = (depthChartResponse) => {
    expectErrorWithMessage(depthChartResponse, '');
};

describe('DepthChart Add', () => {
    test('When existing array is empty then add new name to array', () => {
        var result = DepthChart.Add([], 'name1');
        expectResponseToBeSuccessful(result);
        expect(result.UpdatedDepthChartData.Players).toEqual([{name: 'name1'}]);
        expect(result.UpdatedDepthChartData.Pairings).toEqual([]);
    });

    test('When new name starts and ends with whitespace then add trimmed name to array', () => {
        var result = DepthChart.Add([], ' name1 ');
        expectResponseToBeSuccessful(result);
        expect(result.UpdatedDepthChartData.Players).toEqual([{name: 'name1'}]);
        expect(result.UpdatedDepthChartData.Pairings).toEqual([]);
    });

    test('When existing array is not empty and does not contain new name then add new name to array and generate pairings', () => {
        var result = DepthChart.Add([{name: 'name1'}], 'name2');
        expectResponseToBeSuccessful(result);
        expect(result.UpdatedDepthChartData.Players).toEqual([{name: 'name1'}, {name: 'name2'}]);
        expect(result.UpdatedDepthChartData.Pairings).toEqual([{name: 'name1/name2'}]);
    });

    test('When existing array is not empty and already contains new name then return Error with message', () => {
        var result = DepthChart.Add([{name: 'name1'}], 'name1');
        expectErrorWithMessage(result, 'This player is already in the list');
    });

    test('When new name is empty then return Error with no message', () => {
        var result = DepthChart.Add([{name: 'name1'}], '');
        expectErrorWithNoMessage(result);
    });

    test('When new name is whitespace then return Error with no message', () => {
        var result = DepthChart.Add([{name: 'name1'}], ' ');
        expectErrorWithNoMessage(result);
    });

    test('When new name is undefined then return Error with no message', () => {
        var result = DepthChart.Add([{name: 'name1'}], undefined);
        expectErrorWithNoMessage(result);
    });
});

describe('DepthChart Delete', () => {
    test('When index is valid then return array without specified item', () => {
        var result = DepthChart.Delete([{name: 'name1'}, {name: 'name2'}, {name: 'name3'}], 1);
        expectResponseToBeSuccessful(result);
        expect(result.UpdatedDepthChartData.Players).toEqual([{name: 'name1'}, {name: 'name3'}]);
        expect(result.UpdatedDepthChartData.Pairings).toEqual([{name: 'name1/name3'}]);
    });
});

describe('DepthChart Move', () => {
    test('When destination index is within valid range then switch source item with destination item', () => {
        var result = DepthChart.Move([{name: 'name1'}, {name: 'name2'}], 0, 1);
        expectResponseToBeSuccessful(result);
        expect(result.UpdatedDepthChartData.Players).toEqual([{name: 'name2'}, {name: 'name1'}]);
        expect(result.UpdatedDepthChartData.Pairings).toEqual([{name: 'name2/name1'}]);
    });

    test('When destination index is less than zero then return Error with no message', () => {
        var result = DepthChart.Move([{name: 'name1'}, {name: 'name2'}], 0, -1);
        expectErrorWithNoMessage(result);
    });

    test('When destination index is greater than array length then return Error with no message', () => {
        var result = DepthChart.Move([{name: 'name1'}, {name: 'name2'}], 1, 2);
        expectErrorWithNoMessage(result);
    });
});

describe('DepthChart GeneratePairings', () => {
    test('When input is empty then output is empty', () => {
        var result = DepthChart.GeneratePairings([]);
        expect(result).toEqual([]);
    });

    test('When input contains 1 name then output is empty', () => {
        var result = DepthChart.GeneratePairings(['name1']);
        expect(result).toEqual([]);
    });

    test('When input contains 2 names then output contains 1 pairing', () => {
        var result = DepthChart.GeneratePairings(['name1', 'name2']);
        expect(result).toEqual(['name1/name2']);
    });

    test('When input contains 3 names then output contains 3 pairings', () => {
        var result = DepthChart.GeneratePairings(['name1', 'name2', 'name3']);
        expect(result).toEqual(['name1/name2', 'name1/name3', 'name2/name3']);
    });

    test('When input contains 4 names then output contains 6 pairings', () => {
        var result = DepthChart.GeneratePairings(['name1', 'name2', 'name3', 'name4']);
        expect(result).toEqual(['name1/name2', 'name1/name3', 'name1/name4', 'name2/name3', 'name2/name4', 'name3/name4']);
    });

    test('When input contains 5 names then output contains 10 pairings', () => {
        var result = DepthChart.GeneratePairings(['name1', 'name2', 'name3', 'name4', 'name5']);
        expect(result).toEqual(['name1/name2', 'name1/name3', 'name1/name4', 'name1/name5', 'name2/name3', 'name2/name4', 'name2/name5', 'name3/name4', 'name3/name5', 'name4/name5']);
    });
});

describe('DepthChart GeneratePairingsFromPlayerArray', () => {
    test('When input array is null then output arrays are empty', () => {
        var result = DepthChart.GeneratePairingsFromPlayerArray(null);
        expectResponseToBeSuccessful(result);
        expect(result.UpdatedDepthChartData.Players).toEqual([]);
        expect(result.UpdatedDepthChartData.Pairings).toEqual([]);
    });

    test('When input array is empty then output arrays are empty', () => {
        var result = DepthChart.GeneratePairingsFromPlayerArray([]);
        expectResponseToBeSuccessful(result);
        expect(result.UpdatedDepthChartData.Players).toEqual([]);
        expect(result.UpdatedDepthChartData.Pairings).toEqual([]);
    });

    test('When input array is not empty then output Players array equals input Players array and Pairings are generated', () => {
        var input = [{name: 'name1'}, {name: 'name2'}];
        var result = DepthChart.GeneratePairingsFromPlayerArray(input);
        expectResponseToBeSuccessful(result);
        expect(result.UpdatedDepthChartData.Players).toEqual(input);
        expect(result.UpdatedDepthChartData.Pairings).toEqual([{name: 'name1/name2'}]);
    });
});

describe('DepthChart GetEmptyObject', () => {
    test('Both output arrays should be empty', () => {
        var result = DepthChart.GetEmptyObject();
        expect(result.Players).toEqual([]);
        expect(result.Pairings).toEqual([]);
    });
});
