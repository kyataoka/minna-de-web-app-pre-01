import React, { useState } from 'react';
import './Search.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const sampleData = [
    { id: 1, title: 'Reactの基本', content: 'Reactは、ユーザーインターフェース構築のためのJavaScriptライブラリです。' },
    { id: 2, title: 'コンポーネントの作成', content: 'Reactコンポーネントは関数またはクラスで定義できます。' },
    { id: 3, title: 'State管理', content: 'useStateフックを使ってコンポーネントの状態を管理できます。' },
    { id: 4, title: 'Props', content: 'Propsを使用して親コンポーネントから子コンポーネントにデータを渡せます。' },
    { id: 5, title: 'イベントハンドリング', content: 'onClickなどのイベントハンドラーでユーザーインタラクションを処理します。' },
    { id: 6, title: 'CSS スタイリング', content: 'CSSクラスやインラインスタイルでコンポーネントの外観をカスタマイズできます。' }
  ];

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredResults = sampleData.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>検索機能</h2>
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