import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as GlobalConstants from './GlobalConstants';

import * as Homepage from './Components/Homepage';

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
  loadTime: number
};

export function State(seed: string, loadTime: number): State {
  return {
    page: { name: Homepage.HOMEPAGE_ROUTE },
    homepage: Homepage.State(),
    time: null,
    loadTime,
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
      return { ...state, time: action.data };
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
