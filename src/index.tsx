import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Router from './Router';
import * as GlobalConstants from './GlobalConstants';
import registerServiceWorker from './registerServiceWorker';
import './style.css';

import * as App from './App';

const { SET_WHOLE_STATE, APP_STATE } = GlobalConstants;

const seed = `${Math.random()}`;
const store = App.Store(seed);

const storedState = localStorage.getItem(APP_STATE);

if (storedState && location.href.indexOf('loadState') !== -1) {
  store.Dispatcher({ type: SET_WHOLE_STATE, data: JSON.parse(storedState) })();
}

store.subscribe(() => {
  localStorage.setItem(
    APP_STATE,
    JSON.stringify(store.getState())
  );
});

const render = () => {
  ReactDOM.render(
    <Router.Component store={store}/>,
    document.getElementById('root') as HTMLElement
  );
};

render();
store.subscribe(render);

registerServiceWorker();
