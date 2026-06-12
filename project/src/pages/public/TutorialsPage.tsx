import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { TutorialCard } from '../../components/public';
import { Button, SearchInput, Badge } from '../../components/ui';
import type { Category, Tutorial } from '../../types';
import { api } from '../../services/api';

const categories: Category[] = ['DevOps', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Linux', 'Monitoring', 'Security'];

const categoryColors: Record<string, 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'> = {
  'DevOps': 'primary',
  'Docker': 'secondary',
  'Kubernetes': 'accent',
  'AWS': 'success',
  'Terraform': 'warning',
  'CI/CD': 'primary',
  'Linux': 'secondary',
  'Monitoring': 'accent',
  'Security': 'error',
};

export function TutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const data = await api.get<Tutorial[]>('/tutorials');
      setTutorials(data || []);
    } catch (error) {
      console.error('Failed to fetch tutorials:', error);
    }
  };


  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container-app py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Tutorials
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Learn DevOps through practical tutorials and hands-on guides
          </p>
        </div>
      </div>

      <div className="container-app py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Categories</h3>
                </div>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === 'all'
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                      }`}
                  >
                    All Categories
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${selectedCategory === category
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                        }`}
                    >
                      {category}
                      <span className="text-xs text-gray-400">
                        {tutorials.filter(t => t.category === category).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6">
              <SearchInput
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredTutorials.length} tutorials found
              </p>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {selectedCategory !== 'all' && (
                  <Badge
                    variant={categoryColors[selectedCategory] || 'primary'}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory('all')}
                  >
                    {selectedCategory}
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials.map(tutorial => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>

            {filteredTutorials.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  No tutorials found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="secondary" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
