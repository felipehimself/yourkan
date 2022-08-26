import { createContext, useContext, useReducer } from 'react';
import reducer from '../reducer/reducer';
import mockState from '../../services/mock';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(reducer, mockState);

  
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
