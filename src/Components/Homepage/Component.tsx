import * as React from 'react';
import * as App from '../../App';
import './style.css';

import * as Counter from '../Counter';
import * as Filter from '../Filter';

const logo = require('../../logo.svg');

export const Component: React.SFC<{ store: App.Store }> = (
  ({store}) => {
    return (
      <div className="homepage">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Sample App</h1>
        </header>
        <div className="body">
          <button onClick={store.PageDispatcher({ name: Counter.COUNTER_ROUTE })}>
            Counter
          </button>
          <button onClick={store.PageDispatcher({ name: Filter.FILTER_ROUTE })}>
            Filter
          </button>
        </div>
      </div>
    );
  }
);
