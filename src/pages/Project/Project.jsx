import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import Column from '../../components/Column/Column';
import { useGlobalContext } from '../../store/context/AppContext';
import { DragDropContext } from 'react-beautiful-dnd';



const Project = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();

  const {
    appState: { projectItems },
    dispatch,
  } = useGlobalContext();

  const onDragEnd = (result) => {
    const { destination, source } = result;
    
    // drops in an unknown destination
    if (!destination) return;

    // drags and drops in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // drops same col but diff position
    const sourceCol = source.droppableId;
    const destinationCol = destination.droppableId;

    if (sourceCol === destinationCol) {
      dispatch({
        type: 'CHANGE_SAME_COLUMN',
        payload: {
          projectId: id,
          sourceCol,
          srcIndex: source.index,
          destIndex: destination.index,
        },
      });

      return;
    }

    // drops in a diff col
    dispatch({
      type: 'CHANGE_ANOTHER_COL',
      payload: {
        projectId: id,
        srcIndex: source.index,
        destIndex: destination.index,
        sourceCol,
        destinationCol,
      },
    });
  };

  useEffect(() => {
    const singleProject = projectItems.find(
      (projectItem) => projectItem.id === id
    );
    setProject(singleProject);
  }, [id, projectItems]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={4}>
        {project?.columns.map((column) => {
          return (
            <Column projectId={project.id} key={column.colId} column={column} />
          );
        })}
      </Grid>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, 50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* {project?.columns.reduce(
          (acc, curr) => acc + curr.colContent.length,
          0
        ) === 0 && (
          <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={true}
        onClose={handleClose}
        message="Start Adding Tasks"
        key={vertical + horizontal}
      />
        )} */}
        
      </Box>
    </DragDropContext>
  );
};
export default Project;
