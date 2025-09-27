import AppBar from './AppBar'

function App() {
  return (
    <div>
      <AppBar title="Hello World App" />
      <main className="main-content">
        <h1>Hello World</h1>
        <button className="hover-button">クリックしてください</button>
      </main>
    </div>
  )
}

export default App