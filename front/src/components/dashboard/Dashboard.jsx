import { useEffect } from 'react'; 
import { useAppContext } from '../../hooks/useAppContext';
import { Header } from './Header';
import { Filters } from './Filters';
import { DashboardStats } from './DashboardStats';
import { AnalyticsCharts } from './AnalyticsCharts';
import { PayoutManagement } from './PayoutManagement';
import { ArticlesList } from './ArticlesList';

export const Dashboard = () => {
  const {
    articles,
    loading,
    error,
    filters,
    setArticles,
    setLoading,
    setError
  } = useAppContext();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=tesla&from=2025-05-11&sortBy=publishedAt&apiKey=2aae18fee9a6489e9f1926fceb54277b`
        );
        const data = await response.json();
        if (data.status === 'ok') {
          // Add a type property to each article for filtering purposes
          const articlesWithType = data.articles.map(article => ({
            ...article,
            type: Math.random() > 0.5 ? 'news' : 'blog' // Randomly assign type for demo
          }));
          setArticles(articlesWithType);
        } else {
          throw new Error(data.message || 'Failed to fetch news');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [setArticles, setLoading, setError]);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      !filters.search ||
      article.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      (article.description && article.description.toLowerCase().includes(filters.search.toLowerCase()));

    const matchesAuthor = !filters.author || 
      (article.author && article.author.toLowerCase().includes(filters.author.toLowerCase()));
    const matchesType = filters.type === 'all' || article.type === filters.type;
    const matchesDate =
      !filters.dateRange.start ||
      new Date(article.publishedAt) >= new Date(filters.dateRange.start);

    return matchesSearch && matchesAuthor && matchesType && matchesDate;
  });

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-secondary">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <p className="text-danger mb-4">Error loading articles: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <Header />

      <main className="container py-4">
        <Filters />

        <div className="mt-4">
          <DashboardStats filteredArticles={filteredArticles} />
          <AnalyticsCharts filteredArticles={filteredArticles} />
          <PayoutManagement filteredArticles={filteredArticles} />
          <div className="mt-4">
            <ArticlesList filteredArticles={filteredArticles} />
          </div>
        </div>
      </main>
    </div>
  );
};