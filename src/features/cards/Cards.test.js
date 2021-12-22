import reducer, { addCard } from './cardSlice';

test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        cards: {}
    });
})