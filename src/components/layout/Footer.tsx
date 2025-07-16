
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Instagram, Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rtam-blue-dark text-white pt-12 pb-6 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Rádio e TV Académica</h3>
            <p className="text-gray-300 mb-4">
              A sua principal fonte de informação e entretenimento acadêmico em Moçambique.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/RtvamOficial" target="_blank" rel="noopener noreferrer" className="text-white hover:text-rtam-red transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/RtvamOficial" target="_blank" rel="noopener noreferrer" className="text-white hover:text-rtam-red transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@radioetelevisaoacademica" target="_blank" rel="noopener noreferrer" className="text-white hover:text-rtam-red transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/rtvamoficial/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-rtam-red transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@rtvam" target="_blank" rel="noopener noreferrer" className="text-white hover:text-rtam-red transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/noticias" className="text-gray-300 hover:text-white transition-colors">
                  Notícias
                </Link>
              </li>
              <li>
                <Link to="/radio" className="text-gray-300 hover:text-white transition-colors">
                  Rádio
                </Link>
              </li>
              <li>
                <Link to="/tv" className="text-gray-300 hover:text-white transition-colors">
                  TV Directo
                </Link>
              </li>
              <li>
                <Link to="/tva" className="text-gray-300 hover:text-white transition-colors">
                  TVA
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/noticias/desporto" className="text-gray-300 hover:text-white transition-colors">
                  Desporto
                </Link>
              </li>
              <li>
                <Link to="/noticias/nacionais" className="text-gray-300 hover:text-white transition-colors">
                  Nacionais
                </Link>
              </li>
              <li>
                <Link to="/noticias/cultura" className="text-gray-300 hover:text-white transition-colors">
                  Cultura
                </Link>
              </li>
              <li>
                <Link to="/noticias/economia" className="text-gray-300 hover:text-white transition-colors">
                  Economia
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contactos</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-rtam-red" />
                <span className="text-gray-300">
                  Zona do Estoril, Estrada Carlos Pereira, Beira
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-rtam-red" />
                <span className="text-gray-300">+258 21 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-rtam-red" />
                <a href="mailto:info@rtvam.co.mz" className="text-gray-300 hover:text-white transition-colors">
                  info@rtvam.co.mz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Rádio e Televisão Académica de Moçambique. Todos os direitos reservados.
            </p>
            <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Globe className="w-4 h-4" />
                <span>Website designed por</span>
                <a 
                  href="https://davidjorge.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-rtam-red hover:text-white transition-colors font-medium"
                >
                  David Jorge
                </a>
              </div>
              <div className="flex space-x-6">
                <Link to="/termos" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Termos de Uso
                </Link>
                <Link to="/privacidade" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
