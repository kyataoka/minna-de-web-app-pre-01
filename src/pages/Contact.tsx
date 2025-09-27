import { useState, useEffect, useCallback, type FormEvent } from 'react'
import Modal from '../Modal'

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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
      } catch (error) {
        console.error('ローカルストレージからのデータ復元に失敗しました:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('contactFormData', JSON.stringify(formData))
  }, [formData])

  const validateField = useCallback((name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return '名前は必須項目です'
        if (value.trim().length < 2) return '名前は2文字以上で入力してください'
        return undefined
      case 'email': {
        if (!value.trim()) return 'メールアドレスは必須項目です'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return '正しいメールアドレスの形式で入力してください'
        return undefined
      }
      case 'message':
        if (!value.trim()) return 'メッセージは必須項目です'
        if (value.trim().length < 10) return 'メッセージは10文字以上で入力してください'
        return undefined
      default:
        return undefined
    }
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  }, [validateField])

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {}
    
    newErrors.name = validateField('name', formData.name)
    newErrors.email = validateField('email', formData.email)
    newErrors.message = validateField('message', formData.message)
    
    setErrors(newErrors)
    
    return !Object.values(newErrors).some(error => error !== undefined)
  }, [formData.name, formData.email, formData.message, validateField])

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      alert('入力内容にエラーがあります。確認してください。')
      return
    }
    
    setIsConfirmModalOpen(true)
  }, [validateForm])

  const handleConfirmSubmit = useCallback(() => {
    console.log('フォームデータ:', formData)
    setIsConfirmModalOpen(false)
    setIsSuccessModalOpen(true)
    
    setFormData({
      name: '',
      email: '',
      message: ''
    })
    localStorage.removeItem('contactFormData')
  }, [formData])


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

      {/* 送信確認モーダル */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="送信確認"
        size="medium"
      >
        <div>
          <p>以下の内容で送信しますか？</p>
          <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
            <p><strong>お名前:</strong> {formData.name}</p>
            <p><strong>メールアドレス:</strong> {formData.email}</p>
            <p><strong>メッセージ:</strong></p>
            <p style={{ whiteSpace: 'pre-wrap', marginLeft: '1rem' }}>{formData.message}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button 
              className="hover-button" 
              onClick={() => setIsConfirmModalOpen(false)}
              style={{ backgroundColor: '#6c757d' }}
            >
              キャンセル
            </button>
            <button className="hover-button" onClick={handleConfirmSubmit}>
              送信する
            </button>
          </div>
        </div>
      </Modal>

      {/* 送信完了モーダル */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="送信完了"
        size="small"
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', color: '#28a745', marginBottom: '1rem' }}>✓</div>
          <p>お問い合わせありがとうございます！</p>
          <p>内容を確認次第、ご連絡いたします。</p>
          <button 
            className="hover-button" 
            onClick={() => setIsSuccessModalOpen(false)}
            style={{ marginTop: '1rem' }}
          >
            閉じる
          </button>
        </div>
      </Modal>
    </main>
  )
}

export default Contact