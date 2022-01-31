import createStrore from './createStore';
import combineReducers from './combineReducers';

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'inc':
      return state + 1;
    case 'dec':
      return state - 1;
    default:
      return state;
  }
};

test('createStore test 01', () => {
  const store = createStrore(reducer);
  expect(store.getState()).toBe(0);
  store.dispatch({ type: 'inc' });
  store.dispatch({ type: 'inc' });
  expect(store.getState()).toBe(2);
  store.dispatch({ type: 'dec' });
  expect(store.getState()).toBe(1);
});

test('createStore test 02', () => {
  const store = createStrore(reducer);
  let counter = 0;
  const unsubscribe = store.subscribe(() => counter++);
  store.dispatch({ type: 'inc' });
  expect(counter).toBe(1);
  unsubscribe();
  store.dispatch({ type: 'inc' });
  expect(counter).toBe(1);
});

test('createStore test 03', () => {
  const store = createStrore(reducer);
  expect(() => {
    store.subscribe({});
  }).toThrow();
});

test('createStore test 04', () => {
  const red1 = (state = []) => state;
  const red2 = (state = []) => state;
  const initialState = { red1: [{ id: 1 }, { id: 2 }] };
  const reducer = combineReducers({ red1, red2 });
  const store = createStrore(reducer, initialState);
  const expected = { red1: [{ id: 1 }, { id: 2 }], red2: [] };
  expect(store.getState()).toEqual(expected);
});
