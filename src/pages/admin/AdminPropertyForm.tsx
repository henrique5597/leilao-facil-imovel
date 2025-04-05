
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getPropertyById, mockCities } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const AdminPropertyForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;
  
  // Estado para o formulário
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    city: "",
    neighborhood: "",
    price: "",
    originalPrice: "",
    discount: "",
    imageUrl: "",
    auctionDate: "",
    bedrooms: "",
    area: "",
  });
  
  // Carrega dados do imóvel se estiver editando
  useEffect(() => {
    if (isEditing) {
      const property = getPropertyById(id);
      if (property) {
        setFormData({
          title: property.title,
          address: property.address,
          city: property.city,
          neighborhood: property.neighborhood,
          price: property.price.toString(),
          originalPrice: property.originalPrice?.toString() || "",
          discount: property.discount?.toString() || "",
          imageUrl: property.imageUrl,
          auctionDate: property.auctionDate,
          bedrooms: property.bedrooms?.toString() || "",
          area: property.area?.toString() || "",
        });
      }
    }
  }, [id, isEditing]);
  
  // Manipulador de mudança para os campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Manipulador de envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    if (!formData.title || !formData.address || !formData.city || !formData.price || !formData.auctionDate) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    // Em uma aplicação real, aqui enviaríamos os dados para um servidor
    // Para este exemplo, apenas simulamos o sucesso
    
    toast({
      title: isEditing ? "Imóvel atualizado" : "Imóvel adicionado",
      description: isEditing 
        ? "O imóvel foi atualizado com sucesso." 
        : "Um novo imóvel foi adicionado com sucesso.",
    });
    
    navigate("/admin");
  };
  
  return (
    <div className="container-custom py-8 md:py-12">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4 p-0 hover:bg-transparent hover:text-leilao-primary"
          onClick={() => navigate("/admin")}
        >
          <ArrowLeft size={16} className="mr-1" />
          Voltar
        </Button>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          {isEditing ? 'Editar Imóvel' : 'Adicionar Novo Imóvel'}
        </h1>
        <p className="text-gray-600">
          {isEditing 
            ? 'Atualize as informações do imóvel abaixo.' 
            : 'Preencha o formulário abaixo para adicionar um novo imóvel.'}
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Imóvel</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Imóvel *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Apartamento 2 quartos com varanda"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Endereço *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Ex: Rua das Flores, 123"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">Cidade *</Label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Selecione uma cidade</option>
                  {mockCities.map(city => (
                    <option key={city.id} value={city.name}>
                      {city.name}, {city.state}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro *</Label>
                <Input
                  id="neighborhood"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  placeholder="Ex: Centro"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Ex: 200000"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Preço Original (R$)</Label>
                <Input
                  id="originalPrice"
                  name="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  placeholder="Ex: 250000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discount">Desconto (%)</Label>
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="Ex: 15"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="auctionDate">Data do Leilão *</Label>
                <Input
                  id="auctionDate"
                  name="auctionDate"
                  value={formData.auctionDate}
                  onChange={handleChange}
                  placeholder="Ex: 15/05/2025"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Número de Quartos</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="Ex: 2"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="area">Área (m²)</Label>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Ex: 75"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="imageUrl">URL da Imagem *</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Ex: https://example.com/image.jpg"
                  required
                />
              </div>
              
              {formData.imageUrl && (
                <div className="md:col-span-2">
                  <Label>Pré-visualização da Imagem</Label>
                  <div className="mt-2 border rounded-md overflow-hidden h-48">
                    <img 
                      src={formData.imageUrl} 
                      alt="Pré-visualização" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Imagem+Inválida";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate("/admin")}>
                Cancelar
              </Button>
              <Button type="submit">
                {isEditing ? 'Salvar Alterações' : 'Adicionar Imóvel'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPropertyForm;
