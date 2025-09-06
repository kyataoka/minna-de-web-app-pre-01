import React, { useMemo, useCallback } from 'react';
import type { SearchItem } from '../data/searchData';
import LoadingSpinner from './LoadingSpinner';
import { Card } from './ui';
import { slideInUpAnimation } from '../utils';

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


  const noResultsStyle: React.CSSProperties = useMemo(() => ({
    textAlign: 'center',
    padding: '40px',
    fontSize: '16px',
    color: 'var(--text-color)',
    backgroundColor: 'var(--card-bg)',
    borderRadius: '8px',
    border: '1px solid var(--border-color)'
  }), []);



  const titleStyle: React.CSSProperties = useMemo(() => ({
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--nav-active-border)',
    marginBottom: '8px',
    lineHeight: '1.4'
  }), []);

  const contentStyle: React.CSSProperties = useMemo(() => ({
    fontSize: '14px',
    color: 'var(--text-color)',
    lineHeight: '1.6',
    marginBottom: '12px'
  }), []);

  const metaStyle: React.CSSProperties = useMemo(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    fontSize: '12px',
    color: 'var(--text-color)'
  }), []);

  const categoryStyle: React.CSSProperties = useMemo(() => ({
    backgroundColor: 'var(--nav-active-bg)',
    color: 'var(--nav-active-border)',
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
    backgroundColor: 'var(--card-bg)',
    color: 'var(--text-color)',
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '11px'
  }), []);

  const highlightText = useCallback((text: string, query: string): React.ReactNode => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'var(--search-highlight)', fontWeight: '600' }}>
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
        <LoadingSpinner text="🔍 検索中..." size={50} />
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
      {results.map((item, index) => (
        <Card
          key={item.id}
          hoverable
          style={{
            marginBottom: 'clamp(12px, 3vw, 16px)',
            ...slideInUpAnimation(index * 0.1)
          }}
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
        </Card>
      ))}
      <style>
        {`
          @keyframes slideInUp {
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
});

export default SearchResults;