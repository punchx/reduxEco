import ReactReduxContext from '../Context';
import defaultUseReduxContext from './useReduxContext';

const defEquality = (a, b) => a === b;

export function createUseSelector(context = ReactReduxContext) {
  const useReduxContext =
    context === ReactReduxContext
      ? defaultUseReduxContext
      : () => useContext(context);

  return function useSelector(selector, equalityFunc = defEquality) {
    if (!selector) {
      throw new Error('You must pass a seletor');
    }

    if (typeof selector !== 'function') {
      throw new Error('selector should be a function');
    }

    const { store } = useReduxContext();
    const selectedState = selector(store.getState());

    return selectedState;
  };
}

const useSelector = createUseSelector();

export default useSelector;
