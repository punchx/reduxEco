// reducer should be a function reducer(state, action) and return new state

const createStrore = (reducer, initialState, enhancer) => {
  if (typeof initialState === 'function') {
    enhancer = initialState;
    initialState = undefined;
  }

  if (enhancer !== undefined && typeof enhancer === 'function')
    return enhancer(createStrore)(reducer, initialState);

  if (typeof reducer !== 'function')
    throw new Error('reducer should be a function');

  let _reducer = reducer;
  let currState = _reducer(initialState, { type: '' });
  let subscribers = [];

  const getState = () => currState;

  const subscribe = subscriber => {
    if (typeof subscriber !== 'function')
      throw new Error('subscriber should be a function');
    subscribers.push(subscriber);
    return () => (subscribers = subscribers.filter(sub => sub !== subscriber));
  };

  const dispatch = action => {
    currState = _reducer(currState, action);
    subscribers.forEach(sub => sub());
    return action;
  };

  const replaceReducer = nextReducer => {
    if (typeof nextReducer !== 'function')
      throw new Error('Next Reducer should be a function');
    _reducer = nextReducer;
    dispatch({ type: '@@redux/REPLACE' });

    //can access store because of hoisting
    return store;
  };

  const store = {
    getState,
    subscribe,
    dispatch,
    replaceReducer,
  };

  return store;
};

export default createStrore;
