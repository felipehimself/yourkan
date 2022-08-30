import { v4 as uuidv4 } from 'uuid';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'OPEN_DELETE_PROJECT':
      return { ...state, isOpenDeleteProject: true };

    case 'CLOSE_DELETE_PROJECT':
      return { ...state, isOpenDeleteProject: false };

    case 'OPEN_TASK_MODAL':
      return {
        ...state,
        isOpenTaskModal: true,
      };

    case 'CLOSE_TASK_MODAL':
      return {
        ...state,
        isOpenTaskModal: false,
        taskToEdit: null,
      };

    case 'ADD_NEW_TASK':
      return {
        ...state,
        isOpenTaskModal: false,
        projectItems: state.projectItems.map((project) => {
          if (project.id === payload.id) {
            return {
              ...project,
              columns: project.columns.map((col) => {
                if (col.colName === 'todo') {
                  return {
                    ...col,
                    colContent: [...col.colContent, payload.newTask],
                  };
                }

                return col;
              }),
            };
          }

          return project;
        }),
      };

    case 'EDIT_TASK':
      return {
        ...state,
        taskToEdit: payload,
        isOpenTaskModal: true,
      };

    case 'SAVE_EDIT_TASK':
      return {
        ...state,
        isOpenTaskModal: false,
        taskToEdit: null,
        projectItems: state.projectItems.map((project) => {
          if (project.id === payload.projectId) {
            return {
              ...project,
              columns: project.columns.map((col) => {
                if (col.colId === payload.colId) {
                  return {
                    ...col,
                    colContent: col.colContent.map((content) => {
                      if (content.contentId === payload.contentId)
                        return {
                          ...content,
                          title: payload.title,
                          desc: payload.desc,
                        };

                      return content;
                    }),
                  };
                }

                return col;
              }),
            };
          }

          return project;
        }),
      };

    case 'DELETE_PROJECT':
      return {
        ...state,
        isOpenDeleteProject: payload.isOpenDeleteProject,
        projectItems: state.projectItems.filter(
          (project) => project.id !== payload.id
        ),
      };

    case 'EDIT_PROJECT_NAME':
      return { ...state, projectToEditId: payload.id };

    case 'CHANGE_PROJECT_NAME':
      return {
        ...state,
        projectToEditId: '',
        projectItems: state.projectItems.map((projectItem) => {
          if (projectItem.id === payload.id) {
            return { ...projectItem, name: payload.name };
          }

          return projectItem;
        }),
      };

    case 'ADD_PROJECT':
      return {
        ...state,

        projectItems: [
          ...state.projectItems,
          {
            name: payload.name,
            id: payload.id,
            columns: [
              {
                colName: 'todo',
                color: 'info',
                colId: uuidv4(),
                colContent: [],
              },
              {
                colName: 'doing',
                color: 'warning',
                colId: uuidv4(),
                colContent: [],
              },
              {
                colName: 'done',
                color: 'success',
                colId: uuidv4(),
                colContent: [],
              },
            ],
          },
        ],
      };

    case 'CHANGE_SAME_COLUMN':
      const { projectId, sourceCol, srcIndex, destIndex } = payload;
      const { projectItems } = state;

      const newState = [...projectItems]

      newState.forEach(projItem => {
          if(projItem.id === projectId){
            projItem.columns.forEach((col)=>{
              if(col.colId === sourceCol){
                const item = col.colContent[srcIndex];
                col.colContent.splice(srcIndex, 1);
                col.colContent.splice(destIndex, 0, item);
              }
            })
          }
      });

      return { ...state, projectItems: [...newState] };

    case 'CHANGE_ANOTHER_COL':
      const {
        projectId: projId,
        srcIndex: itemIndex,
        sourceCol: colId,
        destinationCol: destColId,
        destIndex: destPos
      } = payload;

      const _newState = [...state.projectItems];

      const itemToMove = _newState
        .find((item) => item.id === projId)
        .columns.find((col) => col.colId === colId).colContent[itemIndex];

      _newState.forEach((item) => {
        if (item.id === projId) {
          item.columns.forEach((col) => {
            if (col.colId === colId) {
              col.colContent.splice(itemIndex, 1);
            }
          });
        }
      });

      _newState.forEach((item) => {
        if (item.id === projId) {
          item.columns.forEach((col) => {
            if (col.colId === destColId) {
              col.colContent.splice(destPos,0,itemToMove);
            }
          });
        }
      });

      return { ...state, projectItems: [..._newState] };

    case 'DELETE_CARD':
      return {
        ...state,
        projectItems: state.projectItems.map((project) => {
          if (project.id === payload.projectId) {
            return {
              ...project,
              columns: project.columns.map((col) => {
                if (col.colId === payload.colId) {
                  return {
                    ...col,
                    colContent: col.colContent.filter(
                      (content) => content.contentId !== payload.contentId
                    ),
                  };
                }

                return col;
              }),
            };
          }

          return project;
        }),
      };

    default:
      return state;
  }
};

export default reducer;
