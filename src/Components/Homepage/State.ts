export const State = () => ({
  age: 0
});

export type State = ReturnType<typeof State>;

export type Action =
  | { type: 'set-age', data: number }
;

export function reduce(state: State, action: Action): State {
  return { age: action.data };
}
