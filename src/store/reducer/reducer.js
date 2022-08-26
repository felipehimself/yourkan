const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'OPEN_ADD_PROJECT':
      return { ...state, isOpenAddProject: true };

    case 'CLOSE_ADD_PROJECT':
      return { ...state, isOpenAddProject: false };

    case 'ADD_PROJECT':  
      return { ...state, isOpenAddProject: false, projectItems: [...state.projectItems, { name: payload.name, id: payload.id }] };

    default:
      return state;
  }
};

export default reducer;
