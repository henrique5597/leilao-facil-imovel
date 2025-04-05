
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface MarketPriceProps {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
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
  const formattedPrice = formatCurrency(listing.price);
  
  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-all">
      <div className="h-40 overflow-hidden">
        <img 
          src={listing.imageUrl} 
          alt={listing.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
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
