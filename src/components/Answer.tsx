import { Button } from '@mui/material';
import { AnswerData } from '../decoders/questions';

export const Answer = ({ data }: { data: AnswerData }): JSX.Element => {
  return <Button>{data.text}</Button>;
};
