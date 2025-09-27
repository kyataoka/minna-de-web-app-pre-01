import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

interface SearchResult {
  id: string;
  title: string;
  content: string;
  path: string;
}

const searchData: SearchResult[] = [
  {
    id: '1',
    title: 'ホーム',
    content: 'ホームページへようこそ。このアプリケーションの基本的な機能を紹介しています。',
    path: '/'
  },
  {
    id: '2',
    title: '機能一覧',
    content: 'アプリケーションの機能一覧です。基本的な機能から高度な機能まで幅広く提供しています。',
    path: '/features'
  },
  {
    id: '3',
    title: '高度な機能',
    content: '高度な機能ページです。プロフェッショナルユーザー向けの機能を紹介しています。',
    path: '/features/advanced'
  },
  {
    id: '4',
    title: 'API機能',
    content: 'API機能のページです。開発者向けのAPI仕様と使用方法を説明しています。',
    path: '/features/api'
  },
  {
    id: '5',
    title: 'お問い合わせ',
    content: 'お問い合わせページです。ご質問やご要望がございましたらこちらからご連絡ください。',
    path: '/contact'
  },
  {
    id: '6',
    title: 'モーダル機能',
    content: 'モーダルダイアログ機能。ユーザーインターフェースを向上させる重要な機能です。',
    path: '/'
  },
  {
    id: '7',
    title: 'ナビゲーション',
    content: 'レスポンシブ対応のナビゲーションシステム。ハンバーガーメニューとドロップダウンメニュー機能付き。',
    path: '/'
  },
  {
    id: '8',
    title: 'フォーム機能',
    content: 'バリデーション機能付きのフォーム。リアルタイムエラーチェックとローカルストレージ保存機能。',
    path: '/contact'
  }
]

function SearchResults() {
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)
  const query = searchParams.get('q') || ''

  useEffect(() => {
    const performSearch = () => {
      setLoading(true)
      
      if (!query.trim()) {
        setResults([])
        setLoading(false)
        return
      }

      // 検索を実行（タイトルと内容で検索）
      const searchResults = searchData.filter(item => {
        const searchText = query.toLowerCase()
        return (
          item.title.toLowerCase().includes(searchText) ||
          item.content.toLowerCase().includes(searchText)
        )
      })

      // 検索結果の関連度によるソート（タイトルマッチを優先）
      searchResults.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(query.toLowerCase())
        const bTitle = b.title.toLowerCase().includes(query.toLowerCase())
        
        if (aTitle && !bTitle) return -1
        if (!aTitle && bTitle) return 1
        return 0
      })

      setResults(searchResults)
      setLoading(false)
    }

    // 実際の検索のような遅延を模擬
    const searchTimeout = setTimeout(performSearch, 300)
    
    return () => clearTimeout(searchTimeout)
  }, [query])

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text
    
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <mark key={index} className="search-highlight">{part}</mark> : 
        part
    )
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="search-results">
          <h1>検索中...</h1>
          <div className="loading-spinner">🔄</div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="search-results">
        <h1>検索結果</h1>
        
        {query && (
          <p className="search-query">
            「<strong>{query}</strong>」の検索結果: {results.length}件
          </p>
        )}

        {!query ? (
          <div className="no-query">
            <p>検索キーワードを入力してください。</p>
          </div>
        ) : results.length === 0 ? (
          <div className="no-results">
            <p>「{query}」に一致する結果が見つかりませんでした。</p>
            <div className="search-tips">
              <h3>検索のヒント:</h3>
              <ul>
                <li>キーワードを変更してみてください</li>
                <li>より一般的な用語を使用してみてください</li>
                <li>スペルが正しいか確認してください</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="results-list">
            {results.map((result) => (
              <div key={result.id} className="result-item">
                <h3 className="result-title">
                  <Link to={result.path}>
                    {highlightText(result.title, query)}
                  </Link>
                </h3>
                <p className="result-content">
                  {highlightText(result.content, query)}
                </p>
                <p className="result-path">
                  <Link to={result.path} className="result-link">
                    {window.location.origin}{result.path}
                  </Link>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults