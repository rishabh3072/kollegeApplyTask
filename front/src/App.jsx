import { useAppContext } from './hooks/useAppContext';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';

const App = () => {
  const { isAuthenticated } = useAppContext();

  return isAuthenticated ? <DashboardPage /> : <LoginPage />;
};
export default App;