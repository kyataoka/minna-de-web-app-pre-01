import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

const Search: React.FC<SearchProps> = ({ 
  placeholder = "検索キーワードを入力してください...", 
  onSearch,
  className = ""
}) => {
  const [query, setQuery] = useState('');

  const memoizedOnSearch = useCallback(onSearch, [onSearch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      memoizedOnSearch(query);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query, memoizedOnSearch]);

  const searchContainerStyle: React.CSSProperties = useMemo(() => ({
    position: 'relative',
    maxWidth: '600px',
    margin: '0 auto'
  }), []);

  const searchInputStyle: React.CSSProperties = useMemo(() => ({
    width: '100%',
    padding: '15px 50px 15px 20px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '25px',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  }), []);

  const searchInputFocusStyle: React.CSSProperties = useMemo(() => ({
    ...searchInputStyle,
    borderColor: '#1976d2',
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)'
  }), [searchInputStyle]);

  const searchIconStyle: React.CSSProperties = useMemo(() => ({
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: '#666',
    pointerEvents: 'none'
  }), []);

  const clearButtonStyle: React.CSSProperties = useMemo(() => ({
    position: 'absolute',
    right: '50px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: '#666',
    cursor: 'pointer',
    padding: '0',
    display: query ? 'block' : 'none'
  }), [query]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={searchContainerStyle} className={className}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        style={isFocused ? searchInputFocusStyle : searchInputStyle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button
        style={clearButtonStyle}
        onClick={handleClear}
        title="クリア"
      >
        ✕
      </button>
      <div style={searchIconStyle}>
        🔍
      </div>
    </div>
  );
};

export default Search;