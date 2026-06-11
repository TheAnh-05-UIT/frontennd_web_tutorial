import { BookOpen, FolderKanban, Award, Flame, TrendingUp, Calendar, Clock } from 'lucide-react';
import { Card, StatCard, SimpleBarChart, DonutChart, Button, Badge } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { weeklyActivity, categoryDistribution, recentActivity, tutorials } from '../../data';

export function DashboardHome() {
  const { user } = useApp();

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p className="mt-1 text-primary-100">Continue your DevOps learning journey</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-300" />
            <span className="text-lg font-semibold">{user?.learningStreak} day streak!</span>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Award className="w-5 h-5" />}
          label="Courses Completed"
          value={user?.coursesCompleted || 0}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          icon={<BookOpen className="w-5 h-5" />}
          label="Articles Read"
          value={user?.articlesRead || 0}
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          icon={<FolderKanban className="w-5 h-5" />}
          label="Projects Finished"
          value={user?.projectsFinished || 0}
        />
        <StatCard
          icon={<Flame className="w-5 h-5" />}
          label="Learning Streak"
          value={`${user?.learningStreak || 0} days`}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Weekly Activity</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">This week</span>
          </div>
          <SimpleBarChart data={weeklyActivity} height={160} />
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Learning Distribution</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">By category</span>
          </div>
          <DonutChart data={categoryDistribution} size={160} />
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Recent Tutorials</h3>
              <Button variant="ghost" size="sm">View all</Button>
            </div>
            <div className="space-y-4">
              {tutorials.slice(0, 4).map((tutorial) => (
                <div key={tutorial.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <img src={tutorial.coverImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="primary" className="text-xs">{tutorial.category}</Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{tutorial.readTime} min</span>
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{tutorial.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{tutorial.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {Math.floor(Math.random() * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Upcoming Goals</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900/30">
                <p className="text-sm font-medium text-primary-700 dark:text-primary-300">Complete Docker Tutorial</p>
                <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">Due in 2 days</p>
              </div>
              <div className="p-3 rounded-xl bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-100 dark:border-secondary-900/30">
                <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Finish K8s Project</p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400 mt-1">Due in 5 days</p>
              </div>
              <div className="p-3 rounded-xl bg-accent-50 dark:bg-accent-900/20 border border-accent-100 dark:border-accent-900/30">
                <p className="text-sm font-medium text-accent-700 dark:text-accent-300">Read Terraform Guide</p>
                <p className="text-xs text-accent-600 dark:text-accent-400 mt-1">Due this week</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'tutorial' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' :
                      activity.type === 'project' ? 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400' :
                        activity.type === 'roadmap' ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400' :
                          'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400'
                    }`}>
                    {activity.type === 'tutorial' && <BookOpen className="w-4 h-4" />}
                    {activity.type === 'project' && <FolderKanban className="w-4 h-4" />}
                    {activity.type === 'roadmap' && <TrendingUp className="w-4 h-4" />}
                    {activity.type === 'certificate' && <Award className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{activity.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
