import React, { useState } from 'react';
import { useUser, useNotifications } from '../contexts/AppContext';
import { Button, Input } from '../components/ui';

const Profile: React.FC = () => {
  const { user, login, logout, updateUser } = useUser();
  const { addNotification } = useNotifications();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });
  const [loginData, setLoginData] = useState({
    name: '',
    email: '',
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      addNotification({
        message: '名前とメールアドレスを入力してください',
        type: 'error',
      });
      return;
    }

    updateUser(formData);
    addNotification({
      message: 'プロフィールを更新しました',
      type: 'success',
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.name.trim() || !loginData.email.trim()) {
      addNotification({
        message: '名前とメールアドレスを入力してください',
        type: 'error',
      });
      return;
    }

    login(loginData.name, loginData.email);
    setFormData({
      name: loginData.name,
      email: loginData.email,
    });
    setLoginData({ name: '', email: '' });
    addNotification({
      message: 'ログインしました',
      type: 'success',
    });
  };

  const handleLogout = () => {
    logout();
    setFormData({ name: '', email: '' });
    addNotification({
      message: 'ログアウトしました',
      type: 'info',
    });
  };

  if (!user.isLoggedIn) {
    return (
      <div style={{
        maxWidth: '600px',
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
          ログイン
        </h1>

        <form onSubmit={handleLogin} style={{
          backgroundColor: 'var(--card-background)',
          padding: 'clamp(20px, 5vw, 32px)',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}>
            <Input
              label="名前"
              type="text"
              value={loginData.name}
              onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
              placeholder="お名前を入力してください"
              required
            />
            <Input
              label="メールアドレス"
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              placeholder="メールアドレスを入力してください"
              required
            />
            <Button type="submit" variant="primary">
              ログイン
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: 'clamp(16px, 4vw, 32px)',
      color: 'var(--text-color)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'clamp(16px, 4vw, 24px)',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <h1 style={{
          fontSize: 'clamp(24px, 5vw, 32px)',
          fontWeight: 'bold',
          color: 'var(--primary-color)',
          margin: 0,
        }}>
          プロフィール
        </h1>
        <Button variant="outline" onClick={handleLogout}>
          ログアウト
        </Button>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(20px, 5vw, 32px)',
      }}>
        {/* 現在の情報表示 */}
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
            現在の情報
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: 'clamp(14px, 3vw, 16px)',
          }}>
            <div>
              <strong>名前:</strong> {user.name}
            </div>
            <div>
              <strong>メールアドレス:</strong> {user.email}
            </div>
            <div>
              <strong>ログイン状態:</strong> 
              <span style={{
                color: user.isLoggedIn ? '#10b981' : '#ef4444',
                marginLeft: '8px',
              }}>
                {user.isLoggedIn ? 'ログイン中' : 'ログアウト中'}
              </span>
            </div>
          </div>
        </section>

        {/* プロフィール編集 */}
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
            プロフィール編集
          </h2>
          <form onSubmit={handleProfileUpdate} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}>
            <Input
              label="名前"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="お名前を入力してください"
              required
            />
            <Input
              label="メールアドレス"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="メールアドレスを入力してください"
              required
            />
            <Button type="submit" variant="primary">
              プロフィールを更新
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Profile;