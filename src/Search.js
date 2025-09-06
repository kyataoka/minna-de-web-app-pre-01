import React from 'react';
import Input from './components/Input';
import Button from './components/Button';
import Select from './components/Select';
import useSearch from './hooks/useSearch';
import './Search.css';

const Search = React.memo(function Search() {
  const sampleData = [
    { id: 1, title: 'Reactの基本', content: 'Reactは、ユーザーインターフェース構築のためのJavaScriptライブラリです。', category: 'React', difficulty: '初級' },
    { id: 2, title: 'コンポーネントの作成', content: 'Reactコンポーネントは関数またはクラスで定義できます。', category: 'React', difficulty: '初級' },
    { id: 3, title: 'State管理', content: 'useStateフックを使ってコンポーネントの状態を管理できます。', category: 'React', difficulty: '中級' },
    { id: 4, title: 'Props', content: 'Propsを使用して親コンポーネントから子コンポーネントにデータを渡せます。', category: 'React', difficulty: '初級' },
    { id: 5, title: 'イベントハンドリング', content: 'onClickなどのイベントハンドラーでユーザーインタラクションを処理します。', category: 'JavaScript', difficulty: '中級' },
    { id: 6, title: 'CSS スタイリング', content: 'CSSクラスやインラインスタイルでコンポーネントの外観をカスタマイズできます。', category: 'CSS', difficulty: '初級' },
    { id: 7, title: 'Redux入門', content: 'Reduxは予測可能な状態管理ライブラリです。', category: 'React', difficulty: '上級' },
    { id: 8, title: 'TypeScript基礎', content: 'TypeScriptはJavaScriptに型安全性を追加します。', category: 'TypeScript', difficulty: '中級' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'React', label: 'React' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'CSS', label: 'CSS' },
    { value: 'TypeScript', label: 'TypeScript' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'すべて' },
    { value: '初級', label: '初級' },
    { value: '中級', label: '中級' },
    { value: '上級', label: '上級' }
  ];

  const {
    searchTerm,
    filters,
    currentPage,
    paginationData,
    updateSearchTerm,
    updateFilter,
    clearSearch,
    goToPage,
    nextPage,
    prevPage
  } = useSearch(sampleData, {
    searchFields: ['title', 'content'],
    filterFields: { category: 'all', difficulty: 'all' },
    itemsPerPage: 3
  });

  const { totalPages, currentResults, totalItems } = paginationData;

  const handleInputChange = (e) => {
    updateSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Search is automatic with useSearch hook
    }
  };

  const handleCategoryChange = (e) => {
    updateFilter('category', e.target.value);
  };

  const handleDifficultyChange = (e) => {
    updateFilter('difficulty', e.target.value);
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>検索・フィルタリング機能</h2>
      </div>
      
      <div className="filter-container">
        <div className="filter-row">
          <div className="filter-group">
            <Select
              id="category-filter"
              label="カテゴリ"
              value={filters.category}
              onChange={handleCategoryChange}
              options={categoryOptions}
              className="filter-select"
            />
          </div>
          
          <div className="filter-group">
            <Select
              id="difficulty-filter"
              label="難易度"
              value={filters.difficulty}
              onChange={handleDifficultyChange}
              options={difficultyOptions}
              className="filter-select"
            />
          </div>
        </div>
      </div>
      
      <div className="search-input-container">
        <Input
          type="text"
          className="search-input"
          placeholder="検索キーワードを入力してください..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <div className="search-buttons">
          <Button variant="primary" className="search-button">
            検索
          </Button>
          <Button variant="secondary" className="clear-button" onClick={clearSearch}>
            クリア
          </Button>
        </div>
      </div>

      {totalItems > 0 && (
        <div className="search-results">
          <div className="results-header">
            <h3>検索結果 ({totalItems}件)</h3>
            {totalPages > 1 && (
              <div className="pagination-info">
                ページ {currentPage} / {totalPages} （{currentResults.length}件表示）
              </div>
            )}
          </div>
          {currentResults.map((result, index) => (
            <div 
              key={result.id} 
              className={`search-result-item result-item-${index + 1}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h4 className="result-title">{result.title}</h4>
              <p className="result-content">{result.content}</p>
              <div className="result-metadata">
                <span className={`category-tag category-${result.category.toLowerCase()}`}>
                  {result.category}
                </span>
                <span className={`difficulty-tag difficulty-${result.difficulty}`}>
                  {result.difficulty}
                </span>
              </div>
            </div>
          ))}
          
          {totalPages > 1 && (
            <div className="pagination">
              <Button 
                variant="outline"
                className="pagination-btn prev-btn" 
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                ← 前へ
              </Button>
              
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    key={index + 1}
                    variant={currentPage === index + 1 ? 'primary' : 'outline'}
                    className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                    onClick={() => goToPage(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              
              <Button 
                variant="outline"
                className="pagination-btn next-btn" 
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                次へ →
              </Button>
            </div>
          )}
        </div>
      )}

      {searchTerm && totalItems === 0 && (
        <div className="no-results">
          <p>検索結果が見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
});

export default Search;