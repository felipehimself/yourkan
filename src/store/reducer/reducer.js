import { v4 as uuidv4 } from 'uuid';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'OPEN_DELETE_PROJECT':
      return { ...state, isOpenDeleteProject: true };

    case 'CLOSE_DELETE_PROJECT':
      return { ...state, isOpenDeleteProject: false };

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

      const newState = projectItems.map((projItem) => {
        if (projItem.id === projectId) {
          return {
            ...projItem,
            columns: projItem.columns.map((col) => {
              if (col.colId === sourceCol) {
                const newColContent = [...col.colContent];
                const item = newColContent[srcIndex];
                newColContent.splice(srcIndex, 1);
                newColContent.splice(destIndex, 0, item);

                return { ...col, colContent: [...newColContent] };
              }

              return col;
            }),
          };
        }

        return projItem;
      });

      return { ...state, projectItems: [...newState] };

    case 'CHANGE_ANOTHER_COL':
      const {
        projectId: projId,
        srcIndex: itemIndex,
        sourceCol: colId,
        destinationCol: destColId,
      } = payload;

      const allItems = state.projectItems;

      const itemToMove = allItems
        .find((item) => item.id === projId)
        .columns.find((col) => col.colId === colId).colContent[itemIndex];

      const withouItemToMove = allItems.map((item) => {
        if (item.id === projId) {
          return {
            ...item,
            columns: item.columns.map((col) => {
              if (col.colId === colId) {
                return {
                  ...col,
                  colContent: [
                    ...col.colContent.filter((_, ind) => ind !== itemIndex),
                  ],
                };
              }

              return col;
            }),
          };
        }

        return item;
      });

      const _newState = withouItemToMove.map((item) => {
        if (item.id === projId) {
          return {
            ...item,
            columns: item.columns.map((col) => {
              if (col.colId === destColId) {
                return { ...col, colContent: [...col.colContent, itemToMove] };
              }
              return col;
            }),
          };
        }

        return item;
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
