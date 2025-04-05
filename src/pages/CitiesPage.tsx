
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CityCard from "@/components/CityCard";
import { mockCities } from "@/data/mockData";

const CitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filtra as cidades com base no termo de busca
  const filteredCities = mockCities.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.state.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container-custom py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Cidades Disponíveis</h1>
      
      {/* Barra de busca */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar cidades..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Lista de cidades */}
      {filteredCities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map(city => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            Nenhuma cidade encontrada para "{searchTerm}".
          </p>
        </div>
      )}
    </div>
  );
};

export default CitiesPage;
