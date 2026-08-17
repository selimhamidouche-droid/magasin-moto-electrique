import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage.tsx';
import CataloguePage from './pages/CataloguePage.tsx';
import ModelDetail from './pages/ModelDetail.tsx';
import CategorieMotos from './pages/CategorieMotos.tsx';
import CategorieScooters from './pages/CategorieScooters.tsx';
import MarquePage from './pages/MarquePage.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/catalogue" element={<CataloguePage />} />
      <Route path="/catalogue/motos" element={<CategorieMotos />} />
      <Route path="/catalogue/scooters" element={<CategorieScooters />} />
      <Route path="/marques/:slug" element={<MarquePage />} />
      <Route path="/motos/:id" element={<ModelDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
