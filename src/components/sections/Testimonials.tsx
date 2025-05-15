import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import SectionWrapper from '../ui/SectionWrapper';

const testimonials = [
  {
    id: 1,
    text: "Ce jubilé est une occasion unique de célébrer l'héritage spirituel qui nous a été transmis. Les témoignages des années passées continuent d'inspirer les nouvelles générations.",
    author: "Marie Diop",
    role: "Membre depuis 1990",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 2,
    text: "Cinquante années de grâce qui ont transformé non seulement des vies individuelles, mais des familles entières. C'est un témoignage puissant de la fidélité divine.",
    author: "Paul Sène",
    role: "Leader communautaire",
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    text: "J'ai grandi en écoutant les histoires des débuts. Aujourd'hui, je suis témoin de la continuité de cette œuvre extraordinaire qui traverse les générations.",
    author: "Sophie Ndiaye",
    role: "Deuxième génération",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const Testimonials = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (inView) {
      gsap.fromTo(
        '.testimonial-item',
        { 
          opacity: 0,
          y: 30
        },
        { 
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    }
  }, [inView]);

  return (
    <SectionWrapper id="testimonials" className="bg-white">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gold-100 text-gold-800 mb-4">
          Témoignages
        </span>
        <h2 className="section-title">Ils partagent leurs témoignages</h2>
        <p className="section-subtitle">
          Une vie au service des autres et avec un impact tangible.
        </p>
      </div>

      <div 
        ref={ref}
        className="relative max-w-4xl mx-auto px-4"
      >
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Navigation, EffectFade]}
          effect="fade"
          speed={800}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="testimonials-slider"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="testimonial-item bg-cream rounded-2xl p-8 md:p-12 shadow-lg">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 border-4 border-gold-200">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <Quote className="w-12 h-12 text-gold-400 mb-4" />
                    <blockquote className="text-lg md:text-xl text-dark-100 mb-6">
                      {testimonial.text}
                    </blockquote>
                    <div>
                      <cite className="not-italic">
                        <span className="block text-xl font-bold text-dark mb-1">{testimonial.author}</span>
                        <span className="text-gold-600">{testimonial.role}</span>
                      </cite>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-dark hover:text-gold-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500"
          aria-label="Témoignage précédent"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => swiperRef.current?.swiper.slideNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-dark hover:text-gold-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500"
          aria-label="Témoignage suivant"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </SectionWrapper>
  );
};

export default Testimonials;