/**
 * @jest-environment jsdom
 */

const { pushToHistory } = require("../scripts/router");

describe('pushToHistory function', () => {
    test('add settings state object to history', () => {
        const hist = pushToHistory('settings', 19);
        const currStateObj = hist.state;
        expect(currStateObj).toEqual({ page: 'settings' });
        expect(hist.length).toBe(2);
    });
    
    test('add entry state object to history', () => {
        const hist = pushToHistory('entry', 19);
        const currStateObj = hist.state;
        expect(currStateObj).toEqual({ page: 'entry19'});
        expect(hist.length).toBe(3);
    });
    
    test('add default state object to history', () => {
        const hist = pushToHistory('', 19);
        const currStateObj = hist.state;
        expect(currStateObj).toEqual({});
        expect(hist.length).toBe(4);
    });
}); 

