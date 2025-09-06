import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppBar from './AppBar'
import Navigation from './Navigation'
import PageTransition from './components/PageTransition'
import LoadingSpinner from './components/LoadingSpinner'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const SearchPage = lazy(() => import('./pages/SearchPage'))


function App() {
  return (
    <div>
      <AppBar title="React Router App" />
      <Navigation />
      <main>
        <PageTransition>
          <Suspense fallback={<LoadingSpinner text="ページを読み込み中..." />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </main>
    </div>
  )
}

export default App