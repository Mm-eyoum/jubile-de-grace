import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionWrapper from '../ui/SectionWrapper';

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    time: '09:00',
    title: 'Accueil et enregistrement',
    description: 'Accueil des invités et remise des badges participant'
  },
  {
    time: '10:00',
    title: 'Cérémonie d\'ouverture',
    description: 'Discours de bienvenue et présentation du programme du jubilé'
  },
  {
    time: '11:00',
    title: 'Témoignages et récits',
    description: 'Partage d\'expériences marquantes des 50 dernières années'
  },
  {
    time: '13:00',
    title: 'Déjeuner festif',
    description: 'Repas traditionnel sénégalais et échanges conviviaux'
  },
  {
    time: '15:00',
    title: 'Table ronde: L\'héritage',
    description: 'Discussion sur l\'impact et l\'héritage transmis aux futures générations'
  },
  {
    time: '17:00',
    title: 'Célébration musicale',
    description: 'Concert de louange et d\'adoration avec des artistes invités'
  },
  {
    time: '19:00',
    title: 'Gala de clôture',
    description: 'Dîner de gala, remise de prix honorifiques et cérémonie de clôture'
  }
];

const Timeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (!timelineRef.current) return;
    
    const timelineItems = timelineItemsRef.current.filter(Boolean) as HTMLDivElement[];
    
    timelineItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { 
          opacity: 0, 
          x: index % 2 === 0 ? -50 : 50 
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <SectionWrapper id="timeline" className="bg-cream">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gold-100 text-gold-800 mb-4">
          Programme de l'événement
        </span>
        <h2 className="section-title">Le déroulement du Jubilé</h2>
        <p className="section-subtitle">
          Découvre le programme complet de cette journée exceptionnelle qui 
          marquera le cinquantenaire de grâce.
        </p>
      </div>
      
      <div ref={timelineRef} className="relative">
        {/* Timeline center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gold-200 z-0"></div>
        
        {/* Timeline events */}
        <div className="relative z-10">
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              ref={el => timelineItemsRef.current[index] = el}
              className={`flex items-center justify-between mb-10 md:mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gold-500 hover:shadow-xl transition-shadow duration-300">
                  <span className="inline-block px-3 py-1 text-sm font-bold rounded-full bg-gold-100 text-gold-800 mb-2">
                    {event.time}
                  </span>
                  <h3 className="text-xl font-bold mb-2 text-dark">{event.title}</h3>
                  <p className="text-dark-100">{event.description}</p>
                </div>
              </div>
              
              {/* Center dot */}
              <div className="w-2/12 flex justify-center relative">
                <div className="w-6 h-6 bg-gold-500 rounded-full border-4 border-white shadow-md"></div>
              </div>
              
              {/* Empty space for alternating layout */}
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-12">
        <a 
          href="#registration" 
          className="btn btn-primary inline-flex items-center"
        >
          Réserver ma place
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </a>
      </div>
    </SectionWrapper>
  );
};

export default Timeline;