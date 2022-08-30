import { Typography, Box, Grid } from '@mui/material';
import CardTask from '../CardTask/CardTask';
import CircleIcon from '@mui/icons-material/Circle';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Column = ({ column, projectId }) => {
  return (
    <Grid item lg={4} md={12} sx={{width: '100%'}}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CircleIcon fontSize='1px' color={column.color} />
        <Typography
          sx={{ mt: 0.2, ml: 0.5, textTransform: 'uppercase' }}
          color='secondary'
          variant='subtitle2'
        >
          {column.colName} ({column.colContent.length})
        </Typography>
      </Box>

      <Droppable droppableId={column.colId}>
        {(droppableProvided, drappableSnapShot) => (
          <Box
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {column.colContent.map((content, index) => {
              return (
                <Draggable
                  key={content.contentId}
                  draggableId={`${content.contentId}`}
                  index={index}
                >
                  {(draggableProvided, draggableSnapShot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      key={content.contentId}
                    >
                      <CardTask
                        projectId={projectId}
                        colName={column.colName}
                        content={content}
                        colId={column.colId}
                        sx={{ width: '100%' }}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {droppableProvided.placeholder}
          </Box>
        )}
      </Droppable>
      
    </Grid>
  );
};
export default Column;
