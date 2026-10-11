import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Flame, Wine, Calendar, ArrowRight, Sparkles, 
  MapPin, Phone, Plus, ChevronUp, ChevronDown, ChefHat, ArrowUpRight, Thermometer, Droplets, ShieldCheck, Award
} from 'lucide-react';
import { menuItems, menuCategories, restaurantInfo } from '../data/menuData';
import MenuItemCard from '../components/MenuItemCard';
import ParticleConstellation from '../components/ParticleConstellation';

import Features11 from '../components/Features11';

export default function HomePage({ onOpenItemModal, onAddToCart }) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);
  const heroRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "PÚA Brasa y Vino | Inicio — Sabores de Brasa & Cava VIP";
    
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const total = heroRef.current.offsetHeight - window.innerHeight;
        if (total > 0) {
          const progress = Math.min(Math.max(-rect.top / total, 0), 1);
          setHeroProgress(progress);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Auto-play hero videos for mobile and desktop
    const attemptPlay = () => {
      if (mobileVideoRef.current) {
        mobileVideoRef.current.play().catch(() => {});
      }
      if (desktopVideoRef.current) {
        desktopVideoRef.current.play().catch(() => {});
      }
    };
    attemptPlay();

    const handleFirstTouch = () => {
      attemptPlay();
      window.removeEventListener('touchstart', handleFirstTouch);
    };
    window.addEventListener('touchstart', handleFirstTouch, { once: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    if (heroRef.current) {
      const target = heroRef.current.offsetTop + (heroRef.current.offsetHeight - window.innerHeight) * 0.85;
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  const featuredDishes = [
    {
      id: "feat-1",
      name: "Tomahawk Angus Prime (45 Días de Maduración)",
      category: "cortes",
      price: 1350,
      description: "Corte grueso marmoleado con hueso, asado pacientemente al fuego de leña de encino y terminado con mantequilla de romero y sal marina ahumada.",
      image: "/assets/corte-filete-mignon.jpg",
      tags: ["Corte Insignia", "Maduración 45D"],
      pairing: "Gran Reserva Malbec / Cabernet Sauvignon",
      waitTime: "25 min"
    },
    {
      id: "feat-2",
      name: "Tuétanos a la Leña con Escamoles",
      category: "entradas",
      price: 420,
      description: "Canoas de tuétano rostizadas a fuego vivo de leña, montadas con escamoles a la mantequilla de epazote, perejil crocante y tortillas de comal.",
      image: "/assets/tuetanos-carne-brasas.jpg",
      tags: ["Especialidad del Fuego", "Tradición"],
      pairing: "Mezcal Espadín Ancestral / Tempranillo",
      waitTime: "15 min"
    },
    {
      id: "feat-3",
      name: "Tiradito de Atún Aleta Azul & Ponzu Trufado",
      category: "mariscos",
      price: 395,
      description: "Láminas frescas de atún aleta azul con emulsión de ponzu cítrico, aceite de ajonjolí tostado, trufa negra fresca y aguacate tatemado.",
      image: "/assets/tuna-sashimi-tiradito.jpg",
      tags: ["Especialidad del Mar", "Pesca del Día"],
      pairing: "Sauvignon Blanc Valle de Guadalupe",
      waitTime: "12 min"
    },
    {
      id: "feat-4",
      name: "Parrillada al Fuego de Encino (Master Grill)",
      category: "cortes",
      price: 1180,
      description: "Degustación selecta de cortes Prime asados a las brasas vivas, chistorra artesanal y guarnición de vegetales ahumados al sarmiento con chimichurri.",
      image: "/assets/parrillada-brasas.jpg",
      tags: ["Para Compartir", "Master Griller"],
      pairing: "Ribera del Duero Crianza",
      waitTime: "30 min"
    },
    {
      id: "feat-5",
      name: "Smoked Mezcalita Flameada de Autor",
      category: "mixologia",
      price: 260,
      description: "Destilado de agave artesanal infusionado con romero flameado al momento frente al comensal, licor de chile ancho y campana de humo de mezquite.",
      image: "/assets/mixologia-flameada-bar.jpg",
      tags: ["Mixología de Autor", "Flameado"],
      pairing: "Maridaje ideal para entradas y cortes a la leña",
      waitTime: "8 min"
    },
    {
      id: "feat-6",
      name: "Gran Cava Sommelier & Cosechas Privadas",
      category: "maridajes",
      price: 1450,
      description: "Selección curada de más de 500 etiquetas internacionales, servicio a temperatura controlada en cristalería Riedel y asesoría por nuestro sommelier.",
      image: "/assets/cava-vino-mesa.jpg",
      tags: ["Cava Privada", "Etiquetas VIP"],
      pairing: "Maridaje guiado en 5 tiempos de brasas",
      waitTime: "5 min"
    }
  ];

  return (
    <div className="pt-0 pb-28 min-h-screen text-[#f5f5f7] bg-[#000000] relative overflow-hidden font-sf-pro-text text-left">
      
      {/* ============================================================
          01 HERO STAGE: VIDEO EN EL FONDO (EL TEXTO APARECE SOBRE EL VIDEO AL HACER SCROLL)
         ============================================================ */}
      <section ref={heroRef} className="relative w-full h-[115vh] md:h-[130vh] z-10 bg-black">
        
        {/* STICKY STAGE A PANTALLA COMPLETA */}
        <div className="sticky top-0 h-screen h-[100dvh] w-full flex flex-col justify-center items-center overflow-hidden">

          {/* BACKGROUND VIDEO: PUA WR SOLO EN CELULAR / PUA BRAND OF EN ESCRITORIO */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* MOBILE VIDEO: PUA WR (SOLO EN CELULAR) */}
            <video
              ref={mobileVideoRef}
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true"
              preload="auto"
              className="md:hidden w-full h-full object-cover"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                minWidth: '100%',
                minHeight: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            >
              <source src="/assets/pua-wr.mp4" type="video/mp4" />
              <source src="/pua-wr.mp4" type="video/mp4" />
              <source src="/assets/PUA WR.MP4" type="video/mp4" />
              <source src="/PUA WR.MP4" type="video/mp4" />
            </video>

            {/* DESKTOP VIDEO: PUA BRAND OF (SOLO EN ESCRITORIO) */}
            <video
              ref={desktopVideoRef}
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true"
              preload="auto"
              className="hidden md:block w-full h-full object-cover"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                minWidth: '100%',
                minHeight: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            >
              <source src="/assets/pua-brand-of.mp4" type="video/mp4" />
              <source src="/pua-brand-of.mp4" type="video/mp4" />
              <source src="/assets/PUA BRAND OF.mp4" type="video/mp4" />
              <source src="/PUA BRAND OF.mp4" type="video/mp4" />
            </video>
          </div>

          {/* OSCURECIMIENTO SUAVE QUE SE INTENSIFICA AL HACER SCROLL PARA QUE EL TEXTO RESALTE */}
          <div 
            className="absolute inset-0 bg-black/60 pointer-events-none transition-opacity duration-200"
            style={{
              opacity: Math.min(Math.max((heroProgress - 0.05) * 1.8, 0), 0.72)
            }}
          />

          {/* COMPONENTE DE TEXTO: APARECE DIRECTAMENTE SOBRE EL FONDO DEL VIDEO AL HACER SCROLL */}
          <div 
            className="relative z-20 max-w-3xl mx-auto px-6 sm:px-12 text-center space-y-6 transition-all duration-300 pointer-events-none"
            style={{
              opacity: Math.min(Math.max((heroProgress - 0.08) / 0.45, 0), 1),
              transform: `translateY(${Math.max((0.5 - heroProgress) * 25, 0)}px)`,
            }}
          >
            <span className="text-xs font-mono text-[#c49a4a] tracking-[0.25em] uppercase block font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              EL ARTE DE LA BRASA
            </span>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-sf-pro-display font-semibold tracking-[-0.02em] text-[#ffffff] leading-[1.15] text-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.98)]">
              EL RITUAL DEL <br className="hidden sm:block" />
              <span className="text-[#ffffff]">FUEGO & LA CAVA.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-[#f5f5f7] max-w-2xl mx-auto leading-relaxed font-normal text-center drop-shadow-[0_2px_16px_rgba(0,0,0,0.98)]">
              Cortes Angus Prime madurados en seco durante 45 días, sellados al fuego directo de encino a 600°C. Acompañados por una cava de más de 500 etiquetas internacionales curadas por sommelier.
            </p>
          </div>

          {/* DESLIZA PARA EXPLORAR (VISIBLE AL INICIO, DESAPARECE AL HACER SCROLL) */}
          <div 
            onClick={handleScrollDown}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center gap-2 cursor-pointer select-none group transition-opacity duration-300"
            style={{
              opacity: Math.max(1 - heroProgress * 4, 0),
              pointerEvents: heroProgress < 0.18 ? 'auto' : 'none'
            }}
          >
            <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-[#d4d3c9] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] group-hover:text-white transition-colors">
              DESLIZA PARA EXPLORAR
            </span>
            <div className="w-8 h-8 rounded-full border border-white/25 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:border-[#c49a4a] group-hover:scale-110 transition-all shadow-xl animate-bounce">
              <ChevronDown className="w-4 h-4 text-white group-hover:text-[#c49a4a] transition-colors" />
            </div>
          </div>

        </div>

      </section>

      {/* ============================================================
          02 REACT BITS PRO FEATURES 11: SPLIT HEADLINE WITH 3 INDEXED CARDS
         ============================================================ */}
      <Features11 />

      {/* 03 WHITE MERCHANDISING CARD (#ffffff PAPER CANVAS WITH INK #1d1d1f TEXT) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 my-20 z-10 relative">
        <div className="card-white-merchandising p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[#1d1d1f] text-xs font-mono uppercase tracking-widest font-semibold block">
              EXPERIENCIA EXCLUSIVA DEL CHEF
            </span>
            <h2 className="text-card-heading sm:text-4xl text-[#1d1d1f] font-sf-pro-display font-semibold">
              Menú Degustación & Omakase de Brasas
            </h2>
            <p className="text-[#6e6e73] text-sm leading-relaxed max-w-xl">
              Disfruta de un recorrido guiado de 5 tiempos preparado frente a tus ojos por nuestro Master Griller, maridado paso a paso con cosechas exclusivas de nuestra cava subterránea.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link to="/reservas" className="btn-apple-blue font-semibold">
                <span>Reservar Omakase VIP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/servicios" className="inline-product-link text-xs font-semibold">
                Saber más sobre eventos privados →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[20px] overflow-hidden border border-[#e8e8ed] h-72">
              <img 
                src="/assets/corte-filete-mignon.jpg" 
                alt="Omakase de Brasas Púa" 
                className="w-full h-full object-cover filter brightness-95"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 04 SIGNATURE DISHES SHOWCASE & INTERACTIVE MENU DISH CARDS */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 my-20 z-10 relative">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono text-[#c49a4a] uppercase tracking-widest block font-semibold mb-2">
              SELECCIÓN DEL CHEF & SOMMELIER
            </span>
            <h2 className="text-section-heading text-[#f5f5f7]">
              PLATILLOS Y BEBIDAS DESTACADAS
            </h2>
          </div>
          <a 
            href="https://menu-pua.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-product-link text-sm font-semibold flex items-center gap-1.5"
          >
            <span>Ver Menú Completo</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDishes.map((dish) => (
            <MenuItemCard
              key={dish.id}
              item={dish}
              onClick={onOpenItemModal}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

      </section>

    </div>
  );
}
