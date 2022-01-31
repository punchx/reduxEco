import { ReactReduxContext } from './Context';

const Provider = ({ store, children }) => {
  const context = { store };
  return (
    <ReactReduxContext.Provider value={context}>
      {children}
    </ReactReduxContext.Provider>
  );
};

export default Provider;
