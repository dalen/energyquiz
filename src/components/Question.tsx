import { Box, Grid, Paper } from '@mui/material';
import marked from 'marked';
import { QuestionData } from '../decoders/questions';
import { Answer } from './Answer';

const getMarkdownText = (text: string) => {
  const rawMarkup = marked(text, { sanitize: true });
  return { __html: rawMarkup };
};

export const Question = ({ data }: { data: QuestionData }): JSX.Element => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper>
          <Box py={0.5} px={2}>
            <h1>{data.title}</h1>
            {data.text && (
              // eslint-disable-next-line react/no-danger
              <div dangerouslySetInnerHTML={getMarkdownText(data.text)} />
            )}
          </Box>
        </Paper>
      </Grid>
      {data.answers.map((a) => (
        <Grid item xs={4}>
          <Answer data={a} />
        </Grid>
      ))}
    </Grid>
  );
};
