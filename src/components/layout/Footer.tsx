import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-gold-300">Jubilé de Grâce</h3>
            <p className="mb-4 text-gray-300">
              Célébration et reconnaissance pour 50 années de grâce divine, un jubilé exceptionnel à Dakar.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-gold-300">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-gray-300 hover:text-gold-300 transition-colors">Accueil</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-gold-300 transition-colors">À propos</a></li>
              <li><a href="#timeline" className="text-gray-300 hover:text-gold-300 transition-colors">Programme</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-gold-300 transition-colors">Galerie</a></li>
              <li><a href="#registration" className="text-gray-300 hover:text-gold-300 transition-colors">Inscription</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-gold-300 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-gold-300">Informations Légales</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-gold-300 transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-300 transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-300 transition-colors">Mentions légales</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-300 transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-700 text-center text-gray-400">
          <p className="flex items-center justify-center">
            © {currentYear} Jubilé de Grâce. Tous droits réservés. Créé avec <Heart size={16} className="mx-1 text-gold-300" /> à Dakar.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;