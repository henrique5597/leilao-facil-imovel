
import { Link } from "react-router-dom";
import { Building, Home, Plus, RefreshCw, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCities, mockProperties, mockSaleListings, mockRentListings } from "@/data/mockData";

const AdminPage = () => {
  // Contagem de itens
  const propertiesCount = mockProperties.length;
  const citiesCount = mockCities.length;
  const saleListingsCount = mockSaleListings.length;
  const rentListingsCount = mockRentListings.length;
  
  return (
    <div className="container-custom py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Área Administrativa</h1>
          <p className="text-gray-600">
            Gerencie imóveis, cidades e preços de mercado para comparação.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button asChild>
            <Link to="/">Voltar para o Site</Link>
          </Button>
        </div>
      </div>
      
      {/* Cards com estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Imóveis</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{propertiesCount}</div>
            <p className="text-xs text-muted-foreground">
              Imóveis em leilão cadastrados
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cidades</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{citiesCount}</div>
            <p className="text-xs text-muted-foreground">
              Cidades disponíveis
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Preços de Venda</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{saleListingsCount}</div>
            <p className="text-xs text-muted-foreground">
              Comparativos de venda
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Preços de Aluguel</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rentListingsCount}</div>
            <p className="text-xs text-muted-foreground">
              Comparativos de aluguel
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="properties" className="flex-1">Imóveis</TabsTrigger>
          <TabsTrigger value="cities" className="flex-1">Cidades</TabsTrigger>
          <TabsTrigger value="prices" className="flex-1">Preços de Mercado</TabsTrigger>
        </TabsList>
        
        {/* Tab de Imóveis */}
        <TabsContent value="properties">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Gerenciar Imóveis</h2>
            <Button asChild>
              <Link to="/admin/imovel/novo">
                <Plus size={16} className="mr-1" />
                Adicionar Imóvel
              </Link>
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data do Leilão
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{property.title}</div>
                        <div className="text-sm text-gray-500">{property.neighborhood}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{property.city}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {property.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </div>
                        {property.discount && (
                          <div className="text-xs text-green-600">
                            {property.discount}% de desconto
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {property.auctionDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          to={`/admin/imovel/${property.id}`} 
                          className="text-leilao-primary hover:text-leilao-dark mr-3"
                        >
                          Editar
                        </Link>
                        <button className="text-red-600 hover:text-red-900">
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        {/* Tab de Cidades */}
        <TabsContent value="cities">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Gerenciar Cidades</h2>
            <Button asChild>
              <Link to="/admin/cidade/nova">
                <Plus size={16} className="mr-1" />
                Adicionar Cidade
              </Link>
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Imóveis
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockCities.map((city) => (
                    <tr key={city.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{city.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {city.state}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {city.propertiesCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          to={`/admin/cidade/${city.id}`} 
                          className="text-leilao-primary hover:text-leilao-dark mr-3"
                        >
                          Editar
                        </Link>
                        <button className="text-red-600 hover:text-red-900">
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        {/* Tab de Preços de Mercado */}
        <TabsContent value="prices">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Gerenciar Preços de Mercado</h2>
            <Button asChild>
              <Link to="/admin/preco-mercado/novo">
                <Plus size={16} className="mr-1" />
                Adicionar Preço de Mercado
              </Link>
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fonte
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...mockSaleListings, ...mockRentListings].map((listing) => (
                    <tr key={listing.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          listing.type === 'sale' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {listing.type === 'sale' ? 'Venda' : 'Aluguel'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {listing.price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                        {listing.type === 'rent' && <span className="text-xs ml-1">/mês</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {listing.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          to={`/admin/preco-mercado/${listing.id}`} 
                          className="text-leilao-primary hover:text-leilao-dark mr-3"
                        >
                          Editar
                        </Link>
                        <button className="text-red-600 hover:text-red-900">
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
