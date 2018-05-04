import * as React from 'react';
import * as App from '../../App';

import * as State from './State';
import lifeExpectancy from './lifeExpectancy';
import { HOMEPAGE_ACTION } from '../../GlobalConstants';

import './style.css';

export const Component: React.SFC<{ store: App.Store }> = (
  ({store}) => {
    const dispatch = (action: State.Action) => {
      store.dispatch({ type: HOMEPAGE_ACTION, data: action });
    };

    const onTextInput = (evt: React.FormEvent<HTMLInputElement>) => {
      dispatch({
        type: 'set-age',
        data: parseInt((evt.target as HTMLInputElement).value, 10)
      });
    };

    const state = store.getState().homepage;

    return (
      <div className="homepage">
        <header className="header">
          <h1 className="title">Sample App</h1>
        </header>
        <div className="body">
          <input
            type="text"
            value={store.getState().homepage.age}
            onInput={onTextInput}
          />
          <div>
            You have {lifeExpectancy(state.age) - state.age} years left.
          </div>
        </div>
      </div>
    );
  }
);
