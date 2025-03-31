import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import WalletPage from './pages/Wallet';
import PrivateRoute from './routes/PrivateRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/wallet"
        element={
          <PrivateRoute>
            <WalletPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
