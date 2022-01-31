import createStrore from './createStore';
import applyMiddleware from './applyMiddleware';
import thunk from './middlewares/thunk';

test('applyMiddleware test 01', () => {
  const todoState = {
    todos: [],
    loading: false,
    error: '',
  };
  const reducer = (state = todoState, action) => {
    switch (action.type) {
      case 'GETTODOS': {
        console.log('gettodos case');
        return {
          ...state,
          loading: false,
          error: '',
          todos: action.payload,
        };
      }

      case 'LOADING': {
        return {
          ...state,
          loading: true,
          error: '',
        };
      }

      case 'ERROR': {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      default:
        return state;
    }
  };
  const getTodosThunk = () => dispatch => {
    console.log('thunk is running');
    dispatch({ type: 'GETTODOS', payload: ['todo1', 'todo2'] });
  };

  const store = createStrore(reducer, applyMiddleware(thunk));
  store.dispatch(getTodosThunk());

  const expected = { loading: false, error: '', todos: ['todo1', 'todo2'] };
  expect(store.getState()).toEqual(expected);
});
