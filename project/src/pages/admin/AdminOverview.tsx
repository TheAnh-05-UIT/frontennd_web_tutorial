import { Users, BookOpen, FolderKanban, TrendingUp, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, StatCard, SimpleBarChart, DonutChart, Badge, Button } from '../../components/ui';
import { weeklyActivity, categoryDistribution, tutorials } from '../../data';

const adminStats = [
  { label: 'Total Users', value: '12,847', change: '+12.5%', positive: true },
  { label: 'Total Articles', value: '156', change: '+8.2%', positive: true },
  { label: 'Total Projects', value: '43', change: '+3.1%', positive: true },
  { label: 'Monthly Views', value: '89.2K', change: '-2.4%', positive: false },
];

const recentUsers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'user', joined: '2 hours ago', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'user', joined: '5 hours ago', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'admin', joined: '1 day ago', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100' },
];

const recentActivityAdmin = [
  { id: '1', action: 'New user registered', user: 'alice@example.com', time: '2 hours ago' },
  { id: '2', action: 'Article published', user: 'admin@devopsbuilder.io', time: '4 hours ago' },
  { id: '3', action: 'Project updated', user: 'bob@example.com', time: '6 hours ago' },
  { id: '4', action: 'Comment added', user: 'carol@example.com', time: '1 day ago' },
];

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Overview</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Admin dashboard overview</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">{stat.value}</p>
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.positive ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'}`}>
                {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-6">User Growth</h3>
          <SimpleBarChart data={weeklyActivity} height={200} />
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-6">Content Distribution</h3>
          <DonutChart data={categoryDistribution} size={180} />
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h3>
            <Button variant="ghost" size="sm">View all</Button>
          </div>
          <div className="space-y-4">
            {recentActivityAdmin.map(activity => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">by {activity.user}</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">New Users</h3>
            <Button variant="ghost" size="sm">View all</Button>
          </div>
          <div className="space-y-4">
            {recentUsers.map(user => (
              <div key={user.id} className="flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                </div>
                <Badge variant={user.role === 'admin' ? 'primary' : 'secondary'}>{user.role}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
