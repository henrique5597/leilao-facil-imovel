
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarClock, ChevronLeft, ChevronRight, ExternalLink, Heart, Home, MapPin, Square } from "lucide-react";
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
import CountdownTimer from "@/components/CountdownTimer";
import { Card } from "@/components/ui/card";

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
      </div>
      
      {/* Contagem regressiva */}
      <div className="mb-6">
        <CountdownTimer />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card de informações do imóvel no estilo da referência */}
          <Card className="bg-white overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Imagem do imóvel */}
              <div className="w-full md:w-1/3 relative">
                <img 
                  src={propertyImages[currentImageIndex]} 
                  alt={property.title}
                  className="w-full h-full object-cover min-h-[200px]"
                />
                
                {propertyImages.length > 1 && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60"
                      onClick={prevPropertyImage}
                    >
                      <ChevronLeft size={18} />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60"
                      onClick={nextPropertyImage}
                    >
                      <ChevronRight size={18} />
                    </Button>
                  </>
                )}
                
                {/* Botão de favorito */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-2 w-8 h-8 rounded-full bg-white/80 text-gray-700 hover:bg-white"
                >
                  <Heart size={18} />
                </Button>
              </div>
              
              {/* Detalhes do imóvel */}
              <div className="w-full md:w-2/3 p-4">
                <h2 className="text-xl font-bold text-blue-600 mb-2">{property.title}</h2>
                
                <div className="space-y-2">
                  <div>
                    <div className="text-gray-800">Valor de avaliação: <span className="font-semibold">{formattedOriginalPrice}</span></div>
                    <div className="text-gray-800">Valor mínimo de venda: <span className="font-semibold text-red-600">{formattedPrice}</span> 
                      {property.discount && (
                        <span className="ml-2 text-sm text-blue-600">
                          (desconto de {property.discount}%)
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="py-1 border-t border-b border-gray-200">
                    <div className="flex items-center text-gray-700">
                      {property.bedrooms && (
                        <span className="mr-4">Apartamento - {property.bedrooms} quarto(s)</span>
                      )}
                      {property.area && (
                        <span><Square size={14} className="inline mr-1" /> {property.area}m²</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-gray-700">Número do imóvel: {id}</div>
                    <div className="text-gray-700 uppercase">{property.address}, {property.neighborhood}, {property.city}</div>
                    <div className="text-gray-600 text-sm mt-1">
                      Despesas do imóvel, se houver: Condomínio (até 10% do valor de avaliação) e tributos sob responsabilidade do comprador.
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Link 
                      to={`/imovel/${property.id}/detalhes`}
                      className="text-orange-500 text-sm font-semibold hover:underline flex items-center"
                    >
                      <span className="mr-1">•</span> Detalhes do imóvel
                    </Link>
                    <Link 
                      to="#"
                      className="text-blue-500 text-sm font-semibold hover:underline flex items-center"
                    >
                      <span className="mr-1">•</span> Corretores credenciados
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
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
          <div className="p-5 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-bold text-blue-700 mb-4">Compra Direta</h3>
            
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="text-center mb-4">
                <p className="text-lg font-bold text-blue-800">{property.title}</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600">Valor de avaliação:</p>
                  <p className="text-lg font-semibold">{formattedOriginalPrice}</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Valor mínimo de venda:</p>
                  <p className="text-lg font-semibold text-red-600">{formattedPrice}</p>
                  {property.discount && (
                    <Badge className="bg-blue-100 text-blue-800 font-normal">
                      Desconto de {property.discount}%
                    </Badge>
                  )}
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-gray-700 flex items-center">
                    <CalendarClock size={16} className="mr-2" />
                    Data do Leilão: {property.auctionDate}
                  </p>
                </div>
                
                <div className="pt-3">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      Ver Anúncio Oficial
                      <ExternalLink size={16} className="ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Informações extras */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Informações importantes</h3>
            
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                Este é um imóvel disponível para leilão oficial. 
                Para participar do leilão, você precisa seguir os procedimentos oficiais.
              </p>
              
              <p>
                Recomendamos verificar o edital do leilão e as condições do imóvel antes de fazer um lance.
                As despesas são de responsabilidade do comprador.
              </p>
              
              <Button variant="outline" asChild className="w-full mt-2">
                <Link to={`/cidade/${property.city.toLowerCase()}`}>
                  Ver outros imóveis em {property.city}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
