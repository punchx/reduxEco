const createSubscription = (store, subscription, onStateChange) => {
  const _listeners = [];
  let isSubscribed = false;

  function addNestedSub(listener) {
    trySubscribe();
    _listeners.push(listener);
  }

  function trySubscribe() {
    if (!isSubscribed) {
      if (subscription) {
        subscription.addNestedSub(onStateChange);
      } else {
        store.subscribe(onStateChange);
      }
      isSubscribed = true;
    }
  }

  function notifyNestedSubs() {
    //console.log('listeners:', _listeners);
    _listeners.forEach(listener => listener());
  }

  const newSubscription = {
    notifyNestedSubs,
    trySubscribe,
    addNestedSub,
  };

  return newSubscription;
};

export default createSubscription;
