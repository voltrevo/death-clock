import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Router from './Router';

import * as App from './App';

it('renders without crashing', () => {
  const store = App.Store('', 0);
  const div = document.createElement('div');
  ReactDOM.render(<Router.Component store={store}/>, div);
});
