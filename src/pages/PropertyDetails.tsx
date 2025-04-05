
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarClock, ExternalLink, Home, MapPin, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MapComponent from "@/components/MapComponent";
import MarketPriceCard from "@/components/MarketPriceCard";
import { 
  getPropertyById, 
  getSaleListingsByNeighborhood, 
  getRentListingsByNeighborhood 
} from "@/data/mockData";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Obtém os dados do imóvel
  const property = id ? getPropertyById(id) : null;
  
  // Preços de mercado para venda e aluguel baseados no bairro
  const saleListings = property ? getSaleListingsByNeighborhood(property.neighborhood) : [];
  const rentListings = property ? getRentListingsByNeighborhood(property.neighborhood) : [];
  
  // Redireciona para NotFound se o imóvel não existir
  useEffect(() => {
    if (!property && id) {
      console.error("Imóvel não encontrado:", id);
    }
  }, [property, id]);
  
  if (!property) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Imóvel não encontrado</h1>
        <p className="mb-8">O imóvel que você está procurando não está disponível.</p>
        <Button asChild>
          <Link to="/cidades">Voltar para Cidades</Link>
        </Button>
      </div>
    );
  }
  
  // Formatação de valores
  const formattedPrice = property.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  
  const formattedOriginalPrice = property.originalPrice?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  
  // Coordenadas fictícias para o mapa
  // Em uma aplicação real, seriam obtidas por geocodificação
  const latitude = -22.12 + Math.random() * 0.05;
  const longitude = -49.94 + Math.random() * 0.05;
  
  return (
    <div className="container-custom py-8 md:py-12">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4 p-0 hover:bg-transparent hover:text-leilao-primary"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-1" />
          Voltar
        </Button>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-3">{property.title}</h1>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={18} className="mr-1" />
          <span>{property.address}, {property.neighborhood}, {property.city}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Imagem principal */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <img 
              src={property.imageUrl} 
              alt={property.title}
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Detalhes do imóvel */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Detalhes do Imóvel</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {property.bedrooms && (
                <div className="flex flex-col items-center p-3 bg-leilao-light rounded-md">
                  <Home size={22} className="text-leilao-primary mb-1" />
                  <span className="text-sm text-gray-600">Quartos</span>
                  <span className="font-bold">{property.bedrooms}</span>
                </div>
              )}
              
              {property.area && (
                <div className="flex flex-col items-center p-3 bg-leilao-light rounded-md">
                  <Square size={22} className="text-leilao-primary mb-1" />
                  <span className="text-sm text-gray-600">Área</span>
                  <span className="font-bold">{property.area} m²</span>
                </div>
              )}
              
              <div className="flex flex-col items-center p-3 bg-leilao-light rounded-md">
                <MapPin size={22} className="text-leilao-primary mb-1" />
                <span className="text-sm text-gray-600">Bairro</span>
                <span className="font-bold">{property.neighborhood}</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-leilao-light rounded-md">
                <CalendarClock size={22} className="text-leilao-primary mb-1" />
                <span className="text-sm text-gray-600">Data do Leilão</span>
                <span className="font-bold">{property.auctionDate}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">
              Este imóvel está disponível para leilão pela Caixa Econômica Federal. 
              A data do leilão está marcada para {property.auctionDate}.
            </p>
            
            <Button asChild className="w-full">
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                Ver Anúncio da Caixa
                <ExternalLink size={16} className="ml-2" />
              </a>
            </Button>
          </div>
          
          {/* Mapa */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Localização</h2>
            <MapComponent 
              latitude={latitude} 
              longitude={longitude} 
              address={`${property.address}, ${property.neighborhood}, ${property.city}`} 
            />
          </div>
          
          {/* Comparativo de preços */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Comparativo de Preços no Bairro</h2>
            
            <Tabs defaultValue="sale" className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="sale" className="flex-1">Preços de Venda</TabsTrigger>
                <TabsTrigger value="rent" className="flex-1">Preços de Aluguel</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sale">
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">
                    Compare o preço deste imóvel em leilão com os preços de venda no mercado no bairro {property.neighborhood}.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {saleListings.map(listing => (
                      <MarketPriceCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="rent">
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">
                    Compare com os preços de aluguel no mercado no bairro {property.neighborhood} para avaliar o potencial de retorno do investimento.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rentListings.map(listing => (
                      <MarketPriceCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Coluna lateral */}
        <div className="space-y-6">
          {/* Card de preço */}
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-leilao-primary">{formattedPrice}</h2>
              
              {property.originalPrice && (
                <div className="flex items-center justify-center mt-1">
                  <span className="text-gray-500 line-through text-sm mr-2">
                    {formattedOriginalPrice}
                  </span>
                  
                  {property.discount && (
                    <Badge className="bg-leilao-secondary text-white">
                      {property.discount}% de desconto
                    </Badge>
                  )}
                </div>
              )}
            </div>
            
            <div className="bg-leilao-light p-4 rounded-md mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Data do Leilão:</span>
                <span className="font-semibold">{property.auctionDate}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Cidade:</span>
                <span className="font-semibold">{property.city}</span>
              </div>
            </div>
            
            <Button asChild className="w-full mb-3">
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                Ver Anúncio da Caixa
                <ExternalLink size={16} className="ml-2" />
              </a>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link to={`/cidade/${property.city.toLowerCase()}`}>
                Ver outros imóveis em {property.city}
              </Link>
            </Button>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                Este é um imóvel disponível para leilão pela Caixa Econômica Federal. 
                Para participar do leilão, você precisa seguir os procedimentos oficiais da Caixa.
              </p>
              
              <p className="text-sm text-gray-500">
                Recomendamos verificar o edital do leilão e as condições do imóvel antes de fazer um lance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
