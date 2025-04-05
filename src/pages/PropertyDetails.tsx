
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarClock, ChevronLeft, ChevronRight, ExternalLink, Home, MapPin, Square } from "lucide-react";
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
  
  // Estado para controlar a visualização de imagem atual do imóvel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Tratamos property.imageUrl como um array para futura expansão
  const propertyImages = property ? [property.imageUrl] : [];
  
  // Funções para navegação de imagens do imóvel principal
  const nextPropertyImage = () => {
    if (propertyImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
    }
  };
  
  const prevPropertyImage = () => {
    if (propertyImages.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? propertyImages.length - 1 : prev - 1
      );
    }
  };
  
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
          <div className="rounded-lg overflow-hidden shadow-md relative">
            <img 
              src={propertyImages[currentImageIndex]} 
              alt={property.title}
              className="w-full h-auto object-cover"
            />
            
            {propertyImages.length > 1 && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60"
                  onClick={prevPropertyImage}
                >
                  <ChevronLeft size={20} />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60"
                  onClick={nextPropertyImage}
                >
                  <ChevronRight size={20} />
                </Button>
                
                {/* Indicador de imagens */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                  <div className="bg-black/60 rounded-full px-3 py-1 text-sm text-white">
                    {currentImageIndex + 1}/{propertyImages.length}
                  </div>
                </div>
              </>
            )}
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
                      <MarketPriceCard key={listing.id} listing={{
                        ...listing,
                        // Compatibilidade com dados antigos
                        imageUrls: Array.isArray(listing.imageUrls) ? listing.imageUrls : [(listing as any).imageUrl || ""]
                      }} />
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
                      <MarketPriceCard key={listing.id} listing={{
                        ...listing,
                        // Compatibilidade com dados antigos
                        imageUrls: Array.isArray(listing.imageUrls) ? listing.imageUrls : [(listing as any).imageUrl || ""]
                      }} />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Coluna lateral */}
        <div className="space-y-6">
          {/* Card de preço - Atualizado para mostrar Valor de avaliação e Valor mínimo de venda */}
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-leilao-primary">{formattedPrice}</h2>
              <p className="text-gray-600 text-sm mt-1">Valor mínimo de venda</p>
              
              {property.originalPrice && (
                <div className="mt-3">
                  <span className="text-gray-700 text-lg font-semibold block">
                    {formattedOriginalPrice}
                  </span>
                  <p className="text-gray-600 text-sm">Valor de avaliação</p>
                  
                  {property.discount && (
                    <Badge className="bg-leilao-secondary text-white mt-2">
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
