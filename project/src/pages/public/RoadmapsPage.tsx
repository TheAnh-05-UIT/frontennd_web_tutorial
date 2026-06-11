import { useState, useEffect } from 'react';
import { RoadmapCard } from '../../components/public';
import { api } from '../../services/api';
import type { Roadmap } from '../../types';

export function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const data = await api.get<Roadmap[]>('/roadmaps');
        setRoadmaps(data || []);
      } catch (error) {
        console.error('Failed to fetch roadmaps:', error);
      }
    };
    fetchRoadmaps();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container-app py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Learning Roadmaps
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Structured paths to guide your DevOps career journey
          </p>
        </div>
      </div>

      <div className="container-app py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map(roadmap => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          More roadmaps coming soon!
        </div>
      </div>
    </div>
  );
}
