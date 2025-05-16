import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import SectionWrapper from '../ui/SectionWrapper';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });
  
  useEffect(() => {
    if (inView && formRef.current) {
      gsap.fromTo(
        formRef.current.elements,
        { 
          y: 20, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.5, 
          ease: "power2.out" 
        }
      );
    }
  }, [inView]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbydTFwvSzBAux-hnFuLMGBZLxULfi04PPDo0OtozxdYeJhKkyA9Vrd7EI_MFh59thudTQ/exec', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to submit registration');
        }

        setIsSubmitted(true);
        
        if (formRef.current) {
          gsap.to(formRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              gsap.to("#success-message", {
                y: 0,
                opacity: 1,
                duration: 0.5
              });
            }
          });
        }
      } catch (error) {
        console.error('Registration error:', error);
        setErrors({
          submit: 'Une erreur est survenue. Veuillez réessayer plus tard.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <SectionWrapper id="registration" className="bg-cream overflow-hidden relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold-200 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-100 rounded-full opacity-20 blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gold-100 text-gold-800 mb-4">
          Réservez votre place
        </span>
        <h2 className="section-title">Inscription au Jubilé de Grâce</h2>
        <p className="section-subtitle">
          Remplis le formulaire ci-dessous pour t'inscrire à cet événement exceptionnel.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto relative" ref={ref}>
        {!isSubmitted ? (
          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="bg-white p-8 md:p-10 rounded-lg shadow-xl border border-gold-100"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-dark font-medium mb-2">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input ${errors.name ? 'border-red-500 ring-red-200' : ''}`}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-red-500 text-sm">
                  {errors.name}
                </p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-dark font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input ${errors.email ? 'border-red-500 ring-red-200' : ''}`}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-red-500 text-sm">
                  {errors.email}
                </p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="phone" className="block text-dark font-medium mb-2">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+221 xx xxx xx xx"
                className={`input ${errors.phone ? 'border-red-500 ring-red-200' : ''}`}
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-red-500 text-sm">
                  {errors.phone}
                </p>
              )}
            </div>
            
            {errors.submit && (
              <p className="mb-4 text-red-500 text-sm text-center">
                {errors.submit}
              </p>
            )}
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary px-8 py-3 text-base md:text-lg font-medium relative overflow-hidden group"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Traitement en cours...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">Confirmer mon inscription</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div 
            id="success-message" 
            className="bg-white p-10 rounded-lg shadow-xl border border-gold-100 text-center opacity-0"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-dark mb-4">Inscription confirmée !</h3>
            <p className="text-lg text-dark-100 mb-6">
              Votre inscription au Jubilé de Grâce a été enregistrée avec succès.
              Vous recevrez un email de confirmation avec toutes les informations pratiques.
            </p>
            <p className="text-gold-600 font-medium">
              Nous avons hâte de vous accueillir le 2 janvier 2026 !
            </p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default Registration;