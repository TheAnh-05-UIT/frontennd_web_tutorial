import { useState } from 'react';
import { Search, MoreVertical, Edit, Trash2, Eye, CheckCircle, Clock } from 'lucide-react';
import { Card, Badge, Button, SearchInput } from '../../components/ui';
import { tutorials } from '../../data';

const statusColors = {
  'Published': 'success',
  'Draft': 'warning',
  'Scheduled': 'primary',
} as const;

const mockArticles = tutorials.map(t => ({
  ...t,
  status: ['Published', 'Draft', 'Scheduled'][Math.floor(Math.random() * 3)] as 'Published' | 'Draft' | 'Scheduled',
}));

export function DashboardTutorials() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'Published' | 'Draft' | 'Scheduled'>('all');

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Tutorials</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your articles and tutorials</p>
        </div>
        <Button>+ New Article</Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <div className="flex gap-2">
            {(['all', 'Published', 'Draft', 'Scheduled'] as const).map(status => (
              <Button
                key={status}
                variant={selectedStatus === status ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedStatus(status)}
              >
                {status === 'all' ? 'All' : status}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Views</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredArticles.map(article => (
                <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img src={article.coverImage} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{article.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{article.readTime} min read</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="primary">{article.category}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Eye className="w-4 h-4" />
                      {(article.views / 1000).toFixed(1)}k
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={statusColors[article.status]}>{article.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(article.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
