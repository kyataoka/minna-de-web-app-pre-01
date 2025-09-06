import React, { useState, useCallback, useEffect } from 'react';
import Navigation from './Navigation';
import HelloWorld from './HelloWorld';
import Modal from './Modal';
import Search from './Search';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prevMode => !prevMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.className = isDarkMode ? 'dark-mode' : '';
  }, [isDarkMode]);

  return (
    <div className="App">
      <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <HelloWorld />
      
      <Search />
      
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <button 
          onClick={openModal}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          モーダルを開く
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="サンプルモーダル"
      >
        <p>これはモーダルダイアログのサンプルです。</p>
        <p>オーバーレイをクリックするか、右上の×ボタンで閉じることができます。</p>
        <button 
          onClick={closeModal}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          閉じる
        </button>
      </Modal>
    </div>
  );
}

export default App;