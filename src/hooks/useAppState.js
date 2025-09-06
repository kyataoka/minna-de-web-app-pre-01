import { useCallback, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import useLocalStorage from './useLocalStorage';

export const useTheme = () => {
  const { state, dispatch } = useAppContext();
  const [storedTheme, setStoredTheme] = useLocalStorage('theme', false);
  
  useEffect(() => {
    dispatch({ type: 'SET_DARK_MODE', payload: storedTheme });
  }, [dispatch, storedTheme]);

  useEffect(() => {
    document.body.className = state.isDarkMode ? 'dark-mode' : '';
  }, [state.isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    const newTheme = !state.isDarkMode;
    setStoredTheme(newTheme);
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  }, [state.isDarkMode, setStoredTheme, dispatch]);

  return {
    isDarkMode: state.isDarkMode,
    toggleDarkMode
  };
};

export const useModalState = () => {
  const { state, dispatch } = useAppContext();

  const openModal = useCallback((title, content) => {
    dispatch({ 
      type: 'OPEN_MODAL', 
      payload: { title, content } 
    });
  }, [dispatch]);

  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' });
  }, [dispatch]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && state.modalState.isOpen) {
        closeModal();
      }
    };

    if (state.modalState.isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [state.modalState.isOpen, closeModal]);

  return {
    modalState: state.modalState,
    openModal,
    closeModal
  };
};

export const useSearchState = () => {
  const { state, dispatch } = useAppContext();

  const setSearchQuery = useCallback((query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }, [dispatch]);

  const setSearchCategory = useCallback((category) => {
    dispatch({ type: 'SET_SEARCH_CATEGORY', payload: category });
  }, [dispatch]);

  const setSearchDifficulty = useCallback((difficulty) => {
    dispatch({ type: 'SET_SEARCH_DIFFICULTY', payload: difficulty });
  }, [dispatch]);

  const setSearchPage = useCallback((page) => {
    dispatch({ type: 'SET_SEARCH_PAGE', payload: page });
  }, [dispatch]);

  const resetSearch = useCallback(() => {
    dispatch({ type: 'RESET_SEARCH' });
  }, [dispatch]);

  return {
    searchState: state.searchState,
    setSearchQuery,
    setSearchCategory,
    setSearchDifficulty,
    setSearchPage,
    resetSearch
  };
};