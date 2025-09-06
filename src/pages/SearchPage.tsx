import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import { getSearchResults } from '../data/searchData';
import type { SearchItem, FilterOptions } from '../data/searchData';

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [allResults, setAllResults] = useState<SearchItem[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const updatePaginatedResults = (results: SearchItem[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setSearchResults(results.slice(startIndex, endIndex));
  };

  const performSearch = () => {
    setIsLoading(true);
    setCurrentPage(1);
    
    setTimeout(() => {
      const filters: FilterOptions = {
        category: selectedCategory || undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined
      };
      const results = getSearchResults(currentQuery, filters);
      setAllResults(results);
      updatePaginatedResults(results, 1);
      setIsLoading(false);
    }, 200);
  };

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedTags([]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updatePaginatedResults(allResults, page);
  };

  useEffect(() => {
    performSearch();
  }, [currentQuery, selectedCategory, selectedTags]);

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
        
        <Filter
          selectedCategory={selectedCategory}
          selectedTags={selectedTags}
          onCategoryChange={handleCategoryChange}
          onTagChange={handleTagChange}
          onClearFilters={handleClearFilters}
        />
        
        <SearchResults 
          results={searchResults} 
          query={currentQuery}
          isLoading={isLoading}
        />
        
        {!isLoading && allResults.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={allResults.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;