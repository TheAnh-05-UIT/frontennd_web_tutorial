import { BookOpen, Clock, CheckCircle, TrendingUp, Award, Target, ChevronRight } from 'lucide-react';
import { Card, Badge, Button, ProgressRing } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { tutorials, roadmaps } from '../../data';

const inProgressTutorials = tutorials.slice(0, 5).map(t => ({
  ...t,
  progress: Math.floor(Math.random() * 100),
  lastAccessed: ['2 hours ago', '1 day ago', '3 days ago', '1 week ago', '2 weeks ago'][Math.floor(Math.random() * 5)],
}));

const savedForLater = tutorials.slice(4, 7).map(t => ({
  ...t,
  savedDate: ['Yesterday', '3 days ago', '1 week ago'][Math.floor(Math.random() * 3)],
}));

const currentRoadmap = {
  ...roadmaps[0],
  completedSteps: 3,
  currentStep: roadmaps[0].steps[3],
};

export function DashboardLearning() {
  const { user } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Learning</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your progress and continue where you left off</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Total XP:</span>
          <Badge variant="accent" className="text-base px-3 py-1">
            <Award className="w-4 h-4" />
            2,450 XP
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-primary-600" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Current Roadmap</h2>
          </div>
          <div className="flex items-start gap-6">
            <ProgressRing progress={Math.round((currentRoadmap.completedSteps / currentRoadmap.steps.length) * 100)} size={100} />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{currentRoadmap.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{currentRoadmap.description}</p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500 dark:text-gray-400">Step {currentRoadmap.completedSteps + 1} of {currentRoadmap.steps.length}</span>
                  <span className="font-medium text-primary-600 dark:text-primary-400">{currentRoadmap.currentStep.title}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                    style={{ width: `${(currentRoadmap.completedSteps / currentRoadmap.steps.length) * 100}%` }}
                  />
                </div>
              </div>
              <Button size="sm" className="mt-4">
                Continue Learning
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-success-500" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Learning Stats</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <BookOpen className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Tutorials Completed</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{user?.coursesCompleted || 12}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-900/30">
                  <Clock className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Hours Learned</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">48h</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success-100 dark:bg-success-900/30">
                  <CheckCircle className="w-4 h-4 text-success-600 dark:text-success-400" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Concepts Mastered</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">156</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-600" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Continue Learning</h2>
          </div>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        <div className="space-y-4">
          {inProgressTutorials.map(tutorial => (
            <div key={tutorial.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer">
              <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 relative">
                <img src={tutorial.coverImage} alt="" className="w-full h-full object-cover" />
                {tutorial.progress === 100 && (
                  <div className="absolute inset-0 bg-success-500/80 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="primary" className="text-xs">{tutorial.category}</Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{tutorial.readTime} min</span>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {tutorial.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last accessed: {tutorial.lastAccessed}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{tutorial.progress}%</span>
                  <div className="w-24 h-2 mt-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${tutorial.progress === 100 ? 'bg-success-500' : 'bg-primary-500'}`}
                      style={{ width: `${tutorial.progress}%` }}
                    />
                  </div>
                </div>
                <Button size="sm" variant={tutorial.progress === 100 ? 'secondary' : 'primary'}>
                  {tutorial.progress === 100 ? 'Review' : 'Continue'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-secondary-600" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Saved for Later</h2>
          </div>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedForLater.map(tutorial => (
            <div key={tutorial.id} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors cursor-pointer group">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <img src={tutorial.coverImage} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <Badge variant="secondary" className="text-xs mb-1">{tutorial.category}</Badge>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {tutorial.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Saved {tutorial.savedDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-accent-600" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Achievements</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            { icon: '🔥', label: '7 Day Streak', description: 'Learn every day for a week' },
            { icon: '📚', label: 'Speed Reader', description: 'Completed 5 tutorials' },
            { icon: '🐳', label: 'Docker Pro', description: 'Mastered Docker basics' },
            { icon: '⚡', label: 'Quick Learner', description: 'Finished a tutorial in one day' },
          ].map((achievement, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-accent-50 to-warning-50 dark:from-accent-900/20 dark:to-warning-900/20 border border-accent-100 dark:border-accent-900/30">
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{achievement.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
