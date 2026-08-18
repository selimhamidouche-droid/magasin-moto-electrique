import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';
import MainPage from './pages/MainPage.tsx';
import CataloguePage from './pages/CataloguePage.tsx';
import ModelDetail from './pages/ModelDetail.tsx';
import CategorieMotos from './pages/CategorieMotos.tsx';
import CategorieScooters from './pages/CategorieScooters.tsx';
import MarquePage from './pages/MarquePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import ComptePage from './pages/ComptePage.tsx';
import CartPage from './pages/CartPage.tsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.tsx';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/catalogue/motos" element={<CategorieMotos />} />
          <Route path="/catalogue/scooters" element={<CategorieScooters />} />
          <Route path="/marques/:slug" element={<MarquePage />} />
          <Route path="/motos/:id" element={<ModelDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/compte" element={<ComptePage />} />
          <Route path="/panier" element={<CartPage />} />
          <Route path="/commande-confirmee" element={<OrderConfirmationPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
