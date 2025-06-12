import { Search } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';

export const Filters = () => {
  const { filters, articles, updateFilters } = useAppContext();
  
  // Get all unique authors, filtering out null/undefined and trimming
  const authors = [...new Set(
    articles
      .map(article => article.author)
      .filter(author => author)
      .map(author => author.trim())
  )].sort();

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4">Filters & Search</h5>

        <div className="row g-3">
          {/* Search Input */}
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label">Search</label>
            <div className="position-relative">
              <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
              <input
                type="text"
                className="form-control ps-5"
                placeholder="Search articles..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
              />
            </div>
          </div>

          {/* Author Select */}
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label">Author</label>
            <select
              className="form-select"
              value={filters.author}
              onChange={(e) => updateFilters({ author: e.target.value })}
            >
              <option value="">All Authors</option>
              {authors.map(author => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>
          </div>

          {/* Type Select */}
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label">Type</label>
            <select
              className="form-select"
              value={filters.type}
              onChange={(e) => updateFilters({ type: e.target.value })}
            >
              <option value="all">All Types</option>
              <option value="news">News</option>
              <option value="blog">Blog</option>
            </select>
          </div>

          {/* Date Range Input */}
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label">Date Range</label>
            <input
              type="date"
              className="form-control"
              value={filters.dateRange.start}
              onChange={(e) =>
                updateFilters({
                  dateRange: { ...filters.dateRange, start: e.target.value }
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};