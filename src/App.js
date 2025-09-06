import React from 'react';
import { AppProvider } from './context/AppContext';
import Navigation from './Navigation';
import HelloWorld from './HelloWorld';
import Modal from './Modal';
import Search from './Search';
import Button from './components/Button';
import { useModalState } from './hooks/useAppState';

function AppContent() {
  const { modalState, openModal, closeModal } = useModalState();

  const handleOpenModal = () => {
    openModal('サンプルモーダル', 
      <>
        <p>これはモーダルダイアログのサンプルです。</p>
        <p>オーバーレイをクリックするか、右上の×ボタンで閉じることができます。</p>
        <Button variant="success" onClick={closeModal} style={{ marginTop: '10px' }}>
          閉じる
        </Button>
      </>
    );
  };

  return (
    <div className="App">
      <Navigation />
      <HelloWorld />
      
      <Search />
      
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Button variant="primary" onClick={handleOpenModal}>
          モーダルを開く
        </Button>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
      >
        {modalState.content}
      </Modal>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;