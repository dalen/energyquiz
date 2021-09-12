import { QuestionData } from '../decoders/questions';
import { Answer } from './Answer';

export const Question = ({ data }: { data: QuestionData }): JSX.Element => {
  return (
    <div>
      <h1>{data.title}</h1>
      {data.answers.map((a) => (
        <Answer data={a} />
      ))}
    </div>
  );
};
