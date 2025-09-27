import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import AppBar from './AppBar'
import { ThemeProvider } from './contexts/ThemeContext'

// 遅延読み込みでコンポーネントを最適化
const Home = lazy(() => import('./pages/Home'))
const Features = lazy(() => import('./pages/Features'))
const FeaturesAdvanced = lazy(() => import('./pages/FeaturesAdvanced'))
const FeaturesApi = lazy(() => import('./pages/FeaturesApi'))
const Contact = lazy(() => import('./pages/Contact'))
const SearchResults = lazy(() => import('./pages/SearchResults'))

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div>
          <AppBar title="Hello World App" />
          <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>読み込み中...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/features/advanced" element={<FeaturesAdvanced />} />
              <Route path="/features/api" element={<FeaturesApi />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App