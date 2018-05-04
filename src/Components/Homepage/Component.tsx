import * as React from 'react';
import * as App from '../../App';
import * as State from './State';
import lifeExpectancy from './lifeExpectancy';
import { HOMEPAGE_ACTION } from '../../GlobalConstants';
import styled from '../../Util/StyledComponents';
import { ThemeProvider } from 'styled-components';
import Theme from '../../Util/Theme';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
`;

const AgeInput = styled.input`
  grid-column: 2;
  color: ${p => p.theme.colour.SecondaryLight};
  height: 60px;
  font-size: 1.5rem;
  font-weight: 200;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: ${p => p.theme.colour.PrimaryLight};
  border: 0;
  text-align: center;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${p => p.theme.colour.Secondary};
  }
`;

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
      <ThemeProvider theme={Theme}>
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
          <Container>
            <AgeInput placeholder="AGE"/>
          </Container>
      </ThemeProvider>
    );
  }
);
