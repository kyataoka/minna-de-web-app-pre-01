import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) return null;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    margin: '30px 0',
    padding: '20px 0'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 12px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#333',
    transition: 'all 0.2s ease',
    minWidth: '40px',
    textAlign: 'center'
  };

  const activeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#1976d2',
    color: '#fff',
    borderColor: '#1976d2',
    fontWeight: '600'
  };

  const disabledButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#f5f5f5',
    color: '#999',
    cursor: 'not-allowed',
    borderColor: '#eee'
  };

  const infoStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#666',
    margin: '0 15px'
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;
    
    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div style={containerStyle}>
      <button
        style={currentPage === 1 ? disabledButtonStyle : buttonStyle}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        onMouseEnter={(e) => {
          if (currentPage > 1) {
            e.currentTarget.style.backgroundColor = '#f0f8ff';
            e.currentTarget.style.borderColor = '#1976d2';
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage > 1) {
            e.currentTarget.style.backgroundColor = '#fff';
            e.currentTarget.style.borderColor = '#ddd';
          }
        }}
      >
        ← 前へ
      </button>

      {generatePageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === 'number' ? (
            <button
              style={page === currentPage ? activeButtonStyle : buttonStyle}
              onClick={() => onPageChange(page)}
              onMouseEnter={(e) => {
                if (page !== currentPage) {
                  e.currentTarget.style.backgroundColor = '#f0f8ff';
                  e.currentTarget.style.borderColor = '#1976d2';
                }
              }}
              onMouseLeave={(e) => {
                if (page !== currentPage) {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.borderColor = '#ddd';
                }
              }}
            >
              {page}
            </button>
          ) : (
            <span style={{ padding: '8px 4px', color: '#999' }}>...</span>
          )}
        </React.Fragment>
      ))}

      <button
        style={currentPage === totalPages ? disabledButtonStyle : buttonStyle}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        onMouseEnter={(e) => {
          if (currentPage < totalPages) {
            e.currentTarget.style.backgroundColor = '#f0f8ff';
            e.currentTarget.style.borderColor = '#1976d2';
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage < totalPages) {
            e.currentTarget.style.backgroundColor = '#fff';
            e.currentTarget.style.borderColor = '#ddd';
          }
        }}
      >
        次へ →
      </button>

      <div style={infoStyle}>
        {startItem}-{endItem} / {totalItems}件
      </div>
    </div>
  );
};

export default Pagination;