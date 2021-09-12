import { string, object, array, $DecoderType, integer, guard } from 'decoders';

const answerDecoder = object({
  id: integer,
  text: string,
});

const questionDecoder = object({
  id: integer,
  title: string,
  answers: array(answerDecoder),
});

const appDataDecoder = object({
  questions: array(questionDecoder),
});

export type QuestionData = $DecoderType<typeof questionDecoder>;
export type AnswerData = $DecoderType<typeof answerDecoder>;
export type AppData = $DecoderType<typeof appDataDecoder>;

export const fetchQuestionData = async (): Promise<AppData> => {
  const questionData = await (await fetch('/data/questions.json')).json();
  return guard(appDataDecoder)(questionData);
};
