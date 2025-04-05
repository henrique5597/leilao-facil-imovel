
import { CalendarClock, Home, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface PropertyProps {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  imageUrl: string;
  auctionDate: string;
  bedrooms?: number;
  area?: number;
  neighborhood: string;
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const PropertyCard = ({ property }: { property: PropertyProps }) => {
  const formattedPrice = formatCurrency(property.price);
  const discountText = property.discount ? `${property.discount}% de desconto` : null;
  
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {discountText && (
          <Badge className="absolute top-2 right-2 bg-leilao-secondary text-white">
            {discountText}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{property.title}</h3>
        
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm truncate">{property.neighborhood}, {property.city}</span>
        </div>
        
        <div className="flex items-center text-gray-500 mb-3">
          <CalendarClock size={16} className="mr-1" />
          <span className="text-sm">Leilão: {property.auctionDate}</span>
        </div>
        
        {(property.bedrooms || property.area) && (
          <div className="flex gap-3 mb-3">
            {property.bedrooms && (
              <div className="flex items-center text-sm">
                <Home size={16} className="mr-1" />
                <span>{property.bedrooms} {property.bedrooms > 1 ? 'quartos' : 'quarto'}</span>
              </div>
            )}
            
            {property.area && (
              <div className="flex items-center text-sm">
                <span>{property.area}m²</span>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-2">
          <div className="text-lg font-bold text-leilao-primary">
            {formattedPrice}
          </div>
          
          {property.originalPrice && (
            <div className="text-sm text-gray-500 line-through">
              {formatCurrency(property.originalPrice)}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 p-4">
        <Link 
          to={`/imovel/${property.id}`} 
          className="w-full text-center py-2 px-4 bg-leilao-primary text-white rounded-md hover:bg-leilao-dark transition-colors"
        >
          Ver detalhes
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
