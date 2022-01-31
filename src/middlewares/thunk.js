const createThunk =
  extraArgumet =>
  ({ dispatch, getState }) =>
  next =>
  action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgumet);
    }
    return next(action);
  };

const thunk = createThunk();

thunk.withExtraArgument = createThunk;

export default thunk;
