import React, { useState, useEffect } from 'react';
import './UserForm.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  // ローカルストレージのキー
  const STORAGE_KEY = 'userFormData';

  // ローカルストレージに保存する関数
  const saveToLocalStorage = (data: FormData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('ローカルストレージへの保存に失敗しました:', error);
    }
  };

  // ローカルストレージから読み込む関数
  const loadFromLocalStorage = (): FormData | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('ローカルストレージからの読み込みに失敗しました:', error);
    }
    return null;
  };

  // コンポーネント初期化時にローカルストレージから復元
  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return '名前は必須項目です';
        if (value.trim().length < 2) return '名前は2文字以上で入力してください';
        if (value.trim().length > 50) return '名前は50文字以下で入力してください';
        if (!/^[a-zA-Zひらがなカタカナ漢字\s]+$/.test(value.trim())) return '名前には英字、ひらがな、カタカナ、漢字のみ使用できます';
        break;
      case 'email':
        if (!value.trim()) return 'メールアドレスは必須項目です';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return '正しいメールアドレスの形式で入力してください';
        if (value.length > 254) return 'メールアドレスは254文字以下で入力してください';
        break;
      case 'message':
        if (!value.trim()) return 'メッセージは必須項目です';
        if (value.trim().length < 10) return 'メッセージは10文字以上で入力してください';
        if (value.trim().length > 1000) return 'メッセージは1000文字以下で入力してください';
        break;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    const newFormData = {
      ...formData,
      [name]: value
    };
    
    setFormData(newFormData);
    
    // ローカルストレージに保存
    saveToLocalStorage(newFormData);

    // リアルタイムバリデーション
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateAllFields = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof ValidationErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAllFields()) {
      alert('入力項目にエラーがあります。確認してください。');
      return;
    }

    console.log('フォームデータ:', formData);
    alert(`入力データ:\n名前: ${formData.name}\nメール: ${formData.email}\nメッセージ: ${formData.message}`);
  };

  const handleReset = () => {
    const emptyFormData = {
      name: '',
      email: '',
      message: ''
    };
    
    setFormData(emptyFormData);
    setErrors({});
    
    // ローカルストレージからも削除
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('ローカルストレージからの削除に失敗しました:', error);
    }
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
            className={errors.name ? 'error' : ''}
            placeholder="お名前を入力してください"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">メールアドレス:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
            placeholder="example@email.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="message">メッセージ:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className={errors.message ? 'error' : ''}
            placeholder="メッセージを入力してください"
            rows={5}
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>
        
        <div className="form-buttons">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={Object.keys(errors).some(key => errors[key as keyof ValidationErrors])}
          >
            送信
          </button>
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