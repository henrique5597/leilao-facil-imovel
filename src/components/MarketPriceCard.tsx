
import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface MarketPriceProps {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrls: string[]; // Agora é um array de URLs
  externalLink: string;
  source: string;
  type: 'sale' | 'rent';
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const MarketPriceCard = ({ listing }: { listing: MarketPriceProps }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const formattedPrice = formatCurrency(listing.price);
  const hasMultipleImages = listing.imageUrls.length > 1;
  
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % listing.imageUrls.length);
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? listing.imageUrls.length - 1 : prev - 1
    );
  };
  
  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-all">
      <div className="h-40 overflow-hidden relative">
        <img 
          src={listing.imageUrls[currentImageIndex] || "https://via.placeholder.com/400x200?text=Sem+Imagem"} 
          alt={listing.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        
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
                {currentImageIndex + 1}/{listing.imageUrls.length}
              </div>
            </div>
          </>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{listing.title}</h3>
        
        <div className="text-lg font-bold text-leilao-primary mb-2">
          {formattedPrice}
          {listing.type === 'rent' && <span className="text-sm font-normal">/mês</span>}
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-2">
          {listing.description}
        </p>
        
        <p className="text-xs text-gray-500">
          Fonte: {listing.source}
        </p>
      </CardContent>
      
      <CardFooter className="bg-gray-50 p-4">
        <a 
          href={listing.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center py-2 px-4 bg-white border border-leilao-primary text-leilao-primary rounded-md hover:bg-leilao-light transition-colors"
        >
          Ver anúncio original
          <ExternalLink size={16} className="ml-1" />
        </a>
      </CardFooter>
    </Card>
  );
};

export default MarketPriceCard;
