
import { useState } from "react";
import { CalendarClock, ChevronLeft, ChevronRight, Heart, Home, MapPin, Square } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface PropertyProps {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  imageUrl?: string; // Mantido para compatibilidade
  imageUrls?: string[]; // Novo campo para múltiplas imagens
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Compatibilidade com imageUrl/imageUrls
  const images = property.imageUrls || (property.imageUrl ? [property.imageUrl] : []);
  const hasMultipleImages = images.length > 1;
  
  const formattedPrice = formatCurrency(property.price);
  const formattedOriginalPrice = property.originalPrice 
    ? formatCurrency(property.originalPrice) 
    : null;
  
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };
  
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
      <div className="p-3 bg-blue-50">
        <h3 className="text-lg font-semibold text-blue-700">Compra Direta</h3>
      </div>
      
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-48 sm:w-1/3 overflow-hidden">
          <img 
            src={images[currentImageIndex] || "https://via.placeholder.com/400x200?text=Sem+Imagem"} 
            alt={property.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          
          {/* Navegação de imagens */}
          {hasMultipleImages && (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60"
                onClick={prevImage}
              >
                <ChevronLeft size={18} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60"
                onClick={nextImage}
              >
                <ChevronRight size={18} />
              </Button>
              
              {/* Indicador de imagens */}
              <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                <div className="bg-black/50 rounded-full px-2 py-1 text-xs text-white">
                  {currentImageIndex + 1}/{images.length}
                </div>
              </div>
            </>
          )}
          
          {/* Botão de favorito */}
          <button className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-gray-700 hover:bg-white">
            <Heart size={18} />
          </button>
        </div>
        
        <CardContent className="p-4 sm:w-2/3">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">{property.title}</h3>
          
          <div className="space-y-2">
            {formattedOriginalPrice && (
              <div className="text-gray-700">
                Valor de avaliação: <span className="font-medium">{formattedOriginalPrice}</span>
              </div>
            )}
            
            <div className="text-gray-700">
              Valor mínimo de venda: <span className="font-semibold text-red-600">{formattedPrice}</span>
              {property.discount && (
                <span className="ml-2 text-sm text-blue-600">
                  (desconto de {property.discount}%)
                </span>
              )}
            </div>
            
            <div className="py-1 border-t border-b border-gray-200">
              <div className="flex items-center text-gray-700 text-sm">
                {property.bedrooms && (
                  <span className="mr-4">Apartamento - {property.bedrooms} quarto(s)</span>
                )}
                {property.area && (
                  <span><Square size={14} className="inline mr-1" /> {property.area}m²</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin size={16} className="mr-1 flex-shrink-0" />
              <span className="truncate">{property.neighborhood}, {property.city}</span>
            </div>
            
            <div className="flex items-center text-gray-600 text-sm">
              <CalendarClock size={16} className="mr-1 flex-shrink-0" />
              <span>Leilão: {property.auctionDate}</span>
            </div>
          </div>
        </CardContent>
      </div>
      
      <CardFooter className="bg-gray-50 p-4">
        <Link 
          to={`/imovel/${property.id}`} 
          className="w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Ver detalhes
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
