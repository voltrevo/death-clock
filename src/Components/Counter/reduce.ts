import * as Actions from './Actions';
import { State } from './State';

export const reduce = (
  state: State,
  action: Actions.Action
): State => {
  const { count } = state;

  switch (action.type) {
    case Actions.INCREMENT:
      return { ...state, count: count + action.data };
    case Actions.DECREMENT:
      return { ...state, count: count - action.data };
  }
};
