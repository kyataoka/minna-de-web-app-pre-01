import React, { useState } from 'react';
import Modal from '../Modal';
import { Button } from '../components/ui';
import { fadeInUpAnimation } from '../utils';

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
      <div style={fadeInUpAnimation(0)}>
        <h1 style={{ fontSize: 'clamp(24px, 6vw, 32px)' }}>ホームページ</h1>
      </div>
      
      <div style={fadeInUpAnimation(0.2)}>
        <p>React Routerを使ったページ遷移のデモアプリケーションです。</p>
      </div>
      
      <div style={fadeInUpAnimation(0.4)}>
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
          ...fadeInUpAnimation(0.8)
        }}>
          <Button onClick={openModal} variant="primary" size="medium">
            基本のモーダルを開く
          </Button>

          <Button onClick={openInfoModal} variant="success" size="medium">
            情報モーダルを開く
          </Button>
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
          <Button onClick={closeModal} variant="primary" size="small">
            閉じる
          </Button>
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
            <Button onClick={closeInfoModal} variant="primary" size="small">
              了解
            </Button>
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