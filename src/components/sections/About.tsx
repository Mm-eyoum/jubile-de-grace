import SectionWrapper from '../ui/SectionWrapper';

const About = () => {
  return (
    <SectionWrapper id="about" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gold-100 text-gold-800 mb-4">
            À propos de l'événement
          </span>
          <h2 className="section-title">Un Jubilé exceptionnel de reconnaissance</h2>
          <p className="text-lg text-dark-100 mb-6">
            Le Jubilé de Grâce marque 50 années d'une histoire riche en témoignages 
            divins, en manifestations surnaturelles et en impact transformationnel 
            dans de nombreuses vies.
          </p>
          <p className="text-lg text-dark-100 mb-6">
            Cette célébration sera l'occasion de revenir sur le parcours extraordinaire 
            de foi, de persévérance et de dévotion du Pasteur Pacôme GUEI qui a touché plusieurs personnes 
            et continue d'inspirer aujourd'hui.
          </p>
          <div className="space-y-4 mt-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-dark mb-1">Célébration de la fidélité divine</h3>
                <p className="text-dark-100">Un temps pour reconnaître et honorer les multiples bénédictions reçues pendant ces 50 années.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-dark mb-1">Rassemblement pour rendre grâce à Dieu</h3>
                <p className="text-dark-100">Une occasion unique de réunir plusieurs personnes autour d'une reconnaissance commune de foi et de valeurs.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-dark mb-1">Impact et perspectives</h3>
                <p className="text-dark-100">Un regard sur l'héritage laissé et les perspectives d'avenir pour les générations futures.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="relative overflow-hidden rounded-lg shadow-xl">
            <img 
              src="https://i.ibb.co/V07nQTrV/MG-1282.jpg" 
              alt="Célébration du Jubilé de Grâce" 
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-4 py-2 bg-gold-500 text-dark font-medium rounded-full text-sm mb-2">
                2 Janvier 2026
              </span>
              <h3 className="text-xl font-serif font-bold text-white">
                Lieu à découvrir prochainement ✨
              </h3>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 w-24 h-24 md:w-32 md:h-32 bg-gold-500/20 rounded-full blur-2xl z-[-1]"></div>
          <div className="absolute -bottom-6 -left-6 w-28 h-28 md:w-40 md:h-40 bg-gold-500/20 rounded-full blur-2xl z-[-1]"></div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;