import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import { getSearchResults } from '../data/searchData';
import { useSearchHistory, useLoading } from '../contexts/AppContext';
import type { SearchItem, FilterOptions } from '../data/searchData';

const SearchPage: React.FC = React.memo(() => {
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [allResults, setAllResults] = useState<SearchItem[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const { addSearchHistory } = useSearchHistory();
  const { loading, setLoading } = useLoading();

  const updatePaginatedResults = useCallback((results: SearchItem[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setSearchResults(results.slice(startIndex, endIndex));
  }, [itemsPerPage]);

  const performSearch = useCallback(() => {
    setLoading('search', true);
    setCurrentPage(1);
    
    // 検索履歴に追加（空でない場合）
    if (currentQuery.trim()) {
      addSearchHistory(currentQuery.trim());
    }
    
    setTimeout(() => {
      const filters: FilterOptions = {
        category: selectedCategory || undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined
      };
      const results = getSearchResults(currentQuery, filters);
      setAllResults(results);
      updatePaginatedResults(results, 1);
      setLoading('search', false);
    }, 150);
  }, [currentQuery, selectedCategory, selectedTags, updatePaginatedResults, addSearchHistory, setLoading]);

  const handleSearch = useCallback((query: string) => {
    setCurrentQuery(query);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  }, [selectedCategory]);

  const handleTagChange = useCallback((tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedCategory('');
    setSelectedTags([]);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    updatePaginatedResults(allResults, page);
  }, [allResults, updatePaginatedResults]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const pageStyle: React.CSSProperties = useMemo(() => ({
    minHeight: 'calc(100vh - 200px)',
    backgroundColor: 'var(--bg-color)',
    padding: 'clamp(20px, 5vw, 40px) clamp(10px, 3vw, 20px)'
  }), []);

  const containerStyle: React.CSSProperties = useMemo(() => ({
    maxWidth: '1200px',
    margin: '0 auto'
  }), []);

  const headerStyle: React.CSSProperties = useMemo(() => ({
    textAlign: 'center',
    marginBottom: 'clamp(20px, 5vw, 40px)'
  }), []);

  const titleStyle: React.CSSProperties = useMemo(() => ({
    fontSize: 'clamp(24px, 6vw, 32px)',
    fontWeight: '700',
    color: 'var(--nav-active-border)',
    marginBottom: 'clamp(8px, 2vw, 10px)'
  }), []);

  const subtitleStyle: React.CSSProperties = useMemo(() => ({
    fontSize: 'clamp(14px, 3vw, 16px)',
    color: 'var(--text-color)',
    opacity: 0.8,
    marginBottom: 'clamp(20px, 4vw, 30px)'
  }), []);

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
          isLoading={loading.search}
        />
        
        {!loading.search && allResults.length > 0 && (
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
});

export default SearchPage;