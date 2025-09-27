function FeaturesApi() {
  return (
    <div className="main-content">
      <h1>API機能</h1>
      <p>アプリケーションのAPI機能とデータ取得について説明します。</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>提供しているAPI</h2>
        <div style={{ marginTop: '1rem' }}>
          <h3>REST API</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li>GET /api/users - ユーザー一覧取得</li>
            <li>POST /api/users - ユーザー作成</li>
            <li>PUT /api/users/:id - ユーザー更新</li>
            <li>DELETE /api/users/:id - ユーザー削除</li>
          </ul>
        </div>
        
        <div style={{ marginTop: '1.5rem' }}>
          <h3>WebSocket API</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li>リアルタイム通知</li>
            <li>ライブチャット機能</li>
            <li>データの即座更新</li>
          </ul>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>認証機能</h3>
        <p>JWT トークンベースの認証システムを提供しています。</p>
      </div>
    </div>
  )
}

export default FeaturesApi