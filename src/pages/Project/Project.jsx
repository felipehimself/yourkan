import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
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
      <Box sx={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {project?.columns.map((column) => {
          return <Column projectId={project.id} key={column.colId} column={column} />;
        })}
      </Box>
    </DragDropContext>
  );
};
export default Project;
