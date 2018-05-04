import * as React from 'react';
import * as App from './App';

import * as Homepage from './Components/Homepage';
import * as Counter from './Components/Counter';
import * as Filter from './Components/Filter';

export const Component: React.SFC<{ store: App.Store }> = (
  ({store}) => {
    const state = store.getState();

    switch (state.page.name) {
      case Homepage.HOMEPAGE_ROUTE:
        return <Homepage.Component store={store}/>;

      case Counter.COUNTER_ROUTE:
        return <Counter.Component store={store}/>;

      case Filter.FILTER_ROUTE:
        return <Filter.Component store={store}/>;
    }
  }
);
