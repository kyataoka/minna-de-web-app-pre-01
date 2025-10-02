import React from 'react';

const Contact: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Contactページ</h1>
      <p>お問い合わせはこちらから</p>
      <div style={{ marginTop: '1rem' }}>
        <p>📧 email: contact@example.com</p>
        <p>📞 電話: 123-456-7890</p>
        <p>🏢 住所: 東京都渋谷区</p>
      </div>
    </div>
  );
};

export default Contact;