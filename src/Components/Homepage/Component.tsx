import * as React from 'react';
import * as App from '../../App';
import './style.css';

const logo = require('../../logo.svg');

export const Component: React.SFC<{ store: App.Store }> = (
  ({store}) => {
    return (
      <div className="homepage">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Sample App</h1>
        </header>
        <div className="body"/>
      </div>
    );
  }
);
