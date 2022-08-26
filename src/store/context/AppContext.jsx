import { createContext, createElement, useContext, useReducer } from 'react';
import reducer from '../reducer/reducer';
import { v4 as uuidv4 } from 'uuid';
const AppContext = createContext();


const initialState = {
  projectItems: [
    { id: uuidv4(), name: 'projeto react' },
    { id: uuidv4(), name: 'projeto flutter' },
  ],
  isOpenAddProject: false
};

const AppProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={{appState, dispatch}}>{children}</AppContext.Provider>;
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
