
import { PropertyProps } from "../components/PropertyCard";
import { CityProps } from "../components/CityCard";
import { MarketPriceProps } from "../components/MarketPriceCard";

// Dados mockados de cidades
export const mockCities: CityProps[] = [
  {
    id: "marilia",
    name: "Marília",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1000",
    propertiesCount: 8
  },
  {
    id: "bauru",
    name: "Bauru",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1525438160292-a4a860951216?q=80&w=1000",
    propertiesCount: 5
  },
  {
    id: "campinas",
    name: "Campinas",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000",
    propertiesCount: 6
  },
  {
    id: "sao-paulo",
    name: "São Paulo",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1578002171197-b59e6d19a8fa?q=80&w=1000",
    propertiesCount: 12
  }
];

// Dados mockados de imóveis
export const mockProperties: PropertyProps[] = [
  {
    id: "property1",
    title: "Apartamento 2 quartos em Marília",
    address: "Rua das Flores, 123",
    city: "Marília",
    price: 180000,
    originalPrice: 220000,
    discount: 18,
    imageUrl: "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?q=80&w=1000",
    auctionDate: "15/05/2025",
    bedrooms: 2,
    area: 68,
    neighborhood: "Centro"
  },
  {
    id: "property2",
    title: "Casa com 3 quartos e quintal",
    address: "Avenida Principal, 456",
    city: "Marília",
    price: 240000,
    originalPrice: 280000,
    discount: 14,
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1000",
    auctionDate: "22/05/2025",
    bedrooms: 3,
    area: 120,
    neighborhood: "Jardim Paulista"
  },
  {
    id: "property3",
    title: "Sobrado em condomínio fechado",
    address: "Rua dos Ipês, 789",
    city: "Marília",
    price: 320000,
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000",
    auctionDate: "30/05/2025",
    bedrooms: 3,
    area: 150,
    neighborhood: "Jardim América"
  },
  {
    id: "property4",
    title: "Apartamento térreo com quintal privativo",
    address: "Rua das Margaridas, 234",
    city: "Marília",
    price: 195000,
    originalPrice: 230000,
    discount: 15,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000",
    auctionDate: "05/06/2025",
    bedrooms: 2,
    area: 70,
    neighborhood: "Nova Marília"
  },
  {
    id: "property5",
    title: "Casa térrea com edícula",
    address: "Alameda dos Girassóis, 567",
    city: "Marília",
    price: 270000,
    imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1000",
    auctionDate: "12/06/2025",
    bedrooms: 3,
    area: 200,
    neighborhood: "Vila Marcondes"
  },
  {
    id: "property6",
    title: "Apartamento 3 quartos, 1 suíte",
    address: "Rua das Acácias, 890",
    city: "Bauru",
    price: 290000,
    originalPrice: 330000,
    discount: 12,
    imageUrl: "https://images.unsplash.com/photo-1569152811536-fb47aced4d10?q=80&w=1000",
    auctionDate: "10/05/2025",
    bedrooms: 3,
    area: 98,
    neighborhood: "Centro"
  },
  {
    id: "property7",
    title: "Casa em condomínio com lazer completo",
    address: "Rua dos Jacarandás, 123",
    city: "Bauru",
    price: 420000,
    imageUrl: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1000",
    auctionDate: "18/05/2025",
    bedrooms: 4,
    area: 180,
    neighborhood: "Jardim Europa"
  },
  {
    id: "property8",
    title: "Apartamento novo próximo ao shopping",
    address: "Avenida Central, 456",
    city: "Campinas",
    price: 350000,
    originalPrice: 380000,
    discount: 8,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000",
    auctionDate: "20/05/2025",
    bedrooms: 2,
    area: 75,
    neighborhood: "Cambuí"
  }
];

// Dados mockados de preços de mercado para venda
export const mockSaleListings: MarketPriceProps[] = [
  {
    id: "sale1",
    title: "Apartamento 2 quartos no Centro",
    price: 230000,
    description: "Ótimo apartamento com 2 quartos, sala ampla, cozinha planejada e área de serviço.",
    imageUrls: ["https://images.unsplash.com/photo-1619542402915-dcaf30e4e2a1?q=80&w=1000"],
    externalLink: "https://www.example.com/listing1",
    source: "OLX",
    type: "sale"
  },
  {
    id: "sale2",
    title: "Casa 3 quartos no Jardim Paulista",
    price: 280000,
    description: "Casa com 3 quartos, 1 suíte, sala, cozinha, banheiro, área de serviço e garagem para 2 carros.",
    imageUrls: ["https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=1000"],
    externalLink: "https://www.example.com/listing2",
    source: "Facebook Marketplace",
    type: "sale"
  },
  {
    id: "sale3",
    title: "Sobrado em condomínio fechado",
    price: 380000,
    description: "Sobrado em condomínio fechado com 3 quartos, 1 suíte, sala ampla, cozinha planejada, área gourmet e 2 vagas de garagem.",
    imageUrls: ["https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?q=80&w=1000"],
    externalLink: "https://www.example.com/listing3",
    source: "OLX",
    type: "sale"
  }
];

// Dados mockados de preços de mercado para aluguel
export const mockRentListings: MarketPriceProps[] = [
  {
    id: "rent1",
    title: "Apartamento 2 quartos para alugar no Centro",
    price: 1200,
    description: "Apartamento com 2 quartos, sala, cozinha, banheiro e área de serviço. Prédio com elevador e portaria 24h.",
    imageUrls: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000"],
    externalLink: "https://www.example.com/rental1",
    source: "OLX",
    type: "rent"
  },
  {
    id: "rent2",
    title: "Casa 3 quartos para alugar no Jardim América",
    price: 1800,
    description: "Casa com 3 quartos, sala ampla, cozinha, 2 banheiros, área de serviço e garagem para 2 carros.",
    imageUrls: ["https://images.unsplash.com/photo-1558067183-343aa0dcd020?q=80&w=1000"],
    externalLink: "https://www.example.com/rental2",
    source: "Facebook Marketplace",
    type: "rent"
  },
  {
    id: "rent3",
    title: "Apartamento 1 quarto mobiliado",
    price: 900,
    description: "Apartamento mobiliado com 1 quarto, sala, cozinha americana e banheiro. Condomínio com piscina e academia.",
    imageUrls: ["https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=1000"],
    externalLink: "https://www.example.com/rental3",
    source: "OLX",
    type: "rent"
  }
];

// Funções auxiliares para obter dados
export const getCityById = (id: string) => {
  return mockCities.find(city => city.id === id);
};

export const getPropertiesByCity = (cityId: string) => {
  return mockProperties.filter(property => property.city.toLowerCase() === getCityById(cityId)?.name.toLowerCase());
};

export const getPropertyById = (id: string) => {
  return mockProperties.find(property => property.id === id);
};

export const getPropertyNeighborhoods = (cityId: string) => {
  const properties = getPropertiesByCity(cityId);
  const neighborhoods = [...new Set(properties.map(property => property.neighborhood))];
  return neighborhoods;
};

export const getSaleListingsByNeighborhood = (neighborhood: string) => {
  // Em uma aplicação real, filtraria por bairro
  // Aqui retornamos todos os dados mockados
  return mockSaleListings;
};

export const getRentListingsByNeighborhood = (neighborhood: string) => {
  // Em uma aplicação real, filtraria por bairro
  // Aqui retornamos todos os dados mockados
  return mockRentListings;
};
