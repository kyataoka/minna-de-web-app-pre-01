
interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  if (totalPages <= 1) {
    return null
  }

  const getPageNumbers = () => {
    const pages: number[] = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, start + maxVisiblePages - 1)
      
      if (start > 1) {
        pages.push(1)
        if (start > 2) {
          pages.push(-1) // 省略記号を表す
        }
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push(-2) // 省略記号を表す
        }
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="pagination">
      <button
        className="pagination-button pagination-prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        前へ
      </button>
      
      <div className="pagination-numbers">
        {pageNumbers.map((page, index) => {
          if (page === -1 || page === -2) {
            return (
              <span key={index} className="pagination-ellipsis">
                ...
              </span>
            )
          }
          
          return (
            <button
              key={page}
              className={`pagination-button pagination-number ${
                currentPage === page ? 'active' : ''
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        })}
      </div>
      
      <button
        className="pagination-button pagination-next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        次へ
      </button>
      
      <div className="pagination-info">
        {totalItems}件中 {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)}件を表示
      </div>
    </div>
  )
}

export default Pagination