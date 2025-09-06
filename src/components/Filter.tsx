import React from 'react';
import { searchData } from '../data/searchData';

interface FilterProps {
  selectedCategory: string;
  selectedTags: string[];
  onCategoryChange: (category: string) => void;
  onTagChange: (tag: string) => void;
  onClearFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedCategory,
  selectedTags,
  onCategoryChange,
  onTagChange,
  onClearFilters
}) => {
  const allCategories = Array.from(new Set(searchData.map(item => item.category)));
  const allTags = Array.from(new Set(searchData.flatMap(item => item.tags)));

  const containerStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1976d2',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const clearButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#1976d2',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '5px 10px',
    borderRadius: '4px',
    textDecoration: 'underline'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '20px'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px'
  };

  const categoryListStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  };

  const tagListStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
  };

  const getCategoryButtonStyle = (category: string): React.CSSProperties => ({
    padding: '8px 16px',
    border: `2px solid ${selectedCategory === category ? '#1976d2' : '#e0e0e0'}`,
    borderRadius: '20px',
    backgroundColor: selectedCategory === category ? '#1976d2' : 'white',
    color: selectedCategory === category ? 'white' : '#666',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  });

  const getTagButtonStyle = (tag: string): React.CSSProperties => ({
    padding: '6px 12px',
    border: `1px solid ${selectedTags.includes(tag) ? '#1976d2' : '#e0e0e0'}`,
    borderRadius: '16px',
    backgroundColor: selectedTags.includes(tag) ? '#1976d2' : 'white',
    color: selectedTags.includes(tag) ? 'white' : '#666',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  });

  const activeFiltersStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#666',
    marginTop: '10px',
    display: selectedCategory || selectedTags.length > 0 ? 'block' : 'none'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <span>🔽 フィルター</span>
        {(selectedCategory || selectedTags.length > 0) && (
          <button 
            style={clearButtonStyle}
            onClick={onClearFilters}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            すべてクリア
          </button>
        )}
      </div>

      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>カテゴリ</div>
        <div style={categoryListStyle}>
          {allCategories.map(category => (
            <button
              key={category}
              style={getCategoryButtonStyle(category)}
              onClick={() => onCategoryChange(category)}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = '#1976d2';
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = '#e0e0e0';
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>タグ</div>
        <div style={tagListStyle}>
          {allTags.map(tag => (
            <button
              key={tag}
              style={getTagButtonStyle(tag)}
              onClick={() => onTagChange(tag)}
              onMouseEnter={(e) => {
                if (!selectedTags.includes(tag)) {
                  e.currentTarget.style.borderColor = '#1976d2';
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                }
              }}
              onMouseLeave={(e) => {
                if (!selectedTags.includes(tag)) {
                  e.currentTarget.style.borderColor = '#e0e0e0';
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div style={activeFiltersStyle}>
        {selectedCategory && <span>カテゴリ: {selectedCategory} </span>}
        {selectedTags.length > 0 && <span>タグ: {selectedTags.join(', ')}</span>}
      </div>
    </div>
  );
};

export default Filter;