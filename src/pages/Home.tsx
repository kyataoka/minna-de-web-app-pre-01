import { useState } from 'react';
import Modal from '../Modal';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<'small' | 'medium' | 'large'>('medium');

  const openModal = (size: 'small' | 'medium' | 'large' = 'medium') => {
    setModalSize(size);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="main-content">
      <h1>ホームページ</h1>
      <p>ようこそ！ボクのWebアプリケーションへ！</p>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        <button className="hover-button" onClick={() => openModal('small')}>
          小さなモーダル
        </button>
        <button className="hover-button" onClick={() => openModal('medium')}>
          中くらいのモーダル
        </button>
        <button className="hover-button" onClick={() => openModal('large')}>
          大きなモーダル
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="モーダルダイアログのデモ"
        size={modalSize}
      >
        <div>
          <p>これはモーダルダイアログのデモです。</p>
          <p>現在のサイズ: <strong>{modalSize === 'small' ? '小' : modalSize === 'medium' ? '中' : '大'}</strong></p>
          <ul>
            <li>背景をクリックして閉じることができます</li>
            <li>Escapeキーで閉じることができます</li>
            <li>×ボタンで閉じることができます</li>
            <li>スクロールが無効になります</li>
            <li>アニメーション付きで表示されます</li>
          </ul>
          <div style={{ marginTop: '2rem' }}>
            <button className="hover-button" onClick={closeModal}>
              閉じる
            </button>
          </div>
        </div>
      </Modal>
    </main>
  )
}

export default Home