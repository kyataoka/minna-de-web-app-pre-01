import { useState } from 'react'

function App() {
  const [isHovered, setIsHovered] = useState(false)

  const buttonStyle = {
    backgroundColor: isHovered ? '#0056b3' : '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isHovered 
      ? '0 4px 12px rgba(0, 123, 255, 0.3)' 
      : '0 2px 4px rgba(0, 123, 255, 0.2)',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    marginTop: '20px'
  }

  return (
    <div>
      <h1>Hello World</h1>
      <button 
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Click Me!
      </button>
    </div>
  )
}

export default App