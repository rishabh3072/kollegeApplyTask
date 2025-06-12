import { Download } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { useState } from 'react';

export const PayoutManagement = ({ filteredArticles }) => {
  const { user, payoutRates, setPayoutRates } = useAppContext();
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [newRate, setNewRate] = useState('');

  if (!user?.isAdmin) return null;

  // Filter out articles without authors for payout
  const articlesWithAuthors = filteredArticles.filter(article => article.author);
  
  const authorStats = articlesWithAuthors.reduce((acc, article) => {
    if (!acc[article.author]) {
      acc[article.author] = { news: 0, blogs: 0, total: 0 };
    }
    acc[article.author][article.type === 'news' ? 'news' : 'blogs']++;
    acc[article.author].total++;
    return acc;
  }, {});

  const updateRate = (author, rate) => {
    const updatedRates = { ...payoutRates, [author]: parseFloat(rate) };
    setPayoutRates(updatedRates);
    setEditingAuthor(null);
    setNewRate('');
  };

  const calculatePayout = (author, stats) => {
    const rate = payoutRates[author] || 0;
    return (stats.total * rate).toFixed(2);
  };

  const exportData = (format) => {
    const data = Object.entries(authorStats).map(([author, stats]) => ({
      author,
      articles: stats.total,
      rate: payoutRates[author] || 0,
      payout: calculatePayout(author, stats)
    }));

    if (format === 'csv') {
      const csv = [
        'Author,Articles,Rate,Payout',
        ...data.map(row => `"${row.author}",${row.articles},${row.rate},${row.payout}`)
      ].join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'payout-report.csv';
      a.click();
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Payout Management</h5>
          <button onClick={() => exportData('csv')} className="btn btn-outline-secondary btn-sm d-flex align-items-center">
            <Download size={16} className="me-2" />
            Export CSV
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Author</th>
                <th>Articles</th>
                <th>Rate per Article</th>
                <th>Total Payout</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(authorStats).map(([author, stats]) => (
                <tr key={author}>
                  <td><strong>{author}</strong></td>
                  <td>{stats.total}</td>
                  <td>
                    {editingAuthor === author ? (
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="number"
                          className="form-control form-control-sm w-auto"
                          value={newRate}
                          onChange={(e) => setNewRate(e.target.value)}
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                        />
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => updateRate(author, newRate)}
                          disabled={!newRate || isNaN(newRate)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setEditingAuthor(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span>${payoutRates[author] || 0}</span>
                    )}
                  </td>
                  <td>
                    <span className="fw-semibold text-success">
                      ${calculatePayout(author, stats)}
                    </span>
                  </td>
                  <td>
                    {editingAuthor !== author && (
                      <button
                        className="btn btn-link btn-sm text-primary"
                        onClick={() => {
                          setEditingAuthor(author);
                          setNewRate(payoutRates[author] || '');
                        }}
                      >
                        Edit Rate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};