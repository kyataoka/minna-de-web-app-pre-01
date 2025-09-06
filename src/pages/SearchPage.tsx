import React, { useState } from 'react';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults';
import { getSearchResults } from '../data/searchData';
import type { SearchItem } from '../data/searchData';

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    setIsLoading(true);

    setTimeout(() => {
      const results = getSearchResults(query);
      setSearchResults(results);
      setIsLoading(false);
    }, 200);
  };

  const pageStyle: React.CSSProperties = {
    minHeight: 'calc(100vh - 200px)',
    backgroundColor: '#f8f9fa',
    padding: '40px 20px'
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '40px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1976d2',
    marginBottom: '10px'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px'
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>🔍 検索</h1>
          <p style={subtitleStyle}>
            キーワードを入力してコンテンツを検索してください
          </p>
          <Search onSearch={handleSearch} />
        </div>
        
        <SearchResults 
          results={searchResults} 
          query={currentQuery}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default SearchPage;