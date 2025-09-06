import React from 'react';

const About: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>About</h1>
      <p>このアプリケーションについての情報です。</p>
      <p>React Router DOMを使用してSPA（Single Page Application）として実装されています。</p>
      <ul>
        <li>React 19</li>
        <li>React Router DOM v7</li>
        <li>TypeScript</li>
        <li>Vite</li>
      </ul>
    </div>
  );
};

export default About;