import './App.css';
import AppBar from './AppBar';

function App() {
  return (
    <div className="app">
      <AppBar title="My React App" />
      <main className="main-content">
        <h1>Hello World</h1>
        <button className="hover-button">
          Click Me!
        </button>
      </main>
    </div>
  );
}

export default App;