
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCityById } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const AdminCityForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;
  
  // Estado para o formulário
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    imageUrl: "",
  });
  
  // Carrega dados da cidade se estiver editando
  useEffect(() => {
    if (isEditing) {
      const city = getCityById(id);
      if (city) {
        setFormData({
          name: city.name,
          state: city.state,
          imageUrl: city.imageUrl,
        });
      }
    }
  }, [id, isEditing]);
  
  // Manipulador de mudança para os campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    if (!formData.name || !formData.state || !formData.imageUrl) {
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
      title: isEditing ? "Cidade atualizada" : "Cidade adicionada",
      description: isEditing 
        ? "A cidade foi atualizada com sucesso." 
        : "Uma nova cidade foi adicionada com sucesso.",
    });
    
    navigate("/admin");
  };
  
  // Lista de estados brasileiros
  const brazilianStates = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", 
    "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];
  
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
          {isEditing ? 'Editar Cidade' : 'Adicionar Nova Cidade'}
        </h1>
        <p className="text-gray-600">
          {isEditing 
            ? 'Atualize as informações da cidade abaixo.' 
            : 'Preencha o formulário abaixo para adicionar uma nova cidade.'}
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Cidade</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Cidade *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Marília"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">Estado *</Label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Selecione um estado</option>
                  {brazilianStates.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="imageUrl">URL da Imagem da Cidade *</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Ex: https://example.com/city-image.jpg"
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
                {isEditing ? 'Salvar Alterações' : 'Adicionar Cidade'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCityForm;
