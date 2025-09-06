import React, { useState } from 'react';

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'お名前は必須項目です';
        }
        if (value.trim().length < 2) {
          return 'お名前は2文字以上で入力してください';
        }
        break;
      case 'email':
        if (!value.trim()) {
          return 'メールアドレスは必須項目です';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return '有効なメールアドレスを入力してください';
        }
        break;
      case 'message':
        if (!value.trim()) {
          return 'メッセージは必須項目です';
        }
        if (value.trim().length < 10) {
          return 'メッセージは10文字以上で入力してください';
        }
        break;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateAllFields = (): boolean => {
    const newErrors: ValidationErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName as keyof typeof formData]);
      if (error) {
        newErrors[fieldName as keyof ValidationErrors] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateAllFields()) {
      console.log('フォームデータ:', formData);
      alert('お問い合わせを送信しました！');
    } else {
      alert('入力内容にエラーがあります。確認してください。');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>お問い合わせ</h1>
      <p>お問い合わせはこちらから。</p>
      <form style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>お名前</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: `1px solid ${errors.name ? '#dc3545' : '#ccc'}`, 
              borderRadius: '4px' 
            }} 
          />
          {errors.name && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
              {errors.name}
            </div>
          )}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>メールアドレス</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: `1px solid ${errors.email ? '#dc3545' : '#ccc'}`, 
              borderRadius: '4px' 
            }} 
          />
          {errors.email && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
              {errors.email}
            </div>
          )}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>メッセージ</label>
          <textarea 
            id="message" 
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: `1px solid ${errors.message ? '#dc3545' : '#ccc'}`, 
              borderRadius: '4px',
              resize: 'vertical'
            }} 
          />
          {errors.message && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
              {errors.message}
            </div>
          )}
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