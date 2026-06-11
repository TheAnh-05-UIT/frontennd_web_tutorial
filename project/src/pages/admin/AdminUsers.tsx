import { useState } from 'react';
import { Search, MoreVertical, Shield, Mail, CalendarDays, Filter } from 'lucide-react';
import { Card, Badge, Button, SearchInput, Avatar } from '../../components/ui';

const mockUsers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'user', status: 'active', joined: '2025-01-15', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'user', status: 'active', joined: '2025-01-14', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'admin', status: 'active', joined: '2025-01-10', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { id: '4', name: 'David Brown', email: 'david@example.com', role: 'user', status: 'inactive', joined: '2025-01-08', avatar: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { id: '5', name: 'Eve Wilson', email: 'eve@example.com', role: 'user', status: 'active', joined: '2025-01-05', avatar: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=100' },
];

export function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'admin'>('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Users</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage platform users</p>
        </div>
        <Button>
          <Mail className="w-4 h-4" />
          Invite User
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <div className="flex gap-2">
            {(['all', 'user', 'admin'] as const).map(role => (
              <Button
                key={role}
                variant={roleFilter === role ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setRoleFilter(role)}
              >
                {role === 'all' ? 'All' : role.charAt(0).toUpperCase() + role.slice(1)}
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
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar src={user.avatar} alt={user.name} size="md" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={user.role === 'admin' ? 'primary' : 'secondary'}>
                      {user.role === 'admin' && <Shield className="w-3 h-3" />}
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={user.status === 'active' ? 'success' : 'warning'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.joined).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
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
