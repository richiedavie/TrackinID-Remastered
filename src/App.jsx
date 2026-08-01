import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import PlansPage from './pages/Plans';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Dashboard from './pages/Dashboard';
import BillingPage from './pages/Billing';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Features from './components/Features';
import DashboardHighlight from './components/DashboardHighlight';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';

import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <main>
                <Hero />
                <Features />
                <DashboardHighlight />
                <Benefits />
                <Testimonials />
                <Pricing />
                <FAQ />
              </main>
              <Footer />
            </>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;