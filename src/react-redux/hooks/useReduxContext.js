import ReactReduxContext from "../Context"


function useReduxContext() {
  const context = useContext(ReactReduxContext);
  if (!context) {
    throw new Error('Could not find react-redux context');
  }
  return context;
}

export default useReduxContext;