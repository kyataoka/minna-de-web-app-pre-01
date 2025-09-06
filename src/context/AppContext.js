import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  isDarkMode: false,
  modalState: {
    isOpen: false,
    title: '',
    content: null
  },
  searchState: {
    query: '',
    category: '',
    difficulty: '',
    currentPage: 1
  }
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DARK_MODE':
      return {
        ...state,
        isDarkMode: action.payload
      };
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        isDarkMode: !state.isDarkMode
      };
    case 'OPEN_MODAL':
      return {
        ...state,
        modalState: {
          isOpen: true,
          title: action.payload.title || '',
          content: action.payload.content || null
        }
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalState: {
          isOpen: false,
          title: '',
          content: null
        }
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchState: {
          ...state.searchState,
          query: action.payload,
          currentPage: 1
        }
      };
    case 'SET_SEARCH_CATEGORY':
      return {
        ...state,
        searchState: {
          ...state.searchState,
          category: action.payload,
          currentPage: 1
        }
      };
    case 'SET_SEARCH_DIFFICULTY':
      return {
        ...state,
        searchState: {
          ...state.searchState,
          difficulty: action.payload,
          currentPage: 1
        }
      };
    case 'SET_SEARCH_PAGE':
      return {
        ...state,
        searchState: {
          ...state.searchState,
          currentPage: action.payload
        }
      };
    case 'RESET_SEARCH':
      return {
        ...state,
        searchState: {
          query: '',
          category: '',
          difficulty: '',
          currentPage: 1
        }
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = {
    state,
    dispatch
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};