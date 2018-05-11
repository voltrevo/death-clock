import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Router from './Router';
import * as GlobalConstants from './GlobalConstants';
import registerServiceWorker from './registerServiceWorker';
import './style.css';

import * as App from './App';

const { SET_WHOLE_STATE, APP_STATE, SET_TIME } = GlobalConstants;

const seed = `${Math.random()}`;
const store = App.Store(seed, Date.now());

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

const updateTime = () => store.dispatch({ type: SET_TIME, data: Date.now() });

const updateTimeLoop = () => {
  updateTime();

  // FIXME: Ideally the tick frequency would depend on how long it takes a
  // a second to expire from your time remaining to get a smoother countdown.
  setTimeout(updateTimeLoop, 1000);
};

updateTimeLoop();
