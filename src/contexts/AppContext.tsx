import React, { createContext, useContext, useReducer, type ReactNode } from 'react';

// 状態の型定義
export interface AppState {
  user: {
    name: string;
    email: string;
    isLoggedIn: boolean;
  };
  notifications: {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    timestamp: Date;
  }[];
  settings: {
    language: 'ja' | 'en';
    emailNotifications: boolean;
    autoSave: boolean;
  };
  loading: {
    global: boolean;
    search: boolean;
    form: boolean;
  };
  searchHistory: string[];
  bookmarks: {
    id: string;
    title: string;
    url: string;
    category: string;
  }[];
}

// アクションの型定義
export type AppAction =
  | { type: 'SET_USER'; payload: Partial<AppState['user']> }
  | { type: 'LOGIN'; payload: { name: string; email: string } }
  | { type: 'LOGOUT' }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<AppState['notifications'][0], 'id' | 'timestamp'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppState['settings']> }
  | { type: 'SET_LOADING'; payload: { key: keyof AppState['loading']; value: boolean } }
  | { type: 'ADD_SEARCH_HISTORY'; payload: string }
  | { type: 'CLEAR_SEARCH_HISTORY' }
  | { type: 'ADD_BOOKMARK'; payload: Omit<AppState['bookmarks'][0], 'id'> }
  | { type: 'REMOVE_BOOKMARK'; payload: string }
  | { type: 'RESET_STATE' };

// 初期状態
const initialState: AppState = {
  user: {
    name: '',
    email: '',
    isLoggedIn: false,
  },
  notifications: [],
  settings: {
    language: 'ja',
    emailNotifications: true,
    autoSave: true,
  },
  loading: {
    global: false,
    search: false,
    form: false,
  },
  searchHistory: [],
  bookmarks: [],
};

// Reducer関数
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case 'LOGIN':
      return {
        ...state,
        user: {
          name: action.payload.name,
          email: action.payload.email,
          isLoggedIn: true,
        },
      };

    case 'LOGOUT':
      return {
        ...state,
        user: {
          name: '',
          email: '',
          isLoggedIn: false,
        },
      };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload,
            id: Date.now().toString(),
            timestamp: new Date(),
          },
        ],
      };

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
      };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: { ...state.loading, [action.payload.key]: action.payload.value },
      };

    case 'ADD_SEARCH_HISTORY':
      const newHistory = [action.payload, ...state.searchHistory.filter(h => h !== action.payload)];
      return {
        ...state,
        searchHistory: newHistory.slice(0, 10), // 最新10件まで保持
      };

    case 'CLEAR_SEARCH_HISTORY':
      return {
        ...state,
        searchHistory: [],
      };

    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarks: [
          ...state.bookmarks,
          {
            ...action.payload,
            id: Date.now().toString(),
          },
        ],
      };

    case 'REMOVE_BOOKMARK':
      return {
        ...state,
        bookmarks: state.bookmarks.filter(b => b.id !== action.payload),
      };

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}

// Context作成
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // ローカルストレージから初期データを読み込み
  React.useEffect(() => {
    const savedSettings = localStorage.getItem('app-settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
      } catch (error) {
        console.error('Failed to load settings from localStorage:', error);
      }
    }

    const savedSearchHistory = localStorage.getItem('search-history');
    if (savedSearchHistory) {
      try {
        const history = JSON.parse(savedSearchHistory);
        history.forEach((term: string) => {
          dispatch({ type: 'ADD_SEARCH_HISTORY', payload: term });
        });
      } catch (error) {
        console.error('Failed to load search history from localStorage:', error);
      }
    }

    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
      try {
        const bookmarks = JSON.parse(savedBookmarks);
        bookmarks.forEach((bookmark: Omit<AppState['bookmarks'][0], 'id'>) => {
          dispatch({ type: 'ADD_BOOKMARK', payload: bookmark });
        });
      } catch (error) {
        console.error('Failed to load bookmarks from localStorage:', error);
      }
    }
  }, []);

  // 設定の変更をローカルストレージに保存
  React.useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(state.settings));
  }, [state.settings]);

  // 検索履歴をローカルストレージに保存
  React.useEffect(() => {
    localStorage.setItem('search-history', JSON.stringify(state.searchHistory));
  }, [state.searchHistory]);

  // ブックマークをローカルストレージに保存
  React.useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
  }, [state.bookmarks]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// カスタムフック
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// 便利なカスタムフック
export const useUser = () => {
  const { state, dispatch } = useAppContext();
  return {
    user: state.user,
    login: (name: string, email: string) => dispatch({ type: 'LOGIN', payload: { name, email } }),
    logout: () => dispatch({ type: 'LOGOUT' }),
    updateUser: (userData: Partial<AppState['user']>) => dispatch({ type: 'SET_USER', payload: userData }),
  };
};

export const useNotifications = () => {
  const { state, dispatch } = useAppContext();
  return {
    notifications: state.notifications,
    addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'timestamp'>) =>
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),
    removeNotification: (id: string) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id }),
    clearNotifications: () => dispatch({ type: 'CLEAR_NOTIFICATIONS' }),
  };
};

export const useSettings = () => {
  const { state, dispatch } = useAppContext();
  return {
    settings: state.settings,
    updateSettings: (settings: Partial<AppState['settings']>) =>
      dispatch({ type: 'UPDATE_SETTINGS', payload: settings }),
  };
};

export const useLoading = () => {
  const { state, dispatch } = useAppContext();
  return {
    loading: state.loading,
    setLoading: (key: keyof AppState['loading'], value: boolean) =>
      dispatch({ type: 'SET_LOADING', payload: { key, value } }),
  };
};

export const useSearchHistory = () => {
  const { state, dispatch } = useAppContext();
  return {
    searchHistory: state.searchHistory,
    addSearchHistory: (term: string) => dispatch({ type: 'ADD_SEARCH_HISTORY', payload: term }),
    clearSearchHistory: () => dispatch({ type: 'CLEAR_SEARCH_HISTORY' }),
  };
};

export const useBookmarks = () => {
  const { state, dispatch } = useAppContext();
  return {
    bookmarks: state.bookmarks,
    addBookmark: (bookmark: Omit<AppState['bookmarks'][0], 'id'>) =>
      dispatch({ type: 'ADD_BOOKMARK', payload: bookmark }),
    removeBookmark: (id: string) => dispatch({ type: 'REMOVE_BOOKMARK', payload: id }),
  };
};