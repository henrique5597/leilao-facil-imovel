import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CitiesPage from "./pages/CitiesPage";
import CityDetails from "./pages/CityDetails";
import PropertyDetails from "./pages/PropertyDetails";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminPropertyForm from "./pages/admin/AdminPropertyForm";
import AdminCityForm from "./pages/admin/AdminCityForm";
import AdminMarketPriceForm from "./pages/admin/AdminMarketPriceForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/leilao-facil-imovel">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cidades" element={<CitiesPage />} />
              <Route path="/cidade/:id" element={<CityDetails />} />
              <Route path="/imovel/:id" element={<PropertyDetails />} />
              <Route path="/sobre" element={<AboutPage />} />
              
              {/* Rotas administrativas */}
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/imovel/novo" element={<AdminPropertyForm />} />
              <Route path="/admin/imovel/:id" element={<AdminPropertyForm />} />
              <Route path="/admin/cidade/nova" element={<AdminCityForm />} />
              <Route path="/admin/cidade/:id" element={<AdminCityForm />} />
              <Route path="/admin/preco-mercado/novo" element={<AdminMarketPriceForm />} />
              <Route path="/admin/preco-mercado/:id" element={<AdminMarketPriceForm />} />
              
              {/* Rota para página não encontrada */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
