import React, { useState } from 'react';
import { useBookmarks, useNotifications } from '../contexts/AppContext';
import { Button, Input, Card } from '../components/ui';

const Bookmarks: React.FC = () => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const { addNotification } = useNotifications();
  const [newBookmark, setNewBookmark] = useState({
    title: '',
    url: '',
    category: '',
  });
  const [filterCategory, setFilterCategory] = useState('');

  const categories = [...new Set(bookmarks.map(b => b.category))];
  const filteredBookmarks = filterCategory
    ? bookmarks.filter(b => b.category === filterCategory)
    : bookmarks;

  const handleAddBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookmark.title.trim() || !newBookmark.url.trim()) {
      addNotification({
        message: 'タイトルとURLを入力してください',
        type: 'error',
      });
      return;
    }

    try {
      new URL(newBookmark.url);
    } catch {
      addNotification({
        message: '正しいURL形式で入力してください',
        type: 'error',
      });
      return;
    }

    addBookmark({
      title: newBookmark.title,
      url: newBookmark.url,
      category: newBookmark.category || '未分類',
    });

    setNewBookmark({ title: '', url: '', category: '' });
    addNotification({
      message: 'ブックマークを追加しました',
      type: 'success',
    });
  };

  const handleRemoveBookmark = (id: string, title: string) => {
    removeBookmark(id);
    addNotification({
      message: `「${title}」を削除しました`,
      type: 'info',
    });
  };

  const handleOpenUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: 'clamp(16px, 4vw, 32px)',
      color: 'var(--text-color)',
    }}>
      <h1 style={{
        fontSize: 'clamp(24px, 5vw, 32px)',
        fontWeight: 'bold',
        marginBottom: 'clamp(16px, 4vw, 24px)',
        color: 'var(--primary-color)',
      }}>
        ブックマーク
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 'clamp(20px, 5vw, 32px)',
        '@media (min-width: 769px)': {
          gridTemplateColumns: '300px 1fr',
        },
      } as React.CSSProperties}>
        
        {/* 左側：ブックマーク追加フォーム */}
        <aside>
          <section style={{
            backgroundColor: 'var(--card-background)',
            padding: 'clamp(16px, 4vw, 24px)',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px',
          }}>
            <h2 style={{
              fontSize: 'clamp(18px, 4vw, 20px)',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'var(--text-color)',
            }}>
              ブックマーク追加
            </h2>
            <form onSubmit={handleAddBookmark} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              <Input
                label="タイトル"
                type="text"
                value={newBookmark.title}
                onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
                placeholder="ページタイトル"
                required
              />
              <Input
                label="URL"
                type="url"
                value={newBookmark.url}
                onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
                placeholder="https://example.com"
                required
              />
              <Input
                label="カテゴリ"
                type="text"
                value={newBookmark.category}
                onChange={(e) => setNewBookmark({ ...newBookmark, category: e.target.value })}
                placeholder="技術、ニュース、など"
              />
              <Button type="submit" variant="primary" size="small">
                追加
              </Button>
            </form>
          </section>

          {/* カテゴリフィルター */}
          <section style={{
            backgroundColor: 'var(--card-background)',
            padding: 'clamp(16px, 4vw, 24px)',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <h3 style={{
              fontSize: 'clamp(16px, 3vw, 18px)',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--text-color)',
            }}>
              カテゴリフィルター
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              <Button
                variant={filterCategory === '' ? 'primary' : 'outline'}
                size="small"
                onClick={() => setFilterCategory('')}
              >
                すべて ({bookmarks.length})
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={filterCategory === category ? 'primary' : 'outline'}
                  size="small"
                  onClick={() => setFilterCategory(category)}
                >
                  {category} ({bookmarks.filter(b => b.category === category).length})
                </Button>
              ))}
            </div>
          </section>
        </aside>

        {/* 右側：ブックマーク一覧 */}
        <main>
          {filteredBookmarks.length === 0 ? (
            <div style={{
              backgroundColor: 'var(--card-background)',
              padding: 'clamp(24px, 6vw, 48px)',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              color: 'var(--text-color)',
              opacity: 0.7,
            }}>
              <p style={{
                fontSize: 'clamp(16px, 4vw, 18px)',
                margin: 0,
              }}>
                {filterCategory ? `「${filterCategory}」カテゴリにブックマークがありません` : 'ブックマークがありません'}
              </p>
              {!filterCategory && (
                <p style={{
                  fontSize: 'clamp(14px, 3vw, 16px)',
                  margin: '8px 0 0 0',
                }}>
                  左側のフォームから新しいブックマークを追加してください
                </p>
              )}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}>
              {filteredBookmarks.map((bookmark) => (
                <Card
                  key={bookmark.id}
                  onClick={() => handleOpenUrl(bookmark.url)}
                  style={{
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    height: '100%',
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '8px',
                    }}>
                      <h3 style={{
                        fontSize: 'clamp(14px, 3vw, 16px)',
                        fontWeight: '600',
                        color: 'var(--text-color)',
                        margin: 0,
                        lineHeight: '1.3',
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}>
                        {bookmark.title}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveBookmark(bookmark.id, bookmark.title);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '16px',
                          cursor: 'pointer',
                          padding: '4px',
                          borderRadius: '4px',
                          color: 'var(--text-color)',
                          opacity: 0.6,
                          transition: 'all 0.2s ease',
                          flexShrink: 0,
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.opacity = '1';
                          e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                          e.currentTarget.style.color = '#ef4444';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.opacity = '0.6';
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--text-color)';
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                    <p style={{
                      fontSize: 'clamp(12px, 2.5vw, 14px)',
                      color: 'var(--text-color)',
                      opacity: 0.7,
                      margin: 0,
                      wordBreak: 'break-all',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {bookmark.url}
                    </p>
                    <span style={{
                      fontSize: 'clamp(11px, 2vw, 12px)',
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      alignSelf: 'flex-start',
                      marginTop: 'auto',
                    }}>
                      {bookmark.category}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Bookmarks;