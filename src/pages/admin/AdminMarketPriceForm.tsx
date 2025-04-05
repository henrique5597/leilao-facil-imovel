
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockRentListings, mockSaleListings } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const AdminMarketPriceForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;
  
  // Estado para o formulário
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    imageUrls: [""], // Agora é um array de URLs
    externalLink: "",
    source: "",
    type: "sale", // 'sale' ou 'rent'
  });
  
  // Carrega dados do preço de mercado se estiver editando
  useEffect(() => {
    if (isEditing) {
      // Procura nos dados de venda e aluguel
      const allListings = [...mockSaleListings, ...mockRentListings];
      const listing = allListings.find(item => item.id === id);
      
      if (listing) {
        setFormData({
          title: listing.title,
          price: listing.price.toString(),
          description: listing.description,
          // Compatibilidade com dados antigos (campo imageUrl simples)
          imageUrls: Array.isArray(listing.imageUrls) 
            ? listing.imageUrls 
            : [(listing as any).imageUrl || ""],
          externalLink: listing.externalLink,
          source: listing.source,
          type: listing.type,
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
  
  // Manipulador para URLs de imagens
  const handleImageUrlChange = (value: string, index: number) => {
    const newImageUrls = [...formData.imageUrls];
    newImageUrls[index] = value;
    setFormData(prev => ({
      ...prev,
      imageUrls: newImageUrls
    }));
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
        title: "Aviso",
        description: "É necessário pelo menos uma imagem.",
      });
      return;
    }
    
    const newImageUrls = formData.imageUrls.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      imageUrls: newImageUrls
    }));
  };
  
  // Manipulador de envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    if (!formData.title || !formData.price || formData.imageUrls.some(url => !url) || !formData.externalLink) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios, incluindo todas as URLs de imagens.",
        variant: "destructive"
      });
      return;
    }
    
    // Em uma aplicação real, aqui enviaríamos os dados para um servidor
    // Para este exemplo, apenas simulamos o sucesso
    
    toast({
      title: isEditing ? "Preço de mercado atualizado" : "Preço de mercado adicionado",
      description: isEditing 
        ? "O preço de mercado foi atualizado com sucesso." 
        : "Um novo preço de mercado foi adicionado com sucesso.",
    });
    
    navigate("/admin");
  };
  
  const sourceOptions = ["OLX", "Facebook Marketplace", "Quinto Andar", "ZAP Imóveis", "Viva Real", "Outro"];
  
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
          {isEditing ? 'Editar Preço de Mercado' : 'Adicionar Novo Preço de Mercado'}
        </h1>
        <p className="text-gray-600">
          {isEditing 
            ? 'Atualize as informações do preço de mercado abaixo.' 
            : 'Preencha o formulário abaixo para adicionar um novo preço de mercado para comparação.'}
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Preço de Mercado</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Anúncio *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Apartamento 2 quartos no Centro"
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
                  placeholder="Ex: 230000 ou 1200 (aluguel)"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Tipo *</Label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="sale">Venda</option>
                  <option value="rent">Aluguel</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="source">Fonte do Anúncio *</Label>
                <select
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Selecione uma fonte</option>
                  {sourceOptions.map(source => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Ex: Ótimo apartamento com 2 quartos, sala ampla, cozinha planejada..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="externalLink">Link do Anúncio Original *</Label>
                <Input
                  id="externalLink"
                  name="externalLink"
                  value={formData.externalLink}
                  onChange={handleChange}
                  placeholder="Ex: https://www.olx.com.br/anuncio/..."
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <Label>Imagens (URLs) *</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addImageUrl}
                    className="flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Adicionar Imagem
                  </Button>
                </div>
                
                {formData.imageUrls.map((url, index) => (
                  <div key={index} className="flex items-start gap-2 mb-3">
                    <Input
                      value={url}
                      onChange={(e) => handleImageUrlChange(e.target.value, index)}
                      placeholder={`URL da imagem ${index + 1}`}
                      required
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeImageUrl(index)}
                      className="flex-shrink-0 h-10 w-10 text-gray-500 hover:text-red-500"
                    >
                      <X size={18} />
                    </Button>
                  </div>
                ))}
              </div>
              
              {formData.imageUrls.length > 0 && formData.imageUrls.some(url => url) && (
                <div className="md:col-span-2">
                  <Label>Pré-visualização das Imagens</Label>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {formData.imageUrls.map((url, index) => (
                      url && (
                        <div key={`preview-${index}`} className="border rounded-md overflow-hidden h-48 bg-gray-50">
                          <img 
                            src={url} 
                            alt={`Pré-visualização ${index + 1}`} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Imagem+Inválida";
                            }}
                          />
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate("/admin")}>
                Cancelar
              </Button>
              <Button type="submit">
                {isEditing ? 'Salvar Alterações' : 'Adicionar Preço de Mercado'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMarketPriceForm;
