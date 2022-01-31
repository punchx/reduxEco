import { Component } from 'react';
import createSubscription from './utils/createSubscription';
import ReactReduxContext from './Context';
import { selectorFactory, makeStatefulSelector } from './utils/selector';

// mapStateToProps: (state) => ... props;
// mapDispatchToProps (dispatch) => ...{dispatch};

const connect = (mapStateToProps, mapDispatchToProps) => ComponentToWrap => {
  class Connect extends Component {
    static contextType = ReactReduxContext;

    constructor(props, context) {
      super(props, context);
      this.store = context.store;
      this.initSelector();
      this.subscription = createSubscription(
        this.store,
        context.subscription,
        this.onStateChange
      );
      this.updatedContext = {
        ...this.context,
        subscription: this.subscription,
      };
    }

    initSelector() {
      const selector = selectorFactory(
        this.store.dispatch,
        mapStateToProps,
        mapDispatchToProps
      );
      this.selector = makeStatefulSelector(selector, this.store);
      this.selector.run(this.props);
    }

    componentDidMount() {
      this.subscription.trySubscribe();
    }

    onStateChange = () => {
      this.selector.run(this.props);
      if (!this.selector.shouldComponentUpdate) {
        // even we not rerender we need to notify nested components
        this.subscription.notifyNestedSubs();
      } else {
        this.componentDidUpdate = this.notifyNestedSubsOnUpdate;
        this.setState({});
      }
    };

    notifyNestedSubsOnUpdate() {
      this.componentDidUpdate = undefined;
      this.subscription.notifyNestedSubs();
    }

    shouldComponentUpdate() {
      return this.selector.shouldComponentUpdate;
    }

    render() {
      console.log('Render -> ', ComponentToWrap);
      this.selector.shouldComponentUpdate = false;
      return (
        <ReactReduxContext.Provider value={this.updatedContext}>
          <ComponentToWrap {...this.selector.props} />
        </ReactReduxContext.Provider>
      );
    }
  }

  return Connect;
};

export default connect;
