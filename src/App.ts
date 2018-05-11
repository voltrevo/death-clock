import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as GlobalConstants from './GlobalConstants';

import * as Homepage from './Components/Homepage';
import lifeExpectancy from './Components/Homepage/lifeExpectancy';

const {
  SET_WHOLE_STATE,
  SET_PAGE,
  HOMEPAGE_ACTION,
  SET_TIME,
} = GlobalConstants;

export type Page = (
  { name: typeof Homepage.HOMEPAGE_ROUTE } |
  never
);

export type State = {
  page: Page,
  homepage: Homepage.State,
  time: number | null,
  loadTime: number,
  desiredUpdateTime: number | null,
};

export function State(seed: string, loadTime: number): State {
  return {
    page: { name: Homepage.HOMEPAGE_ROUTE },
    homepage: Homepage.State(),
    time: null,
    loadTime,
    desiredUpdateTime: null,
  };
}

export type Action = (
  {
    type: typeof SET_WHOLE_STATE,
    data: State,
  } |
  {
    type: typeof SET_PAGE,
    data: Page,
  } |
  {
    type: typeof HOMEPAGE_ACTION,
    data: Homepage.Action,
  } |
  {
    type: typeof SET_TIME,
    data: number,
  } |
  never
);

export function reduce(state: State, action: Action): State {
  switch (action.type) {
    case SET_WHOLE_STATE: {
      return action.data;
    }

    case SET_PAGE: {
      return { ...state, page: action.data };
    }

    case HOMEPAGE_ACTION: {
      return {
        ...state,
        homepage: Homepage.reduce(state.homepage, action.data)
      };
    }

    case SET_TIME: {
      const time = action.data;

      const age = (
        (time - (state.homepage.timeOfBirth || state.loadTime)) /
        (365.24 * 86400000)
      );

      const timeLeft = lifeExpectancy(age, state.homepage.sex) - age;

      const ageAfter1Sec = age + (1 / (365.24 * 86400));

      const timeLeftAfter1Sec = lifeExpectancy(
        ageAfter1Sec,
        state.homepage.sex
      ) - ageAfter1Sec;

      const countdownRate = (timeLeft - timeLeftAfter1Sec) * 365.24 * 86400;
      const timeLeftSec = timeLeft * 365.24 * 86400;

      const faceTimeUntilTick = 1000 * (
        timeLeftSec - (Math.round(timeLeftSec) - 1)
      );

      const timeUntilTick = faceTimeUntilTick / countdownRate;
      const desiredUpdateTime = time + timeUntilTick;

      return { ...state, time, desiredUpdateTime };
    }
  }
}

export type Store = {
  getState: () => State,
  dispatch: (action: Action) => void,
  Dispatcher: (action: Action) => () => void,
  PageDispatcher: (page: Page) => () => void,
  subscribe: (callback: () => void) => void
};

export function Store(seed: string, loadTime: number): Store {
  const initState = State(seed, loadTime);

  const reduxStore = createStore(
    (state, action) => reduce(
      state || initState,
      action as Action,
    ),
    initState,
    composeWithDevTools()
  );

  const getState = () => (
    (reduxStore.getState() || initState) as State
  );

  const dispatch = (action: Action) => reduxStore.dispatch(action);
  const Dispatcher = (action: Action) => () => dispatch(action);

  const PageDispatcher = (page: Page) => (
    Dispatcher({ type: SET_PAGE, data: page })
  );

  const subscribe = reduxStore.subscribe;

  return {
    getState,
    dispatch,
    Dispatcher,
    PageDispatcher,
    subscribe,
  };
}
