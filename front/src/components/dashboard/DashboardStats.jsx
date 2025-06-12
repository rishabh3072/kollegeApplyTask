import { FileText, BarChart3, PieChart, User } from 'lucide-react';

export const DashboardStats = ({ filteredArticles }) => {
  const newsCount = filteredArticles.filter(a => a.type === 'news').length;
  const blogCount = filteredArticles.filter(a => a.type === 'blog').length;
  
  // Get unique authors, filtering out null/undefined
  const totalAuthors = new Set(
    filteredArticles
      .map(a => a.author)
      .filter(author => author)
  ).size;

  return (
    <div className="row g-4 mb-4">
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card shadow-sm border h-100">
          <div className="card-body d-flex align-items-center">
            <FileText className="text-primary me-3" size={24} />
            <div>
              <p className="text-muted mb-1 small">Total Articles</p>
              <h5 className="mb-0">{filteredArticles.length}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-3">
        <div className="card shadow-sm border h-100">
          <div className="card-body d-flex align-items-center">
            <BarChart3 className="text-success me-3" size={24} />
            <div>
              <p className="text-muted mb-1 small">News Articles</p>
              <h5 className="mb-0">{newsCount}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-3">
        <div className="card shadow-sm border h-100">
          <div className="card-body d-flex align-items-center">
            <PieChart className="text-purple me-3" size={24} />
            <div>
              <p className="text-muted mb-1 small">Blog Posts</p>
              <h5 className="mb-0">{blogCount}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-3">
        <div className="card shadow-sm border h-100">
          <div className="card-body d-flex align-items-center">
            <User className="text-warning me-3" size={24} />
            <div>
              <p className="text-muted mb-1 small">Authors</p>
              <h5 className="mb-0">{totalAuthors}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};