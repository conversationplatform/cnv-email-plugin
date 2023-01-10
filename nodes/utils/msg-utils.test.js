const { checkForVariables, getPropertyFromMessage } = require("../utils/msg-utils")

describe('getPropertyFromMessage', () => {
    test('empty message', () => {
        expect(getPropertyFromMessage('a', {})).toBeUndefined();
    });

    test('non existent property', () => {
        expect(getPropertyFromMessage('a', { b: 'boat' })).toBeUndefined();
    });

    test('property exists', () => {
        expect(getPropertyFromMessage('a', { a: 'banana' })).toEqual('banana');
    });

    test('property exists in child', () => {
        expect(getPropertyFromMessage('b.a', { b: { a: 'banana' } })).toEqual('banana');
    });

    test('path has "msg" as first value', () => {
        expect(getPropertyFromMessage('msg.b.a', { b: { a: 'banana' } })).toEqual('banana');
    });

})

describe('checkForVariables', () => {
    test('test without variables', () => {
        expect(checkForVariables('Hello', {})).toEqual('Hello');
    });

    test('test with valid variable clause', () => {
        expect(checkForVariables('Hello ${a}', { a: 'banana' })).toEqual('Hello banana');
    });

    test('test with valid variable clause', () => {
        expect(checkForVariables('Hello ${msg.k.v}', { a: 'banana', k: { v: 'kiwi' } })).toEqual('Hello kiwi');
    });
});
