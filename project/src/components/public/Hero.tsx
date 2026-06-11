import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FolderKanban, Map, Users, Infinity } from 'lucide-react';
import { Button } from '../ui';
import { stats } from '../../data';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950/30">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-secondary-200/30 dark:bg-secondary-900/20 rounded-full blur-3xl" />
      </div>

      <div className="container-app py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 dark:bg-primary-900/30 px-4 py-1.5 text-sm font-medium text-primary-700 dark:text-primary-300 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              New tutorials added weekly
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
              Learn <span className="text-gradient">DevOps</span>
              <br />
              From Zero To Production
            </h1>

            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
              Master CI/CD, Docker, Kubernetes, Terraform, AWS, Monitoring and Cloud Native technologies through practical tutorials and real-world projects.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/tutorials">
                <Button size="lg">
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/roadmaps">
                <Button variant="secondary" size="lg">
                  <Map className="w-4 h-4" />
                  View Roadmap
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl transform scale-110" />
              <div className="relative">
                <div className="flex items-center justify-center h-80 lg:h-96">
                  <div className="relative animate-pulse-slow">
                    <Infinity className="w-48 h-48 lg:w-64 lg:h-64 text-primary-600 dark:text-primary-400" strokeWidth={1.5} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-4">
                        {['Plan', 'Code', 'Build', 'Test', 'Deploy', 'Monitor'].map((phase, i) => (
                          <div
                            key={phase}
                            className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-xs font-medium text-gray-900 dark:text-gray-100 ${i < 3 ? '-rotate-6' : 'rotate-6'}`}
                          >
                            {phase}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatItem icon={<BookOpen className="w-5 h-5" />} label="Tutorials" value={`${stats.tutorials}+`} />
          <StatItem icon={<FolderKanban className="w-5 h-5" />} label="Projects" value={`${stats.projects}+`} />
          <StatItem icon={<Map className="w-5 h-5" />} label="Roadmaps" value={`${stats.roadmaps}+`} />
          <StatItem icon={<Users className="w-5 h-5" />} label="Learners" value={`${stats.learners.toLocaleString()}+`} />
        </div>
      </div>
    </section>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-2xl px-5 py-4 border border-gray-200 dark:border-gray-800">
      <div className="p-2 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
        {icon}
      </div>
      <div>
        <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
}
