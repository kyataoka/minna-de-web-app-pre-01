import React from 'react';
import UserForm from '../components/UserForm';

const Home: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>ホームページ</h1>
      <p>React Routerを使用したホームページです。</p>
      <p>ナビゲーションバーから他のページに移動できます。</p>
      <UserForm />
    </div>
  );
};

export default Home;