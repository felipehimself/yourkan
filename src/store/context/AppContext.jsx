import { createContext, useContext, useReducer, useEffect } from 'react';
import reducer from '../reducer/reducer';
import mockState from '../../services/mock';

const getStorage = () => {
  const isStored = localStorage.getItem('youKan-list');

  if (isStored) {
    return JSON.parse(isStored);
  } else {
    localStorage.setItem('youKan-list', JSON.stringify(mockState));
    return mockState;
  }
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(reducer, getStorage());

  useEffect(()=>{
    localStorage.setItem('youKan-list', JSON.stringify(appState))
  },[appState])

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
