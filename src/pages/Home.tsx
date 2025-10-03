import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import Modal from '../components/Modal';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'info' | 'form' | 'confirm'>('info');

  const openModal = (type: 'info' | 'form' | 'confirm') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    alert('確認されました！');
    closeModal();
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'info':
        return (
          <div>
            <p>これは情報モーダルダイアログです。</p>
            <p>背景をクリックするかESCキーまたは×ボタンで閉じることができます。</p>
          </div>
        );
      case 'form':
        return (
          <div>
            <h3 style={{ marginTop: 0 }}>簡単なフォーム</h3>
            <form>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="name">名前:</label>
                <input 
                  type="text" 
                  id="name" 
                  style={{ 
                    width: '100%', 
                    padding: '0.5rem', 
                    marginTop: '0.25rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }} 
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="email">メール:</label>
                <input 
                  type="email" 
                  id="email" 
                  style={{ 
                    width: '100%', 
                    padding: '0.5rem', 
                    marginTop: '0.25rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }} 
                />
              </div>
              <button 
                type="button" 
                onClick={closeModal}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                送信
              </button>
            </form>
          </div>
        );
      case 'confirm':
        return (
          <div>
            <p>この操作を実行してもよろしいですか？</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button 
                onClick={closeModal}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                キャンセル
              </button>
              <button 
                onClick={handleConfirm}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                確認
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>ホームページ</h1>
      <p>React Routerを使用したホームページです。</p>
      <p>ナビゲーションバーから他のページに移動できます。</p>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>モーダルダイアログデモ</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <button 
            onClick={() => openModal('info')}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            情報モーダル
          </button>
          <button 
            onClick={() => openModal('form')}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            フォームモーダル
          </button>
          <button 
            onClick={() => openModal('confirm')}
            style={{
              backgroundColor: '#ffc107',
              color: '#212529',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            確認モーダル
          </button>
        </div>
      </div>

      <UserForm />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          modalType === 'info' ? '情報' :
          modalType === 'form' ? 'フォーム入力' :
          modalType === 'confirm' ? '確認' : undefined
        }
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Home;