import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

export const AnalyticsCharts = ({ filteredArticles }) => {
  // Filter out articles without authors for the chart
  const articlesWithAuthors = filteredArticles.filter(article => article.author);
  
  const authorStats = articlesWithAuthors.reduce((acc, article) => {
    acc[article.author] = (acc[article.author] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(authorStats)
    .map(([author, count]) => ({
      author: author.length > 15 ? `${author.substring(0, 15)}...` : author,
      count,
      news: filteredArticles.filter(a => a.author === author && a.type === 'news').length,
      blogs: filteredArticles.filter(a => a.author === author && a.type === 'blog').length
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Limit to top 10 authors for better visualization

  const pieData = [
    { name: 'News', value: filteredArticles.filter(a => a.type === 'news').length },
    { name: 'Blogs', value: filteredArticles.filter(a => a.type === 'blog').length }
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="container my-4">
      <div className="row g-4">
        {/* Bar Chart */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Articles by Author (Top 10)</h5>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="author" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="news" stackId="a" fill="#8884d8" name="News" />
                    <Bar dataKey="blogs" stackId="a" fill="#82ca9d" name="Blogs" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Content Distribution</h5>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};