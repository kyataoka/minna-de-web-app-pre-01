const ProductSection = () => {
  const products = [
    {
      id: 1,
      name: 'MacBook Air',
      subtitle: 'Lean. Mean. M3 machine.',
      image: 'macbook',
      isNew: true
    },
    {
      id: 2,
      name: 'iPad Pro',
      subtitle: 'Unbelievably thin. Incredibly powerful.',
      image: 'ipad',
      isNew: false
    },
    {
      id: 3,
      name: 'Apple Watch Series 9',
      subtitle: 'Smarter. Brighter. Mightier.',
      image: 'watch',
      isNew: false
    },
    {
      id: 4,
      name: 'AirPods Pro',
      subtitle: 'Adaptive Audio. Now playing.',
      image: 'airpods',
      isNew: false
    }
  ]

  return (
    <section className="products">
      <div className="container">
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.isNew && <span className="product-badge">New</span>}
              <div className="product-image">
                <div className={`product-mockup ${product.image}`}></div>
              </div>
              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-subtitle">{product.subtitle}</p>
                <div className="product-actions">
                  <a href="/minna-de-web-app-pre-01/" className="link-primary">Learn more</a>
                  <a href="/minna-de-web-app-pre-01/" className="link-secondary">Buy</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductSection