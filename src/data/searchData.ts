export interface SearchItem {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export const searchData: SearchItem[] = [
  {
    id: 1,
    title: "React基礎",
    content: "Reactは、ユーザーインターフェースを構築するためのJavaScriptライブラリです。コンポーネントベースの開発が可能で、再利用可能なUIパーツを作成できます。",
    category: "技術",
    tags: ["React", "JavaScript", "フロントエンド", "ライブラリ"]
  },
  {
    id: 2,
    title: "TypeScript入門",
    content: "TypeScriptは、JavaScriptに静的型付けを追加したプログラミング言語です。コードの品質向上と開発効率の向上が期待できます。",
    category: "技術",
    tags: ["TypeScript", "JavaScript", "型安全", "開発効率"]
  },
  {
    id: 3,
    title: "Node.js開発",
    content: "Node.jsは、サーバーサイドでJavaScriptを実行できる実行環境です。非同期処理が得意で、リアルタイムアプリケーションの開発に適しています。",
    category: "技術",
    tags: ["Node.js", "サーバーサイド", "JavaScript", "非同期"]
  },
  {
    id: 4,
    title: "CSS設計手法",
    content: "BEM、OOCSS、SMACSSなど、CSSを体系的に設計するための手法があります。保守性の高いスタイルシートを作成するのに役立ちます。",
    category: "デザイン",
    tags: ["CSS", "設計", "BEM", "保守性"]
  },
  {
    id: 5,
    title: "レスポンシブデザイン",
    content: "レスポンシブデザインは、様々なデバイスサイズに対応するWebデザイン手法です。メディアクエリやフレキシブルレイアウトを活用します。",
    category: "デザイン",
    tags: ["レスポンシブ", "CSS", "モバイル", "デザイン"]
  },
  {
    id: 6,
    title: "Git基本操作",
    content: "Gitはバージョン管理システムです。add、commit、pushなどの基本コマンドを覚えることで、効率的にソースコード管理ができます。",
    category: "ツール",
    tags: ["Git", "バージョン管理", "コマンド", "開発"]
  },
  {
    id: 7,
    title: "API設計のベストプラクティス",
    content: "RESTfulなAPI設計では、適切なHTTPメソッドの使用、一貫したURL構造、適切なステータスコードの返却が重要です。",
    category: "技術",
    tags: ["API", "REST", "設計", "HTTP"]
  },
  {
    id: 8,
    title: "データベース最適化",
    content: "データベースのパフォーマンス向上には、インデックスの適切な使用、クエリの最適化、正規化の適用が効果的です。",
    category: "データベース",
    tags: ["データベース", "最適化", "インデックス", "パフォーマンス"]
  },
  {
    id: 9,
    title: "セキュリティ対策",
    content: "Webアプリケーションでは、XSS、CSRF、SQLインジェクションなどの攻撃から守るための対策を講じることが重要です。",
    category: "セキュリティ",
    tags: ["セキュリティ", "XSS", "CSRF", "SQLインジェクション"]
  },
  {
    id: 10,
    title: "パフォーマンス最適化",
    content: "Webサイトの表示速度向上には、画像の最適化、コードの圧縮、キャッシュの活用、CDNの利用が効果的です。",
    category: "パフォーマンス",
    tags: ["パフォーマンス", "最適化", "速度", "CDN"]
  }
];

export interface FilterOptions {
  category?: string;
  tags?: string[];
}

const memoCache = new Map<string, SearchItem[]>();

export const getSearchResults = (query: string, filters?: FilterOptions): SearchItem[] => {
  const cacheKey = JSON.stringify({ query, filters });
  
  if (memoCache.has(cacheKey)) {
    return memoCache.get(cacheKey)!;
  }

  let results = searchData;

  if (filters?.category) {
    results = results.filter(item => item.category === filters.category);
  }

  if (filters?.tags && filters.tags.length > 0) {
    results = results.filter(item =>
      filters.tags!.some(tag => item.tags.includes(tag))
    );
  }

  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    results = results.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.content.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  if (memoCache.size > 50) {
    memoCache.clear();
  }
  memoCache.set(cacheKey, results);

  return results;
};