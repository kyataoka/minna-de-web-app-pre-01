import { useState, type FormEvent } from 'react'

interface ValidationErrors {
  name?: string
  email?: string
  message?: string
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<ValidationErrors>({})

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return '名前は必須項目です'
        if (value.trim().length < 2) return '名前は2文字以上で入力してください'
        return undefined
      case 'email':
        if (!value.trim()) return 'メールアドレスは必須項目です'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return '正しいメールアドレスの形式で入力してください'
        return undefined
      case 'message':
        if (!value.trim()) return 'メッセージは必須項目です'
        if (value.trim().length < 10) return 'メッセージは10文字以上で入力してください'
        return undefined
      default:
        return undefined
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}
    
    newErrors.name = validateField('name', formData.name)
    newErrors.email = validateField('email', formData.email)
    newErrors.message = validateField('message', formData.message)
    
    setErrors(newErrors)
    
    return !Object.values(newErrors).some(error => error !== undefined)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      alert('入力内容にエラーがあります。確認してください。')
      return
    }
    
    console.log('フォームデータ:', formData)
    alert(`お名前: ${formData.name}\nメール: ${formData.email}\nメッセージ: ${formData.message}`)
  }

  return (
    <main className="main-content">
      <h1>お問い合わせ</h1>
      <p>ご質問やご意見があれば、お気軽にお問い合わせくださいなのだ！</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">お名前:</label>
          <br />
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            style={{ borderColor: errors.name ? '#dc3545' : '' }}
          />
          {errors.name && <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.name}</div>}
        </div>
        <br />
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <br />
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            style={{ borderColor: errors.email ? '#dc3545' : '' }}
          />
          {errors.email && <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.email}</div>}
        </div>
        <br />
        <div>
          <label htmlFor="message">メッセージ:</label>
          <br />
          <textarea 
            id="message" 
            name="message" 
            rows={5} 
            cols={40}
            value={formData.message}
            onChange={handleChange}
            style={{ borderColor: errors.message ? '#dc3545' : '' }}
          ></textarea>
          {errors.message && <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.message}</div>}
        </div>
        <br />
        <button type="submit" className="hover-button">送信</button>
      </form>
    </main>
  )
}

export default Contact