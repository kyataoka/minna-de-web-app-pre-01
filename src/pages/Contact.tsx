import React from 'react';

const Contact: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>お問い合わせ</h1>
      <p>お問い合わせはこちらから。</p>
      <form style={{ maxWidth: '500px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>お名前</label>
          <input 
            type="text" 
            id="name" 
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }} 
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>メールアドレス</label>
          <input 
            type="email" 
            id="email" 
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }} 
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>メッセージ</label>
          <textarea 
            id="message" 
            rows={5}
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              resize: 'vertical'
            }} 
          />
        </div>
        <button 
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          送信
        </button>
      </form>
    </div>
  );
};

export default Contact;