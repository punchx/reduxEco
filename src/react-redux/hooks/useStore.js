import { useContext } from 'react';
import { ReactReduxContext } from '../Context';
import defaultUseReduxContext from './useReduxContext';

export function createStoreHook(context = ReactReduxContext) {
  const useReduxContext =
    context === ReactReduxContext
      ? defaultUseReduxContext
      : () => useContext(context);

  return function useStore() {
    const { store } = useReduxContext();
    return store;
  };
}

const useStore = createStoreHook();
export default useStore;
