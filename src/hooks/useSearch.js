import { useState, useMemo, useCallback } from 'react';

const useSearch = (data, options = {}) => {
  const {
    searchFields = ['title', 'content'],
    filterFields = {},
    itemsPerPage = 10
  } = options;

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(
    Object.keys(filterFields).reduce((acc, key) => {
      acc[key] = 'all';
      return acc;
    }, {})
  );

  const filteredData = useMemo(() => {
    let results = data;

    if (searchTerm.trim()) {
      results = results.filter(item => 
        searchFields.some(field => 
          item[field] && 
          item[field].toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    Object.keys(filters).forEach(filterKey => {
      if (filters[filterKey] !== 'all') {
        results = results.filter(item => item[filterKey] === filters[filterKey]);
      }
    });

    return results;
  }, [data, searchTerm, filters, searchFields]);

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentResults = filteredData.slice(startIndex, endIndex);
    
    return {
      totalPages,
      currentResults,
      totalItems: filteredData.length,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, filteredData.length)
    };
  }, [filteredData, currentPage, itemsPerPage]);

  const updateSearchTerm = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  const updateFilter = useCallback((filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
    setCurrentPage(1);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setFilters(Object.keys(filterFields).reduce((acc, key) => {
      acc[key] = 'all';
      return acc;
    }, {}));
    setCurrentPage(1);
  }, [filterFields]);

  const goToPage = useCallback((page) => {
    const { totalPages } = paginationData;
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [paginationData]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  return {
    searchTerm,
    filters,
    currentPage,
    filteredData,
    paginationData,
    updateSearchTerm,
    updateFilter,
    clearSearch,
    goToPage,
    nextPage,
    prevPage
  };
};

export default useSearch;