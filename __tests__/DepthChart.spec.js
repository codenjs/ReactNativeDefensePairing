/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

DepthChart = require('../src/DepthChart.js');

describe('DepthChart Add', () => {
    test('When existing array is empty then add new name to array', () => {
        var result = DepthChart.Add([], 'name1');
        expect(result.Error).toBe(false);
        expect(result.ErrorMessage).toBeUndefined();
        expect(result.UpdatedDepthChartArray).toEqual([{name: 'name1'}]);
    });

    test('When existing array is not empty and does not contain new name then add new name to array', () => {
        var result = DepthChart.Add([{name: 'name1'}], 'name2');
        expect(result.Error).toBe(false);
        expect(result.ErrorMessage).toBeUndefined();
        expect(result.UpdatedDepthChartArray).toEqual([{name: 'name1'}, {name: 'name2'}]);
    });

    test('When existing array is not empty and already contains new name then return Error with message', () => {
        var result = DepthChart.Add([{name: 'name1'}], 'name1');
        expect(result.Error).toBe(true);
        expect(result.ErrorMessage).toBe('This player is already in the list');
        expect(result.UpdatedDepthChartArray).toBeUndefined();
    });

    test('When new name is empty then return Error with no message', () => {
        var result = DepthChart.Add([{name: 'name1'}], '');
        expect(result.Error).toBe(true);
        expect(result.ErrorMessage).toBe('');
        expect(result.UpdatedDepthChartArray).toBeUndefined();
    });

    test('When new name is undefined then return Error with no message', () => {
        var result = DepthChart.Add([{name: 'name1'}], undefined);
        expect(result.Error).toBe(true);
        expect(result.ErrorMessage).toBe('');
        expect(result.UpdatedDepthChartArray).toBeUndefined();
    });
});
