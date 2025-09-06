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
    gap: 'clamp(4px, 2vw, 8px)',
    margin: 'clamp(20px, 5vw, 30px) 0',
    padding: 'clamp(15px, 4vw, 20px) 0',
    flexWrap: 'wrap'
  };

  const buttonStyle: React.CSSProperties = {
    padding: 'clamp(6px, 2vw, 8px) clamp(10px, 2.5vw, 12px)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--card-bg)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: 'clamp(12px, 3vw, 14px)',
    color: 'var(--text-color)',
    transition: 'all 0.2s ease',
    minWidth: 'clamp(32px, 8vw, 40px)',
    textAlign: 'center'
  };

  const activeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: 'var(--nav-active-border)',
    color: '#fff',
    borderColor: 'var(--nav-active-border)',
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
    fontSize: 'clamp(12px, 3vw, 14px)',
    color: 'var(--text-color)',
    opacity: 0.7,
    margin: '0 clamp(10px, 3vw, 15px)'
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