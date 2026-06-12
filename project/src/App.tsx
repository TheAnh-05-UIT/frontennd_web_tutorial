import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar, Footer } from './components/layout';
import { HomePage, TutorialsPage, TutorialDetailPage, ProjectsPage, ProjectDetailPage, RoadmapsPage, RoadmapDetailPage, AboutPage, RegisterPage } from './pages/public';
import { DashboardHome, DashboardLearning, DashboardTutorials, DashboardProjects, DashboardSettings } from './pages/user';
import { AdminOverview, AdminUsers, AdminTutorials, AdminProjects, AdminRoadmaps, AdminLogin, AdminSettings } from './pages/admin';
import { DashboardLayout } from './pages/DashboardLayout';
import { useAuth } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  const { viewMode, setViewMode } = useApp();
  const { isAuthenticated, role } = useAuth();

  if (viewMode === 'user' || viewMode === 'admin') {
    if (!isAuthenticated) {
      return <AdminLogin />;
    }

    if (viewMode === 'admin' && role !== 'ADMIN') {
      // Force user back to user dashboard if they are not an admin
      setTimeout(() => setViewMode('user'), 0);
      return null;
    }

    return (
      <Routes>
        <Route element={<DashboardLayout variant={viewMode} />}>
          {viewMode === 'admin' ? (
            <>
              <Route path="/admin" element={<AdminOverview />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/tutorials" element={<AdminTutorials />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/roadmaps" element={<AdminRoadmaps />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/*" element={<AdminOverview />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/dashboard/learning" element={<DashboardLearning />} />
              <Route path="/dashboard/tutorials" element={<DashboardTutorials />} />
              <Route path="/dashboard/projects" element={<DashboardProjects />} />
              <Route path="/dashboard/settings" element={<DashboardSettings />} />
              <Route path="/dashboard/*" element={<DashboardHome />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          )}
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/tutorials" element={<PublicLayout><TutorialsPage /></PublicLayout>} />
      <Route path="/tutorials/:id" element={<PublicLayout><TutorialDetailPage /></PublicLayout>} />
      <Route path="/projects" element={<PublicLayout><ProjectsPage /></PublicLayout>} />
      <Route path="/projects/:id" element={<PublicLayout><ProjectDetailPage /></PublicLayout>} />
      <Route path="/roadmaps" element={<PublicLayout><RoadmapsPage /></PublicLayout>} />
      <Route path="/roadmaps/:id" element={<PublicLayout><RoadmapDetailPage /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
