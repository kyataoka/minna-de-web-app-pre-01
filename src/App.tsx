import { Routes, Route } from 'react-router-dom'
import AppBar from './AppBar'
import Navigation from './Navigation'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <div>
      <AppBar title="React Router App" />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App