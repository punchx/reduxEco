import ReactReduxContext from '../Context';
import useDefaultStore, { createStoreHook } from './useStore';

export function createUseDispatch(context = ReactReduxContext) {
  const useStore =
    context === ReactReduxContext ? useDefaultStore : createStoreHook(context);

  const store = useStore();
  return store.dispatch;
}

const useDispatch = createUseDispatch();
export default useDispatch;
