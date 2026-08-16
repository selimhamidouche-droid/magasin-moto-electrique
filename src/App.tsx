import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage.tsx';
import LandingPage from './pages/LandingPage.tsx';
import ModelDetail from './pages/ModelDetail.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/catalogue" element={<LandingPage />} />
      <Route path="/membership" element={<Navigate to="/catalogue" replace />} />
      <Route path="/motos/:id" element={<ModelDetail />} />
      <Route path="/destinations/:id" element={<Navigate to="/catalogue" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
