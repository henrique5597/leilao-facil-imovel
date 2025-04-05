
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-leilao-primary text-white shadow-md">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Leilão Fácil Imóvel</Link>
          
          {/* Menu para desktop */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-leilao-secondary transition-colors">Início</Link>
            <Link to="/cidades" className="hover:text-leilao-secondary transition-colors">Cidades</Link>
            <Link to="/sobre" className="hover:text-leilao-secondary transition-colors">Sobre</Link>
            <Link to="/admin">
              <Button variant="outline" className="bg-white hover:bg-leilao-light text-leilao-primary">
                Área Administrativa
              </Button>
            </Link>
          </div>
          
          {/* Botão menu mobile */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Menu mobile */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="hover:text-leilao-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/cidades" 
              className="hover:text-leilao-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Cidades
            </Link>
            <Link 
              to="/sobre" 
              className="hover:text-leilao-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sobre
            </Link>
            <Link 
              to="/admin" 
              onClick={() => setIsOpen(false)}
            >
              <Button variant="outline" className="bg-white hover:bg-leilao-light text-leilao-primary w-full">
                Área Administrativa
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
