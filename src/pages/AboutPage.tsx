
import { Building, Calendar, CheckCircle2, FileText, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  return (
    <div className="container-custom py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Sobre o Leilão Fácil Imóvel</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Facilitando o acesso a imóveis em leilão da Caixa Econômica Federal com informações 
          claras e comparativos de mercado.
        </p>
      </div>
      
      {/* Nossa Missão */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-6">Nossa Missão</h2>
        <p className="text-gray-600 mb-4">
          O Leilão Fácil Imóvel foi criado para facilitar a busca e análise de imóveis disponíveis 
          em leilões da Caixa Econômica Federal. Nosso objetivo é proporcionar:
        </p>
        
        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <CheckCircle2 size={20} className="text-leilao-primary mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-600">
              Acesso simplificado às informações de imóveis em leilão
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 size={20} className="text-leilao-primary mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-600">
              Comparação direta com preços de mercado para venda e aluguel
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 size={20} className="text-leilao-primary mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-600">
              Visualização da localização dos imóveis em mapas interativos
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 size={20} className="text-leilao-primary mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-600">
              Links diretos para os anúncios originais para facilitar o processo
            </span>
          </li>
        </ul>
        
        <p className="text-gray-600">
          Acreditamos que a transparência de informações e a facilidade de comparação são essenciais 
          para que você possa tomar decisões mais informadas sobre investimentos imobiliários.
        </p>
      </div>
      
      {/* Como Funciona */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-6">Como Funciona</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex">
              <div className="mr-4 bg-leilao-light p-3 rounded-full">
                <Search size={24} className="text-leilao-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Encontre Imóveis</h3>
                <p className="text-gray-600">
                  Navegue por cidades ou use nossa busca para encontrar imóveis em leilão 
                  da Caixa Econômica Federal na região de seu interesse.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 bg-leilao-light p-3 rounded-full">
                <Building size={24} className="text-leilao-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">2. Analise os Detalhes</h3>
                <p className="text-gray-600">
                  Visualize informações detalhadas sobre o imóvel, incluindo preço, localização, 
                  data do leilão e características principais.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 bg-leilao-light p-3 rounded-full">
                <Calendar size={24} className="text-leilao-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">3. Compare Preços</h3>
                <p className="text-gray-600">
                  Compare o preço do leilão com preços de mercado para venda e aluguel no mesmo bairro, 
                  avaliando o potencial de economia ou retorno sobre investimento.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 bg-leilao-light p-3 rounded-full">
                <FileText size={24} className="text-leilao-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">4. Acesse o Anúncio Original</h3>
                <p className="text-gray-600">
                  Use os links diretos para acessar o anúncio original da Caixa Econômica Federal 
                  e obter informações completas sobre o processo de leilão.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-leilao-light p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Importante Saber</h3>
            
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Leilões da Caixa:</strong> Os leilões de imóveis da Caixa Econômica Federal 
                seguem regras específicas e exigem procedimentos formais para participação.
              </p>
              
              <p>
                <strong>Visita ao imóvel:</strong> Sempre recomendamos visitar o imóvel antes de 
                participar do leilão, quando possível.
              </p>
              
              <p>
                <strong>Documentação:</strong> Verifique toda a documentação do imóvel e 
                do processo de leilão antes de fazer um lance.
              </p>
              
              <p>
                <strong>Atualização de informações:</strong> As informações em nosso site são 
                atualizadas regularmente, mas sempre confirme os detalhes no site oficial da Caixa.
              </p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-leilao-primary/20">
              <p className="text-gray-600 italic mb-4">
                "O Leilão Fácil Imóvel é uma ferramenta de consulta e comparação. 
                As decisões de compra são de responsabilidade exclusiva do usuário."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="bg-leilao-primary text-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Pronto para Encontrar Oportunidades?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Explore nossa plataforma e descubra imóveis em leilão da Caixa Econômica Federal 
          com descontos significativos em relação ao mercado.
        </p>
        <Button asChild size="lg" className="bg-white text-leilao-primary hover:bg-leilao-light">
          <Link to="/cidades">
            Explorar Imóveis Disponíveis
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AboutPage;
