import { useState, useRef, useEffect } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import SectionWrapper from '../ui/SectionWrapper';

const allImages = [
  {
    id: 1,
    src: 'https://i.ibb.co/SX7WBcCY/U3A8478.jpg',
    alt: 'Célébration communautaire',
    aspectRatio: '4/3',
    width: 1200,
    height: 900,
    loading: 'eager' as const
  },
  {
    id: 2,
    src: 'https://i.ibb.co/ds5Wxqsv/MG-1293.jpg',
    alt: 'Célébration de jubilé',
    aspectRatio: '3/4',
    width: 900,
    height: 1200,
    loading: 'lazy' as const
  },
  {
    id: 3,
    src: 'https://i.ibb.co/xqcLjs79/U3A8459.jpg',
    alt: 'Moments de joie',
    aspectRatio: '4/3',
    width: 1200,
    height: 900,
    loading: 'lazy' as const
  },
  {
    id: 4,
    src: 'https://i.ibb.co/QvjxNRdY/U3A8475.jpg',
    alt: 'Louange et adoration',
    aspectRatio: '16/9',
    width: 1600,
    height: 900,
    loading: 'lazy' as const
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Rassemblement familial',
    aspectRatio: '4/3',
    width: 1200,
    height: 900,
    loading: 'lazy' as const
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/2014775/pexels-photo-2014775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Transmission intergénérationnelle',
    aspectRatio: '3/4',
    width: 900,
    height: 1200,
    loading: 'lazy' as const
  },
  {
    id: 7,
    src: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Moments de prière',
    aspectRatio: '4/3',
    width: 1200,
    height: 900,
    loading: 'lazy' as const
  },
  {
    id: 8,
    src: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Communion fraternelle',
    aspectRatio: '3/4',
    width: 900,
    height: 1200,
    loading: 'lazy' as const
  },
  {
    id: 9,
    src: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Moments de partage',
    aspectRatio: '4/3',
    width: 1200,
    height: 900,
    loading: 'lazy' as const
  },
  {
    id: 10,
    src: 'https://images.pexels.com/photos/2422278/pexels-photo-2422278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Témoignages vivants',
    aspectRatio: '16/9',
    width: 1600,
    height: 900,
    loading: 'lazy' as const
  },
  {
    id: 11,
    src: 'https://images.pexels.com/photos/2422283/pexels-photo-2422283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Moments de grâce',
    aspectRatio: '4/3',
    width: 1200,
    height: 900,
    loading: 'lazy' as const
  },
  {
    id: 12,
    src: 'https://images.pexels.com/photos/2422287/pexels-photo-2422287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Héritage spirituel',
    aspectRatio: '3/4',
    width: 900,
    height: 1200,
    loading: 'lazy' as const
  }
];

const Gallery = () => {
  const [visibleImages, setVisibleImages] = useState(allImages.slice(0, 4));
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const loadMoreImages = () => {
    setLoading(true);
    
    setTimeout(() => {
      const nextImages = allImages.slice(visibleImages.length, visibleImages.length + 4);
      setVisibleImages(prev => [...prev, ...nextImages]);
      setLoading(false);
    }, 800);
  };
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver(() => {
      containerRef.current?.style.setProperty('--masonry-gap', '24px');
    });
    
    resizeObserver.observe(containerRef.current);
    
    return () => resizeObserver.disconnect();
  }, []);
  
  return (
    <SectionWrapper id="gallery" className="bg-white">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gold-100 text-gold-800 mb-4">
          Souvenirs et moments forts
        </span>
        <h2 className="section-title">Galerie d'images</h2>
        <p className="section-subtitle">
          Une image vaut mille mots dit-on, découvre quelques captures du Pasteur.
        </p>
      </div>
      
      <PhotoProvider
        speed={() => 800}
        easing={(type) => type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)'}
        maskOpacity={0.8}
        maskClassName="backdrop-blur-sm"
        loadingElement={
          <div className="flex items-center justify-center w-full h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold-500 border-t-transparent"></div>
          </div>
        }
      >
        <div 
          ref={containerRef}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          role="region"
          aria-label="Galerie de photos"
        >
          {visibleImages.map(image => (
            <div 
              key={image.id}
              className="break-inside-avoid"
            >
              <PhotoView src={image.src}>
                <div 
                  className="relative cursor-zoom-in overflow-hidden rounded-lg shadow-md group transition-transform duration-300 hover:-translate-y-1"
                  role="button"
                  aria-label={`Voir ${image.alt} en plein écran`}
                  style={{ aspectRatio: image.aspectRatio }}
                >
                  <img 
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading={image.loading}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-white font-medium text-lg">{image.alt}</h3>
                      <p className="text-gold-100 text-sm">Cliquez pour agrandir</p>
                    </div>
                  </div>
                </div>
              </PhotoView>
            </div>
          ))}
        </div>
      </PhotoProvider>
      
      {visibleImages.length < allImages.length && (
        <div className="text-center mt-12">
          <button
            onClick={loadMoreImages}
            disabled={loading}
            className="btn btn-primary relative overflow-hidden group"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Chargement...
              </span>
            ) : (
              <>
                <span className="relative z-10">Voir plus d'images</span>
                <span className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
              </>
            )}
          </button>
        </div>
      )}
    </SectionWrapper>
  );
};

export default Gallery;