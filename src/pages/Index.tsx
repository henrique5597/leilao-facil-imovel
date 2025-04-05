
import { Link } from "react-router-dom";
import { ArrowRight, Building, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CityCard from "@/components/CityCard";
import PropertyCard from "@/components/PropertyCard";
import { mockCities, mockProperties } from "@/data/mockData";

const Index = () => {
  // Selecionamos algumas cidades e imóveis em destaque para a página inicial
  const featuredCities = mockCities.slice(0, 3);
  const featuredProperties = mockProperties.slice(0, 4);

  return (
    <main>
      {/* Hero section */}
      <section className="bg-leilao-primary text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Encontre Imóveis em Leilão da Caixa Econômica Federal
            </h1>
            <p className="text-lg mb-8 text-white/90">
              Oportunidades únicas com descontos significativos. Compare com os preços do mercado 
              e faça o melhor negócio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-leilao-primary hover:bg-leilao-light">
                <Link to="/cidades">
                  <Building className="mr-2 h-5 w-5" />
                  Explorar Cidades
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-leilao-dark">
                <Link to="/sobre">
                  <Search className="mr-2 h-5 w-5" />
                  Como Funciona
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cidades em destaque */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Cidades em Destaque</h2>
            <Link to="/cidades" className="text-leilao-primary hover:text-leilao-dark flex items-center">
              Ver todas
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCities.map(city => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </div>
      </section>

      {/* Imóveis em destaque */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Imóveis em Destaque</h2>
            <Button asChild variant="link" className="text-leilao-primary hover:text-leilao-dark">
              <Link to="/cidades" className="flex items-center">
                Ver todos
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Simplificamos o processo para você encontrar oportunidades em leilões da Caixa Econômica Federal.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-leilao-light rounded-lg">
              <div className="w-16 h-16 bg-leilao-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Encontre</h3>
              <p className="text-gray-600">
                Navegue por cidades e encontre imóveis disponíveis em leilão da Caixa Econômica Federal.
              </p>
            </div>
            
            <div className="text-center p-6 bg-leilao-light rounded-lg">
              <div className="w-16 h-16 bg-leilao-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Compare</h3>
              <p className="text-gray-600">
                Compare os preços de leilão com os preços de mercado para venda e aluguel na região.
              </p>
            </div>
            
            <div className="text-center p-6 bg-leilao-light rounded-lg">
              <div className="w-16 h-16 bg-leilao-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Decida</h3>
              <p className="text-gray-600">
                Analise as informações, visite os links externos e tome uma decisão informada sobre o investimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-leilao-primary text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para Encontrar seu Próximo Imóvel?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Navegue por nossas cidades cadastradas e descubra oportunidades de leilão da Caixa Econômica Federal.
            </p>
            <Button asChild size="lg" className="bg-white text-leilao-primary hover:bg-leilao-light">
              <Link to="/cidades">
                Explorar Cidades
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
