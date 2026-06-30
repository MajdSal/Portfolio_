import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import MarqueeGrid from './sections/MarqueeGrid';
import About from './sections/About';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

const App = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#0C0C0C] font-kanit text-glass [overflow-x:clip]">
      <Navbar />
      <main className="[overflow-x:clip]">
        <Hero />
        <MarqueeGrid />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default App;
