import { User, Calendar, ArrowUpRight } from 'lucide-react';

export const ArticlesList = ({ filteredArticles }) => {
  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-primary mb-0">Latest News</h4>
        <small className="text-muted">{filteredArticles.length} articles found</small>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="row g-4">
          {filteredArticles.map((article, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                {/* Article Image */}
                {article.urlToImage && (
                  <div 
                    className="card-img-top ratio ratio-16x9 bg-light" 
                    style={{
                      backgroundImage: `url(${article.urlToImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="position-absolute top-0 end-0 m-2">
                      <span
                        className={`badge rounded-pill px-2 py-1 ${
                          article.type === 'news'
                            ? 'bg-primary bg-opacity-90 text-white'
                            : 'bg-success bg-opacity-90 text-white'
                        }`}
                        style={{ fontSize: '0.65rem' }}
                      >
                        {article.type}
                      </span>
                    </div>
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  {/* Source */}
                  <small className="text-muted mb-1 d-flex align-items-center">
                    <span className="text-truncate">
                      {article.source?.name || 'Unknown Source'}
                    </span>
                  </small>

                  {/* Title */}
                  <h6 className="card-title fw-bold mb-2 line-clamp-2" style={{ minHeight: '3em' }}>
                    {article.title}
                  </h6>

                  {/* Description */}
                  <p 
                    className="card-text text-muted small mb-3 line-clamp-2" 
                    style={{ fontSize: '0.85rem' }}
                  >
                    {article.description || 'No description available'}
                  </p>

                  {/* Footer with Meta Info */}
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2 text-muted small">
                        <span className="d-flex align-items-center">
                          <User size={12} className="me-1" />
                          <span style={{ fontSize: '0.75rem' }}>
                            {article.author?.split(',')[0]?.trim() || 'Unknown'}
                          </span>
                        </span>
                        <span className="d-flex align-items-center">
                          <Calendar size={12} className="me-1" />
                          <span style={{ fontSize: '0.75rem' }}>
                            {new Date(article.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </span>
                      </div>

                      {/* Read More Button */}
                      {article.url && (
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-link text-primary text-decoration-none p-0 d-flex align-items-center"
                          style={{ fontSize: '0.75rem' }}
                        >
                          Read <ArrowUpRight size={12} className="ms-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-5" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '0.5rem' }}>
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="text-muted mb-3"
          >
            <path d="M3 3L21 21M10 5a7 7 0 0 1 7 7m1 3a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9" />
          </svg>
          <h5 className="fw-medium mb-2">No articles found</h5>
          <p className="text-muted small mb-0">Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );
};