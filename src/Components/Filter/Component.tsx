import * as React from 'react';
import * as App from '../../App';
import './style.css';

import * as Constant from './Constants';
import * as Homepage from '../Homepage';

const highlight = (text: string, searchText: string): JSX.Element | null => {
  const matchPos = text.toUpperCase().indexOf(searchText.toUpperCase());

  if (matchPos === -1) {
    return null;
  }

  return (
    <p className="textBlock">
      <span>{text.slice(0, matchPos)}</span>
      <span className="highlight">
        {text.slice(matchPos, matchPos + searchText.length)}
      </span>
      <span>{text.slice(matchPos + searchText.length, text.length)}</span>
    </p>
  );
};

export const Component: React.SFC<{ store: App.Store }> = (
  ({store}) => {
    const searchText = store.getState().filter;

    return (
      <div className="filter">
        <input
          type="text"
          value={store.getState().filter}
          onInput={evt => store.dispatch({
            type: Constant.FILTER,
            data: (evt.target as HTMLInputElement).value,
          })}
        />
        {(Constant.Lines
          .map(line => highlight(line, searchText))
          .filter(el => el !== null)
        )}
        <br/>
        <button onClick={store.PageDispatcher({ name: Homepage.HOMEPAGE_ROUTE })}>
          Home
        </button>
      </div>
    );
  }
);
