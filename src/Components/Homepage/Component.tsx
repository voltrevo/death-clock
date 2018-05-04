import * as React from 'react';
import * as App from '../../App';
import './style.css';

export const Component: React.SFC<{ store: App.Store }> = (
  ({store}) => {
    return (
      <div className="homepage">
        <header className="header">
          <h1 className="title">Sample App</h1>
        </header>
        <div className="body"/>
      </div>
    );
  }
);
