import React from 'react';

const About: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Aboutページ</h1>
      <p>このアプリケーションについて</p>
      <ul>
        <li>React + TypeScript</li>
        <li>Vite</li>
        <li>React Router</li>
        <li>レスポンシブデザイン</li>
      </ul>
    </div>
  );
};

export default About;