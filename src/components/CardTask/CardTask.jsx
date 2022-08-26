import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardButton from '../CardButton/CardButton';
import './GlobalCssCard.css';

export default function CardTask({ content, colName, projectId, colId }) {
  // console.log(projectId + '\n', colId + '\n', content.contentId + '\n')

  return (
    <Card
      sx={{ minWidth: 250, cursor: 'grab', marginTop: 2, position: 'relative' }}
    >
      <CardButton
        projectId={projectId}
        contentId={content.contentId}
        colId={colId}
      />
      <CardContent>
        <Typography
          variant='subtitle1'
          sx={{ fontSize: 14, textTransform: 'capitalize' }}
          color='secondary'
          gutterBottom
        >
          {content.title}
        </Typography>
        <Typography variant='h5' component='div'></Typography>

        <Typography
          variant='body2'
          sx={{ textDecoration: colName === 'done' ? 'line-through' : 'none' }}
        >
          {content.desc}
        </Typography>
      </CardContent>
    </Card>
  );
}
