import Sex from '../../Util/Sex';

export const State = () => ({
  timeOfBirth: null as null | number,
  sex: 'm' as Sex
});

export type State = ReturnType<typeof State>;

export type Action =
  | { type: 'set-timeOfBirth', data: number }
  | { type: 'set-sex', data: Sex }
;

export function reduce(state: State, action: Action): State {
  switch (action.type) {
    case 'set-timeOfBirth':
      return {...state, timeOfBirth: action.data };
    case 'set-sex':
      return {...state, sex: action.data };
  }
}
