import React, { useState } from 'react';
import './Search.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

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

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    let filteredResults = sampleData.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== 'all') {
      filteredResults = filteredResults.filter(item => item.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filteredResults = filteredResults.filter(item => item.difficulty === selectedDifficulty);
    }

    setSearchResults(filteredResults);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>検索・フィルタリング機能</h2>
      </div>
      
      <div className="filter-container">
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="category-filter">カテゴリ:</label>
            <select 
              id="category-filter"
              className="filter-select" 
              value={selectedCategory} 
              onChange={handleCategoryChange}
            >
              <option value="all">すべて</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="CSS">CSS</option>
              <option value="TypeScript">TypeScript</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="difficulty-filter">難易度:</label>
            <select 
              id="difficulty-filter"
              className="filter-select" 
              value={selectedDifficulty} 
              onChange={handleDifficultyChange}
            >
              <option value="all">すべて</option>
              <option value="初級">初級</option>
              <option value="中級">中級</option>
              <option value="上級">上級</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="検索キーワードを入力してください..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <div className="search-buttons">
          <button className="search-button" onClick={handleSearch}>
            検索
          </button>
          <button className="clear-button" onClick={clearSearch}>
            クリア
          </button>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>検索結果 ({searchResults.length}件)</h3>
          {searchResults.map(result => (
            <div key={result.id} className="search-result-item">
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
        </div>
      )}

      {searchTerm && searchResults.length === 0 && (
        <div className="no-results">
          <p>検索結果が見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}

export default Search;