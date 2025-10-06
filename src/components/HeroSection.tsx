const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">iPhone 15 Pro</h1>
        <p className="hero-subtitle">Titanium. So strong. So light. So Pro.</p>
        <div className="hero-actions">
          <a href="/minna-de-web-app-pre-01/" className="btn-primary">Learn more</a>
          <a href="/minna-de-web-app-pre-01/" className="btn-secondary">Buy</a>
        </div>
      </div>
      <div className="hero-image">
        <div className="phone-mockup">
          <div className="phone-screen"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection