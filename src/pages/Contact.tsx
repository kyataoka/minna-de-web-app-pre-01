import React, { useState, useEffect } from 'react';
import { Input, TextArea, Button } from '../components/ui';
import { saveToLocalStorage, loadFromLocalStorage, validateField, VALIDATION_RULES } from '../utils';

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

  useEffect(() => {
    const savedFormData = loadFromLocalStorage<typeof formData>('contactFormData');
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  const validationRules = {
    name: VALIDATION_RULES.NAME,
    email: VALIDATION_RULES.EMAIL,
    message: VALIDATION_RULES.MESSAGE
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);
    
    saveToLocalStorage('contactFormData', newFormData);

    const error = validateField(name, value, validationRules);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateAllFields = (): boolean => {
    const newErrors: ValidationErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName as keyof typeof formData], validationRules);
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
      setFormData({ name: '', email: '', message: '' });
      saveToLocalStorage('contactFormData', { name: '', email: '', message: '' });
    } else {
      alert('入力内容にエラーがあります。確認してください。');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>お問い合わせ</h1>
      <p>お問い合わせはこちらから。</p>
      <form style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
        <Input
          type="text"
          id="name"
          name="name"
          label="お名前"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          required
        />
        <Input
          type="email"
          id="email"
          name="email"
          label="メールアドレス"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
        />
        <TextArea
          id="message"
          name="message"
          label="メッセージ"
          value={formData.message}
          onChange={handleInputChange}
          error={errors.message}
          rows={5}
          required
        />
        <Button variant="primary" size="medium" onClick={(e) => { e.preventDefault(); handleSubmit(e as any); }}>
          送信
        </Button>
      </form>
    </div>
  );
};

export default Contact;