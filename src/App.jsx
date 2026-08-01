import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import PlansPage from './pages/Plans';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Dashboard from './pages/Dashboard';
import BillingPage from './pages/Billing';
import ProtectedRoute from './components/ProtectedRoute';
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/plans" element={
            <ProtectedRoute requirePlan={false}>
              <PlansPage />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute requirePlan={false}>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/checkout/success" element={
            <ProtectedRoute requirePlan={false}>
              <CheckoutSuccess />
            </ProtectedRoute>
          } />
          <Route path="/billing" element={
            <ProtectedRoute requirePlan={false}>
              <BillingPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/*" element={
            <ProtectedRoute requirePlan={true}>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;