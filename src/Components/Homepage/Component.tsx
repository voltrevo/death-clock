import * as React from 'react';
import * as App from '../../App';
import * as State from './State';
import lifeExpectancy from './lifeExpectancy';
import { HOMEPAGE_ACTION } from '../../GlobalConstants';
import styled from '../../Util/StyledComponents';
import { ThemeProvider } from 'styled-components';
import Theme from '../../Util/Theme';
import { Paper, Radio } from 'material-ui';
import Sex from '../../Util/Sex';
import { CSSProperties } from 'react';
import { toVerboseDurationString } from './util';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin: 20px;
  font-family: 'Julius Sans One', sans-serif;
`;

const Background = styled(Paper)`&&{
  grid-column: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  padding: 30px;
  background-color: transparent;
  border: 1px solid ${p => p.theme.colour.Secondary};
  border-radius: 5px;
  box-shadow: 0 0 50px 0 rgba(0, 0, 0, .15);
}`;

const Title = styled.h1`
  color: ${p => p.theme.colour.Secondary};
  font-weight: 200;
  grid-column: 1/-1;
  justify-self: center;
`;

const DividerStyle = styled.hr`&&{
  grid-column: 1/-1;
  width: 220px;
  border: .5px solid ${p => p.theme.colour.Secondary};
}`;

const FemaleSelector = styled.div`
  justify-self: left;
`;

const MaleSelector = styled.div`
  justify-self: right;
`;

const LifeLeftText = styled.h1`
  text-align: center;
  color: ${p => p.theme.colour.Secondary};
  font-weight: 300;
  font-size: 1.5rem;
  grid-column: 1/-1;
`;

const AgeInput = styled.input`
  grid-column: span 2;
  color: ${p => p.theme.colour.SecondaryLight};
  height: 45px;
  font-size: 1.5rem;
  font-weight: 200;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: transparent;
  border: 1px solid ${p => p.theme.colour.Secondary};
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
    const t = store.getState().time;

    const timeOfDay = (
      t === undefined ?
      0 :
      t - 86400000 * Math.floor(t / 86400000)
    );

    const ageWithTimeOfDay = state.age + timeOfDay / 86400000 / 365.24;

    const timeRemaining = (
      lifeExpectancy(ageWithTimeOfDay, state.sex) -
      ageWithTimeOfDay
    );

    return (
      <ThemeProvider theme={Theme}>
        <Container>
          <Title>LIFE EXPECTANCY</Title>
          <Background>
            <AgeInput
              value={store.getState().homepage.age}
              onInput={onTextInput}
              maxLength={9}
            />
            <MaleSelector>
              <span style={SexText(selected('m'))}>M</span><Radio
                checked={selected('m')}
                onChange={() => onRadioPress('m')}
                style={RadioStyle(selected('m'))}
              />
            </MaleSelector>
            <FemaleSelector>
              <Radio
                checked={selected('f')}
                onChange={() => onRadioPress('f')}
                style={RadioStyle(selected('f'))}
              /><span style={SexText(selected('f'))}>F</span>
            </FemaleSelector>
            <DividerStyle/>
              <LifeLeftText>
                You have {toVerboseDurationString(timeRemaining)} left.
              </LifeLeftText>
            <DividerStyle/>
          </Background>
        </Container>
      </ThemeProvider>
    );
  }
);
