import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppBar from './AppBar'
import Home from './pages/Home'
import Features from './pages/Features'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <div>
        <AppBar title="Hello World App" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App