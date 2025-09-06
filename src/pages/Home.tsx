import React, { useState } from 'react';
import Modal from '../Modal';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openInfoModal = () => setIsInfoModalOpen(true);
  const closeInfoModal = () => setIsInfoModalOpen(false);

  return (
    <div style={{ 
      padding: 'clamp(15px, 4vw, 20px)', 
      backgroundColor: 'var(--bg-color)', 
      color: 'var(--text-color)', 
      minHeight: '100vh', 
      transition: 'background-color 0.3s ease, color 0.3s ease',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{
        animation: 'fadeInUp 0.8s ease-out forwards',
        opacity: 0,
        transform: 'translateY(30px)'
      }}>
        <h1 style={{ fontSize: 'clamp(24px, 6vw, 32px)' }}>ホームページ</h1>
      </div>
      
      <div style={{
        animation: 'fadeInUp 0.8s ease-out 0.2s forwards',
        opacity: 0,
        transform: 'translateY(30px)'
      }}>
        <p>React Routerを使ったページ遷移のデモアプリケーションです。</p>
      </div>
      
      <div style={{
        animation: 'fadeInUp 0.8s ease-out 0.4s forwards',
        opacity: 0,
        transform: 'translateY(30px)'
      }}>
        <p>ナビゲーションメニューから他のページに移動できます。</p>
      </div>
      
      <div style={{ 
        marginTop: '30px',
        animation: 'fadeInUp 0.8s ease-out 0.6s forwards',
        opacity: 0,
        transform: 'translateY(30px)'
      }}>
        <h2>モーダルダイアログのデモ</h2>
        <p>以下のボタンをクリックしてモーダルダイアログを表示できます。</p>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 'clamp(10px, 3vw, 15px)', 
          marginTop: 'clamp(15px, 4vw, 20px)',
          animation: 'fadeInUp 0.8s ease-out 0.8s forwards',
          opacity: 0,
          transform: 'translateY(30px)'
        }}>
          <button
            onClick={openModal}
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'white',
              border: 'none',
              padding: 'clamp(10px, 2.5vw, 12px) clamp(18px, 4vw, 24px)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: 'clamp(14px, 3vw, 16px)',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0, 123, 255, 0.2)',
              minWidth: 'clamp(140px, 30vw, 180px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--button-hover-bg)';
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.4)';
              e.currentTarget.style.filter = 'brightness(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--button-bg)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 123, 255, 0.2)';
              e.currentTarget.style.filter = 'brightness(1)';
            }}
          >
            基本のモーダルを開く
          </button>

          <button
            onClick={openInfoModal}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: 'clamp(10px, 2.5vw, 12px) clamp(18px, 4vw, 24px)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: 'clamp(14px, 3vw, 16px)',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(40, 167, 69, 0.2)',
              minWidth: 'clamp(140px, 30vw, 180px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1e7e34';
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
              e.currentTarget.style.filter = 'brightness(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#28a745';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(40, 167, 69, 0.2)';
              e.currentTarget.style.filter = 'brightness(1)';
            }}
          >
            情報モーダルを開く
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="基本のモーダル"
      >
        <p>これは基本的なモーダルダイアログです。</p>
        <p>以下の方法でモーダルを閉じることができます：</p>
        <ul>
          <li>右上の × ボタンをクリック</li>
          <li>Escキーを押す</li>
          <li>モーダルの外側をクリック</li>
        </ul>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button
            onClick={closeModal}
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            閉じる
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isInfoModalOpen}
        onClose={closeInfoModal}
        title="アプリケーション情報"
      >
        <div>
          <h3>このアプリケーションについて</h3>
          <p>このSPAは以下の技術で構築されています：</p>
          <ul>
            <li><strong>React</strong> - ユーザーインターフェース構築</li>
            <li><strong>React Router</strong> - ページ遷移機能</li>
            <li><strong>TypeScript</strong> - 型安全性の確保</li>
            <li><strong>Vite</strong> - 高速な開発環境</li>
          </ul>
          
          <h4>実装された機能</h4>
          <ul>
            <li>ページ遷移とナビゲーション</li>
            <li>フォーム入力とバリデーション</li>
            <li>ローカルストレージ機能</li>
            <li>モーダルダイアログ</li>
            <li>レスポンシブデザイン</li>
          </ul>

          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <button
              onClick={closeInfoModal}
              style={{
                backgroundColor: 'var(--button-bg)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              了解
            </button>
          </div>
        </div>
      </Modal>
      
      <style>
        {`
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;