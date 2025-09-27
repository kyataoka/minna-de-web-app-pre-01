import { useState, type FormEvent } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
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
          />
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
          />
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
          ></textarea>
        </div>
        <br />
        <button type="submit" className="hover-button">送信</button>
      </form>
    </main>
  )
}

export default Contact