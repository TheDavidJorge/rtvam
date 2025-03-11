
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Instagram, Mail, Phone, MapPin } from 'lucide-react';

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
              <a href="#" className="text-white hover:text-rtam-red transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-rtam-red transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-rtam-red transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-rtam-red transition-colors">
                <Instagram className="w-5 h-5" />
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
                <Link to="/sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Nós
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
                <Link to="/noticias/mundo" className="text-gray-300 hover:text-white transition-colors">
                  Mundo
                </Link>
              </li>
              <li>
                <Link to="/noticias/sociedade" className="text-gray-300 hover:text-white transition-colors">
                  Sociedade
                </Link>
              </li>
              <li>
                <Link to="/noticias/cultura" className="text-gray-300 hover:text-white transition-colors">
                  Cultura
                </Link>
              </li>
              <li>
                <Link to="/noticias/educacao" className="text-gray-300 hover:text-white transition-colors">
                  Educação
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
                  Av. Eduardo Mondlane, nº 1234, Maputo, Moçambique
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-rtam-red" />
                <span className="text-gray-300">+258 21 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-rtam-red" />
                <a href="mailto:info@rtam.co.mz" className="text-gray-300 hover:text-white transition-colors">
                  info@rtam.co.mz
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
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link to="/termos" className="text-gray-400 text-sm hover:text-white transition-colors">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link to="/privacidade" className="text-gray-400 text-sm hover:text-white transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
