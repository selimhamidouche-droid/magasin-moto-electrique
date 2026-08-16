import { Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import MainPage from './pages/MainPage.tsx';
import CataloguePage from './pages/CataloguePage.tsx';
import ModelDetail from './pages/ModelDetail.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalogue" element={<CataloguePage />} />
        <Route path="/motos/:id" element={<ModelDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
