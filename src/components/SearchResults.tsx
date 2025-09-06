import React, { useMemo, useCallback } from 'react';
import type { SearchItem } from '../data/searchData';

interface SearchResultsProps {
  results: SearchItem[];
  query: string;
  isLoading?: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = React.memo(({ 
  results, 
  query, 
  isLoading = false 
}) => {
  const containerStyle: React.CSSProperties = useMemo(() => ({
    maxWidth: '800px',
    margin: '20px auto 0',
    padding: '0 20px'
  }), []);

  const loadingStyle: React.CSSProperties = useMemo(() => ({
    textAlign: 'center',
    padding: '40px',
    fontSize: '16px',
    color: '#666'
  }), []);

  const noResultsStyle: React.CSSProperties = useMemo(() => ({
    textAlign: 'center',
    padding: '40px',
    fontSize: '16px',
    color: '#666',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  }), []);

  const resultItemStyle: React.CSSProperties = useMemo(() => ({
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  }), []);

  const resultItemHoverStyle: React.CSSProperties = useMemo(() => ({
    ...resultItemStyle,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    transform: 'translateY(-2px)',
    borderColor: '#1976d2'
  }), [resultItemStyle]);

  const titleStyle: React.CSSProperties = useMemo(() => ({
    fontSize: '18px',
    fontWeight: '600',
    color: '#1976d2',
    marginBottom: '8px',
    lineHeight: '1.4'
  }), []);

  const contentStyle: React.CSSProperties = useMemo(() => ({
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '12px'
  }), []);

  const metaStyle: React.CSSProperties = useMemo(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    fontSize: '12px',
    color: '#888'
  }), []);

  const categoryStyle: React.CSSProperties = useMemo(() => ({
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: '500'
  }), []);

  const tagsStyle: React.CSSProperties = useMemo(() => ({
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap' as const
  }), []);

  const tagStyle: React.CSSProperties = useMemo(() => ({
    backgroundColor: '#f5f5f5',
    color: '#666',
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '11px'
  }), []);

  const highlightText = useCallback((text: string, query: string): React.ReactNode => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: '#fff3cd', fontWeight: '600' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  }, []);

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          🔍 検索中...
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div style={containerStyle}>
        <div style={noResultsStyle}>
          キーワードを入力して検索を開始してください
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={noResultsStyle}>
          「{query}」に一致する結果が見つかりませんでした
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {results.map((item) => (
        <div
          key={item.id}
          style={resultItemStyle}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, resultItemHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, resultItemStyle)}
        >
          <div style={titleStyle}>
            {highlightText(item.title, query)}
          </div>
          <div style={contentStyle}>
            {highlightText(item.content, query)}
          </div>
          <div style={metaStyle}>
            <span style={categoryStyle}>
              {item.category}
            </span>
            <div style={tagsStyle}>
              {item.tags.map((tag, index) => (
                <span key={index} style={tagStyle}>
                  {highlightText(tag, query)}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default SearchResults;