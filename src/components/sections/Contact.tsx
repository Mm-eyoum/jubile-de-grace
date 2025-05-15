import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin } from 'lucide-react';
import gsap from 'gsap';
import SectionWrapper from '../ui/SectionWrapper';

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  
  useEffect(() => {
    if (inView && formRef.current) {
      const elements = formRef.current.querySelectorAll('.animate-item');
      
      gsap.fromTo(
        elements,
        { 
          y: 30, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.7, 
          ease: "power2.out" 
        }
      );
    }
  }, [inView]);
  
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
    
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };
  
  const validateContactForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!contactForm.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!contactForm.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!contactForm.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }
    
    if (!contactForm.message.trim()) {
      newErrors.message = 'Le message est requis';
    }
    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateContactForm()) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        setIsSubmitting(false);
        setIsContactSubmitted(true);
        
        if (formRef.current) {
          gsap.to(formRef.current, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              gsap.to("#contact-success", {
                opacity: 1,
                y: 0,
                duration: 0.5
              });
            }
          });
        }
      }, 1500);
    }
  };
  
  return (
    <SectionWrapper id="contact" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" ref={ref}>
        <div>
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gold-100 text-gold-800 mb-4 animate-item">
            Partage ton témoignage
          </span>
          <h2 className="section-title animate-item">Toi aussi tu as un témoignage?</h2>
          <p className="text-lg text-dark-100 mb-8 animate-item">
            Partage le dès maintenant via ce formulaire et n'hésite pas à bénir le Seigneur Jésus pour le ministère de Son serviteur dans ta vie. Contacte nous également via ce numéro de téléphone :
          </p>
          
          <div className="space-y-6 mb-10">
            <div className="flex items-start space-x-4 animate-item">
              <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-gold-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-dark mb-1">Téléphone</h3>
                <p className="text-dark-100">
                  <a href="tel:+221781234567" className="hover:text-gold-600 transition-colors">
                    +221 78 123 45 67
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-cream p-8 rounded-lg shadow-lg relative">
            <div className="relative z-10">
              {!isContactSubmitted ? (
                <form ref={formRef} onSubmit={handleContactSubmit}>
                  
                  <div className="mb-4 animate-item">
                    <label htmlFor="name" className="block text-dark font-medium mb-2">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      className={`input ${formErrors.name ? 'border-red-500 ring-red-200' : ''}`}
                      aria-invalid={formErrors.name ? 'true' : 'false'}
                      aria-describedby={formErrors.name ? 'name-error' : undefined}
                    />
                    {formErrors.name && (
                      <p id="name-error" className="mt-1 text-red-500 text-sm">
                        {formErrors.name}
                      </p>
                    )}
                  </div>
      
                  <div className="mb-6 animate-item">
                    <label htmlFor="message" className="block text-dark font-medium mb-2">
                      Témoignage <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      rows={5}
                      className={`input ${formErrors.message ? 'border-red-500 ring-red-200' : ''}`}
                      aria-invalid={formErrors.message ? 'true' : 'false'}
                      aria-describedby={formErrors.message ? 'message-error' : undefined}
                    ></textarea>
                    {formErrors.message && (
                      <p id="message-error" className="mt-1 text-red-500 text-sm">
                        {formErrors.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="animate-item">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full py-3 text-base font-medium relative overflow-hidden group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                          </svg>
                          Envoi en cours...
                        </span>
                      ) : (
                        <>
                          <span className="relative z-10">Envoyer le message</span>
                          <span className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div 
                  id="contact-success" 
                  className="text-center py-8 opacity-0 transform translate-y-4"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-3">Témoignage envoyé !</h3>
                  <p className="text-dark-100 mb-6">
                    Merci d'avoir témoigné, que Dieu te bénisse.
                  </p>
                  <button 
                    onClick={() => {
                      setIsContactSubmitted(false);
                      setContactForm({
                        name: '',
                        email: '',
                        subject: '',
                        message: ''
                      });
                      
                      gsap.to("#contact-success", {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => {
                          if (formRef.current) {
                            gsap.to(formRef.current, {
                              opacity: 1,
                              duration: 0.5
                            });
                          }
                        }
                      });
                    }}
                    className="text-gold-600 font-medium hover:text-gold-800 transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              )}
            </div>
            
            <div className="absolute top-0 left-0 w-20 h-20 bg-gold-300/20 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold-300/10 rounded-full blur-xl translate-x-1/4 translate-y-1/4"></div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;