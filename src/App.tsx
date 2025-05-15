import { useEffect } from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Timeline from './components/sections/Timeline';
import Gallery from './components/sections/Gallery';
import Testimonials from './components/sections/Testimonials';
import Registration from './components/sections/Registration';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import ScrollTopButton from './components/ui/ScrollTopButton';
import SEO from './components/SEO';
import AnimationProvider from './components/ui/AnimationProvider';
import ParticlesCanvas from './components/ui/ParticlesCanvas';

function App() {
  useEffect(() => {
    document.documentElement.classList.remove('no-js');
  }, []);

  return (
    <AnimationProvider selector="[data-animate]">
      <SEO />
      <ParticlesCanvas />
      <Header />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Gallery />
        <Testimonials />
        <Registration />
        <Contact />
      </main>
      <Footer />
      <ScrollTopButton />
    </AnimationProvider>
  );
}

export default App;