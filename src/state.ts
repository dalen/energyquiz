export type State = {
  question: number;
};

export type Action =
  | {
      type: 'answer';
      id: number;
    }
  | {
      type: 'back';
    }
  | {
      type: 'next';
    };

export const initialState: State = { question: 0 };

const assertVoid = (_: never): never => {
  throw new Error();
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'answer':
      return { question: state.question + 1 };
    case 'next':
      return { question: state.question + 1 };
    case 'back':
      return { question: state.question - 1 };
    default:
      assertVoid(action);
      return state;
  }
};
