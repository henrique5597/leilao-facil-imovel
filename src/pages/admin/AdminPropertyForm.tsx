
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
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
    imageUrls: [""], // Agora é um array de URLs
    auctionDate: "",
    bedrooms: "",
    area: "",
  });
  
  // Carrega dados do imóvel se estiver editando
  useEffect(() => {
    if (isEditing) {
      const property = getPropertyById(id);
      if (property) {
        // Converter imageUrl para imageUrls se necessário
        const imageUrls = property.imageUrl 
          ? [property.imageUrl] 
          : (property as any).imageUrls || [""];
          
        setFormData({
          title: property.title,
          address: property.address,
          city: property.city,
          neighborhood: property.neighborhood,
          price: property.price.toString(),
          originalPrice: property.originalPrice?.toString() || "",
          discount: property.discount?.toString() || "",
          imageUrls: Array.isArray(imageUrls) ? imageUrls : [imageUrls],
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
  
  // Manipulador para mudanças em URLs de imagem específicas
  const handleImageUrlChange = (index: number, value: string) => {
    setFormData(prev => {
      const newImageUrls = [...prev.imageUrls];
      newImageUrls[index] = value;
      return {
        ...prev,
        imageUrls: newImageUrls
      };
    });
  };
  
  // Adicionar nova URL de imagem
  const addImageUrl = () => {
    setFormData(prev => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ""]
    }));
  };
  
  // Remover URL de imagem
  const removeImageUrl = (index: number) => {
    if (formData.imageUrls.length <= 1) {
      toast({
        title: "Ação não permitida",
        description: "É necessário ter pelo menos uma imagem.",
        variant: "destructive"
      });
      return;
    }
    
    setFormData(prev => {
      const newImageUrls = [...prev.imageUrls];
      newImageUrls.splice(index, 1);
      return {
        ...prev,
        imageUrls: newImageUrls
      };
    });
  };
  
  // Manipulador de envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    if (!formData.title || !formData.address || !formData.city || !formData.price || !formData.auctionDate || !formData.imageUrls[0]) {
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
            </div>
            
            {/* Gerenciamento de várias URLs de imagem */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <Label>URLs das Imagens *</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addImageUrl}
                  className="flex items-center gap-1"
                  disabled={formData.imageUrls.length >= 10}
                >
                  <Plus size={16} />
                  Adicionar Imagem
                </Button>
              </div>
              
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    placeholder={`URL da imagem ${index + 1}`}
                    className="flex-grow"
                    required={index === 0}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => removeImageUrl(index)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              
              <p className="text-sm text-gray-500">
                Adicione até 10 imagens. Pelo menos uma imagem é obrigatória.
              </p>
            </div>
            
            {/* Preview de imagens */}
            {formData.imageUrls.some(url => url) && (
              <div className="md:col-span-2">
                <Label className="block mb-2">Pré-visualização das Imagens</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {formData.imageUrls.map((url, index) => (
                    url ? (
                      <div key={index} className="border rounded-md overflow-hidden h-40">
                        <img 
                          src={url} 
                          alt={`Imagem ${index + 1}`} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Imagem+Inválida";
                          }}
                        />
                      </div>
                    ) : null
                  ))}
                </div>
              </div>
            )}
            
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
