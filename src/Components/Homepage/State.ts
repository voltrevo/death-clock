import Sex from '../../Util/Sex';

export const State = () => ({
  age: 0,
  sex: 'm' as Sex
});

export type State = ReturnType<typeof State>;

export type Action =
  | { type: 'set-age', data: number }
  | { type: 'set-sex', data: Sex }
;

export function reduce(state: State, action: Action): State {
  switch (action.type) {
    case 'set-age':
      return {...state, age: action.data };
    case 'set-sex':
      return {...state, sex: action.data };
  }
}
