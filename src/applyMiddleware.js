// Middleware api:
// (store) => (nextDispatch) => (action) => nextDispatch(action);

const applyMiddleware = (...middlewares) => {
  return createStore => (reducer, initialState) => {
    const store = createStore(reducer, initialState);
    let middlewareApi = {
      getState: store.getState,
      dispatch: store.dispatch,
    };

    // [...middlewares].reverse().forEach(middleware => {
    //   store.dispatch = middleware(middlewareApi)(store.dispatch);
    // });
    const chain = middlewares.map(midleware => midleware(middlewareApi));
    const composed = chain.reduce(
      (prev, next) => dispatch => prev(next(dispatch))
    );
    store.dipatch = composed(store.dispatch);
    return store;
  };
};

export default applyMiddleware;
