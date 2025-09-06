import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppBar from './AppBar'
import Navigation from './Navigation'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const SearchPage = lazy(() => import('./pages/SearchPage'))

const LoadingSpinner = React.memo(() => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    fontSize: '16px',
    color: '#666'
  }}>
    読み込み中...
  </div>
))

function App() {
  return (
    <div>
      <AppBar title="React Router App" />
      <Navigation />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App