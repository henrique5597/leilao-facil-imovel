
import { Building, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export interface CityProps {
  id: string;
  name: string;
  state: string;
  imageUrl: string;
  propertiesCount: number;
}

const CityCard = ({ city }: { city: CityProps }) => {
  return (
    <Link to={`/cidade/${city.id}`}>
      <Card className="overflow-hidden h-full hover:shadow-lg transition-all">
        <div className="h-40 overflow-hidden relative">
          <img 
            src={city.imageUrl} 
            alt={`${city.name}, ${city.state}`}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-4">
            <h3 className="text-xl font-bold text-white">{city.name}</h3>
            <p className="text-white/90 text-sm">{city.state}</p>
          </div>
        </div>
        
        <CardContent className="py-3 px-4">
          <div className="flex items-center text-gray-600">
            <Building size={16} className="mr-1 text-leilao-primary" />
            <span>
              {city.propertiesCount} {city.propertiesCount === 1 ? 'imóvel' : 'imóveis'} disponíveis
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CityCard;
