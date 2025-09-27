function Contact() {
  return (
    <main className="main-content">
      <h1>お問い合わせ</h1>
      <p>ご質問やご意見があれば、お気軽にお問い合わせくださいなのだ！</p>
      <form>
        <div>
          <label htmlFor="name">お名前:</label>
          <br />
          <input type="text" id="name" name="name" />
        </div>
        <br />
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <br />
          <input type="email" id="email" name="email" />
        </div>
        <br />
        <div>
          <label htmlFor="message">メッセージ:</label>
          <br />
          <textarea id="message" name="message" rows={5} cols={40}></textarea>
        </div>
        <br />
        <button type="submit" className="hover-button">送信</button>
      </form>
    </main>
  )
}

export default Contact