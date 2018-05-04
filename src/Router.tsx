import * as React from 'react';
import * as App from './App';

import * as Homepage from './Components/Homepage';

export const Component: React.SFC<{ store: App.Store }> = (
  ({store}) => {
    const state = store.getState();

    switch (state.page.name) {
      case Homepage.HOMEPAGE_ROUTE:
        return <Homepage.Component store={store}/>;
    }
  }
);
