
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-leilao-primary text-white mt-12">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Leilão Fácil Imóvel</h3>
            <p className="mb-4">
              Facilitando o acesso a imóveis de leilão da Caixa Econômica Federal, 
              com informações claras e comparativos de mercado.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone size={18} className="mr-2" />
                <span>(XX) XXXXX-XXXX</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2" />
                <span>contato@leilaofacilimovel.com.br</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="mr-2" />
                <span>Localização</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Informações</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-leilao-secondary transition-colors">
                  Como funcionam os leilões
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-leilao-secondary transition-colors">
                  Dúvidas frequentes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-leilao-secondary transition-colors">
                  Política de privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-leilao-dark pt-4 mt-6 text-center">
          <p>© {currentYear} Leilão Fácil Imóvel. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
