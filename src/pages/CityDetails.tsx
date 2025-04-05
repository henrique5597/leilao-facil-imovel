
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { getCityById, getPropertiesByCity } from "@/data/mockData";

const CityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Obtém os dados da cidade e imóveis
  const city = id ? getCityById(id) : null;
  const properties = id ? getPropertiesByCity(id) : [];
  
  // Filtra os imóveis com base no termo de busca
  const filteredProperties = properties.filter(property => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Redireciona para NotFound se a cidade não existir
  useEffect(() => {
    if (!city && id) {
      console.error("Cidade não encontrada:", id);
    }
  }, [city, id]);
  
  if (!city) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Cidade não encontrada</h1>
        <p className="mb-8">A cidade que você está procurando não está disponível.</p>
        <Button asChild>
          <Link to="/cidades">Voltar para Cidades</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <>
      {/* Hero da cidade */}
      <div 
        className="relative h-64 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${city.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container-custom h-full flex flex-col justify-center relative z-10 text-white">
          <Link to="/cidades" className="inline-flex items-center text-white/90 hover:text-white mb-4">
            <ArrowLeft size={16} className="mr-1" />
            Voltar para Cidades
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{city.name}</h1>
          <p className="text-xl text-white/90">{city.state}</p>
        </div>
      </div>
      
      <div className="container-custom py-8 md:py-12">
        {/* Estatísticas */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center p-4 bg-leilao-light rounded-md">
              <Building size={24} className="mr-3 text-leilao-primary" />
              <div>
                <p className="text-sm text-gray-600">Total de Imóveis</p>
                <p className="text-xl font-bold">{properties.length}</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-leilao-light rounded-md">
              <div className="p-1 rounded-full bg-leilao-primary mr-3">
                <span className="text-white text-xs font-bold block w-5 h-5 flex items-center justify-center">%</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Desconto Médio</p>
                <p className="text-xl font-bold">
                  {Math.round(
                    properties
                      .filter(p => p.discount)
                      .reduce((acc, p) => acc + (p.discount || 0), 0) / 
                    properties.filter(p => p.discount).length || 0
                  )}%
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-leilao-light rounded-md">
              <div className="p-1 rounded-full bg-leilao-primary mr-3">
                <span className="text-white text-xs font-bold block w-5 h-5 flex items-center justify-center">R$</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Preço Médio</p>
                <p className="text-xl font-bold">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    maximumFractionDigits: 0
                  }).format(
                    properties.reduce((acc, p) => acc + p.price, 0) / properties.length || 0
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Barra de busca */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar imóveis por título, endereço ou bairro..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Lista de imóveis */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg mb-4">
              Nenhum imóvel encontrado {searchTerm ? `para "${searchTerm}"` : ""}.
            </p>
            {searchTerm && (
              <Button onClick={() => setSearchTerm("")}>Limpar busca</Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CityDetails;
