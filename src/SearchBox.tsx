import { useState, useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBoxProps {
  onSearch?: (query: string) => void;
}

const SearchBox = memo(function SearchBox({ onSearch }: SearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery.trim())
      }
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }, [searchQuery, onSearch, navigate])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="検索..."
          value={searchQuery}
          onChange={handleInputChange}
          className="search-input"
          aria-label="検索"
        />
        <button 
          type="submit" 
          className="search-button"
          aria-label="検索実行"
        >
          🔍
        </button>
      </div>
    </form>
  )
})

export default SearchBox