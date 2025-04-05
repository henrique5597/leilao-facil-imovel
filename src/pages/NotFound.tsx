
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="container-custom py-16 md:py-24 text-center">
      <h1 className="text-5xl font-bold mb-6 text-leilao-primary">404</h1>
      <p className="text-2xl font-semibold mb-4">Oops! Página não encontrada</p>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button asChild size="lg">
        <Link to="/" className="flex items-center">
          <Home className="mr-2 h-5 w-5" />
          Voltar para a Página Inicial
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
