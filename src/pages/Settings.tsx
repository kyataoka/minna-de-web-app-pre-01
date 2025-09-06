import React from 'react';
import { useSettings, useNotifications, useSearchHistory, useBookmarks } from '../contexts/AppContext';
import { Button } from '../components/ui';

const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const { addNotification, clearNotifications } = useNotifications();
  const { clearSearchHistory } = useSearchHistory();
  const { bookmarks } = useBookmarks();

  const handleLanguageChange = (language: 'ja' | 'en') => {
    updateSettings({ language });
    addNotification({
      message: language === 'ja' ? '言語設定を日本語に変更しました' : 'Language changed to English',
      type: 'success',
    });
  };

  const handleEmailNotificationsToggle = () => {
    const newValue = !settings.emailNotifications;
    updateSettings({ emailNotifications: newValue });
    addNotification({
      message: newValue ? 'メール通知を有効にしました' : 'メール通知を無効にしました',
      type: 'info',
    });
  };

  const handleAutoSaveToggle = () => {
    const newValue = !settings.autoSave;
    updateSettings({ autoSave: newValue });
    addNotification({
      message: newValue ? '自動保存を有効にしました' : '自動保存を無効にしました',
      type: 'info',
    });
  };

  const handleClearSearchHistory = () => {
    clearSearchHistory();
    addNotification({
      message: '検索履歴をクリアしました',
      type: 'success',
    });
  };

  const handleTestNotification = () => {
    addNotification({
      message: 'これはテスト通知です。通知システムが正常に動作しています。',
      type: 'info',
    });
  };

  return (
    <div style={{
      maxWidth: '800px',
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
        設定
      </h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(20px, 5vw, 32px)',
      }}>
        {/* 言語設定 */}
        <section style={{
          backgroundColor: 'var(--card-background)',
          padding: 'clamp(16px, 4vw, 24px)',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <h2 style={{
            fontSize: 'clamp(18px, 4vw, 24px)',
            fontWeight: '600',
            marginBottom: '16px',
            color: 'var(--text-color)',
          }}>
            言語設定
          </h2>
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            <Button
              variant={settings.language === 'ja' ? 'primary' : 'outline'}
              onClick={() => handleLanguageChange('ja')}
            >
              日本語
            </Button>
            <Button
              variant={settings.language === 'en' ? 'primary' : 'outline'}
              onClick={() => handleLanguageChange('en')}
            >
              English
            </Button>
          </div>
        </section>

        {/* 通知設定 */}
        <section style={{
          backgroundColor: 'var(--card-background)',
          padding: 'clamp(16px, 4vw, 24px)',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <h2 style={{
            fontSize: 'clamp(18px, 4vw, 24px)',
            fontWeight: '600',
            marginBottom: '16px',
            color: 'var(--text-color)',
          }}>
            通知設定
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              fontSize: 'clamp(14px, 3vw, 16px)',
            }}>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={handleEmailNotificationsToggle}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--primary-color)',
                }}
              />
              メール通知を受け取る
            </label>
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
            }}>
              <Button
                variant="outline"
                onClick={handleTestNotification}
              >
                テスト通知を送信
              </Button>
              <Button
                variant="outline"
                onClick={clearNotifications}
              >
                通知をクリア
              </Button>
            </div>
          </div>
        </section>

        {/* アプリケーション設定 */}
        <section style={{
          backgroundColor: 'var(--card-background)',
          padding: 'clamp(16px, 4vw, 24px)',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <h2 style={{
            fontSize: 'clamp(18px, 4vw, 24px)',
            fontWeight: '600',
            marginBottom: '16px',
            color: 'var(--text-color)',
          }}>
            アプリケーション設定
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              fontSize: 'clamp(14px, 3vw, 16px)',
            }}>
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={handleAutoSaveToggle}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--primary-color)',
                }}
              />
              自動保存を有効にする
            </label>
          </div>
        </section>

        {/* データ管理 */}
        <section style={{
          backgroundColor: 'var(--card-background)',
          padding: 'clamp(16px, 4vw, 24px)',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <h2 style={{
            fontSize: 'clamp(18px, 4vw, 24px)',
            fontWeight: '600',
            marginBottom: '16px',
            color: 'var(--text-color)',
          }}>
            データ管理
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <div style={{
              fontSize: 'clamp(14px, 3vw, 16px)',
              opacity: 0.8,
            }}>
              <p style={{ margin: '4px 0' }}>ブックマーク: {bookmarks.length}件</p>
            </div>
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
            }}>
              <Button
                variant="danger"
                onClick={handleClearSearchHistory}
              >
                検索履歴をクリア
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;