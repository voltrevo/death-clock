import * as React from 'react';
import * as App from '../../App';
import * as State from './State';
import lifeExpectancy from './lifeExpectancy';
import { HOMEPAGE_ACTION } from '../../GlobalConstants';
import styled from '../../Util/StyledComponents';
import { ThemeProvider } from 'styled-components';
import Theme from '../../Util/Theme';
import { Radio } from 'material-ui';
import Sex from '../../Util/Sex';
import { CSSProperties } from 'react';
import { toVerboseDurationString } from './util';

const Container = styled.div`
  padding-top: 50px;
  display: grid;
  grid-template-columns: 1fr 80px auto auto 1fr;
  align-items: center;
`;

const SexSelector = styled.div`
  align-items: center;
`;

const LifeLeftText = styled.h1`
  align-self: center;
  text-align: center;
  color: ${p => p.theme.colour.Secondary};
  font-weight: 300;
  font-size: 1.5rem;
  grid-column: 1/-1;
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

const RadioStyle = (selected: boolean): CSSProperties => {
  if (selected) { return {color: Theme.colour.Secondary };
  } else { return { color: Theme.colour.PrimaryLight }; }
};

const SexText = (selected: boolean): CSSProperties => {
  if (selected) { return {color: Theme.colour.Secondary, fontWeight: 300 };
  } else { return { color: Theme.colour.PrimaryLight, fontWeight: 300 }; }
};

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
        data: parseFloat(input)
      });
    };

    const onRadioPress = (sex: Sex) => {
      dispatch({
        type: 'set-sex',
        data: sex
      });
    };

    const selected = (sex: Sex): boolean => {
      return store.getState().homepage.sex === sex;
    };

    const state = store.getState().homepage;
    const timeRemaining = lifeExpectancy(state.age) - state.age;

    return (
      <ThemeProvider theme={Theme}>
        <Container>
          <AgeInput
            value={store.getState().homepage.age}
            onInput={onTextInput}
            maxLength={4}
          />
          <SexSelector>
            <Radio
              checked={selected('m')}
              onChange={() => onRadioPress('m')}
              style={RadioStyle(selected('m'))}
            /><span style={SexText(selected('m'))}>Male</span>
          </SexSelector>
          <SexSelector>
            <Radio
              checked={selected('f')}
              onChange={() => onRadioPress('f')}
              style={RadioStyle(selected('f'))}
            /><span style={SexText(selected('f'))}>Female</span>
          </SexSelector>
          <LifeLeftText>
            You have {toVerboseDurationString(timeRemaining)} left.
          </LifeLeftText>
        </Container>
      </ThemeProvider>
    );
  }
);
