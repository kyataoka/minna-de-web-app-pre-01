import React, { useCallback, useEffect } from 'react';
import Navigation from './Navigation';
import HelloWorld from './HelloWorld';
import Modal from './Modal';
import Search from './Search';
import Button from './components/Button';
import useLocalStorage from './hooks/useLocalStorage';
import useModal from './hooks/useModal';

function App() {
  const { isOpen: isModalOpen, openModal, closeModal } = useModal(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage('theme', false);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, [setIsDarkMode]);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : '';
  }, [isDarkMode]);

  return (
    <div className="App">
      <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <HelloWorld />
      
      <Search />
      
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Button variant="primary" onClick={openModal}>
          モーダルを開く
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="サンプルモーダル"
      >
        <p>これはモーダルダイアログのサンプルです。</p>
        <p>オーバーレイをクリックするか、右上の×ボタンで閉じることができます。</p>
        <Button variant="success" onClick={closeModal} style={{ marginTop: '10px' }}>
          閉じる
        </Button>
      </Modal>
    </div>
  );
}

export default App;