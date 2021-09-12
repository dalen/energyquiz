import { Button } from '@mui/material';
import { AnswerData } from '../decoders/questions';
import { Action } from '../state';

export const Answer = ({
  data,
  dispatch,
}: {
  data: AnswerData;
  dispatch: React.Dispatch<Action>;
}): JSX.Element => {
  return (
    <Button
      variant="contained"
      fullWidth
      onClick={() => dispatch({ type: 'answer', id: data.id })}
    >
      {data.text}
    </Button>
  );
};
