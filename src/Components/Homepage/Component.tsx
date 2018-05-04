import * as React from 'react';
import * as App from '../../App';
import * as State from './State';
import lifeExpectancy from './lifeExpectancy';
import { HOMEPAGE_ACTION } from '../../GlobalConstants';
import styled from '../../Util/StyledComponents';
import { ThemeProvider } from 'styled-components';
import Theme from '../../Util/Theme';
import { Radio } from 'material-ui';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
`;

const AgeInput = styled.input`
  grid-column: 2;
  color: ${p => p.theme.colour.SecondaryLight};
  height: 45px;
  font-size: 1.5rem;
  font-weight: 200;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: ${p => p.theme.colour.PrimaryLight};
  border: 0;
  text-align: center;
  :focus {
    outline: none;
    background-color: ${p => p.theme.colour.Secondary};
    color: ${p => p.theme.colour.OnPrimary};
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
      let input = (evt.target as HTMLInputElement).value;
      if (input === '') { input = '0'; }
      dispatch({
        type: 'set-age',
        data: parseInt(input, 10),
      });
    };

    const state = store.getState().homepage;
    return (
      <ThemeProvider theme={Theme}>
        <Container>
          <AgeInput
            value={store.getState().homepage.age}
            onInput={onTextInput}
            maxLength={2}
          />
          <Radio
            checked={this.state.selectedValue === 'a'}
            onChange={this.handleChange}
            value="a"
            name="radio-button-demo"
            aria-label="A"
          />
          <div>
            You have {lifeExpectancy(state.age) - state.age} years left.
          </div>
        </Container>
      </ThemeProvider>
    );
  }
);
