import combineReducers from './combineReducers';

test('combineReducers test 01', () => {
  const red1 = (state = 0, action) => state + 1;
  const red2 = (state = false, action) => !state;
  const expected = {
    red1: 1,
    red2: true,
  };
  const reducer = combineReducers({ red1, red2 });
  expect(reducer(undefined, { type: '' })).toEqual(expected);
});
