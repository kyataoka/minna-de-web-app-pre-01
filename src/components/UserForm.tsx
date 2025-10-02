import React, { useState } from 'react';
import './UserForm.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('フォームデータ:', formData);
    alert(`入力データ:\n名前: ${formData.name}\nメール: ${formData.email}\nメッセージ: ${formData.message}`);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="form-container">
      <h2>お問い合わせフォーム</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">お名前:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="お名前を入力してください"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">メールアドレス:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="example@email.com"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">メッセージ:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            placeholder="メッセージを入力してください"
            rows={5}
          />
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="submit-btn">送信</button>
          <button type="button" onClick={handleReset} className="reset-btn">リセット</button>
        </div>
      </form>
      
      <div className="form-data-display">
        <h3>現在の入力値:</h3>
        <p><strong>名前:</strong> {formData.name}</p>
        <p><strong>メール:</strong> {formData.email}</p>
        <p><strong>メッセージ:</strong> {formData.message}</p>
      </div>
    </div>
  );
};

export default UserForm;