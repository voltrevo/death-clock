import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as GlobalConstants from './GlobalConstants';

import * as Homepage from './Components/Homepage';

const { SET_WHOLE_STATE, SET_PAGE } = GlobalConstants;

export type Page = (
  { name: typeof Homepage.HOMEPAGE_ROUTE } |
  never
);

export type State = {
  page: Page,
};

export function State(seed: string): State {
  return {
    page: { name: Homepage.HOMEPAGE_ROUTE },
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

    default: return state;
  }
}

export type Store = {
  getState: () => State,
  dispatch: (action: Action) => void,
  Dispatcher: (action: Action) => () => void,
  PageDispatcher: (page: Page) => () => void,
  subscribe: (callback: () => void) => void
};

export function Store(seed: string): Store {
  const initState = State(seed);

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
