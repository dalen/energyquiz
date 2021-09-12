import { Button, Container, MobileStepper } from '@mui/material';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useReducer } from 'react';
import usePromise from 'react-promise';
import { Question } from './components/Question';
import { AppData } from './decoders/questions';

type State = {
  question: number;
};

type Action =
  | {
      type: 'answer';
      question: number;
    }
  | {
      type: 'back';
    }
  | {
      type: 'next';
    };

const initialState: State = { question: 0 };

const assertVoid = (_: never): never => {
  throw new Error();
};

const reducer = (state: State, action: Action): State => {
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

export const App = ({
  appDataPromise,
}: {
  appDataPromise: Promise<AppData>;
}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    value: appData,
    loading,
    error,
  } = usePromise<AppData>(appDataPromise);

  if (error)
    return (
      <Alert severity="error">
        {error.name}: {error.message}
      </Alert>
    );

  if (loading || !appData) return <LinearProgress />;

  return (
    <Container maxWidth="md">
      <MobileStepper
        variant="progress"
        steps={appData.questions.length}
        activeStep={state.question}
        nextButton={
          <Button
            size="small"
            onClick={() => dispatch({ type: 'next' })}
            disabled={state.question === appData.questions.length - 1}
          >
            Next <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => dispatch({ type: 'back' })}
            disabled={state.question === 0}
          >
            <KeyboardArrowLeft /> Back
          </Button>
        }
      />
      <Question data={appData.questions[state.question]} />
    </Container>
  );
};
