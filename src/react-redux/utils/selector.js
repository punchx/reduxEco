export function selectorFactory(dispatch, mapStateToProps, mapDispatchToProps) {
  return function (state, props) {
    return {
      ...mapStateToProps(state),
      ...mapDispatchToProps(dispatch),
      ...props,
    };
  };
}

export function makeStatefulSelector(selector, store) {
  const _selector = {
    run: function (props) {
      const nextProps = selector(store.getState(), props);
      if (nextProps !== _selector.props) {
        // console.log('prev props',_selector.props);
        // console.log('next props', nextProps);
        _selector.shouldComponentUpdate = true;
        _selector.props = nextProps;
      }
    },
  };
  return _selector;
}
