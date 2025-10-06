import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ProductSection from './components/ProductSection'
import Footer from './components/Footer'
import './styles.css'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <ProductSection />
      </main>
      <Footer />
    </div>
  )
}

export default App