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
  const heroRef = useRef(null);
  const mobileIntroRef = useRef(null);
  const mobileBgRef = useRef(null);
  const desktopIntroRef = useRef(null);
  const desktopBgRef = useRef(null);
  const introFinishedRef = useRef(false);
  const [mobileIntroFinished, setMobileIntroFinished] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const navigate = useNavigate();

  const setupVideoNode = (videoEl) => {
    if (!videoEl) return;
    videoEl.muted = true;
    videoEl.defaultMuted = true;
    videoEl.playsInline = true;
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('webkit-playsinline', '');
    videoEl.setAttribute('muted', '');
  };

  const handleMobileIntroEnded = () => {
    if (mobileIntroRef.current) {
      mobileIntroRef.current.pause();
    }
    setMobileIntroFinished(true);
    if (mobileBgRef.current) {
      setupVideoNode(mobileBgRef.current);
      mobileBgRef.current.play().catch(() => {});
    }
  };

  const handleIntroEnded = () => {
    if (desktopIntroRef.current) {
      desktopIntroRef.current.pause();
      introFinishedRef.current = true;
    }
  };

  const handleIntroTimeUpdate = () => {
    if (desktopIntroRef.current) {
      if (
        desktopIntroRef.current.duration &&
        desktopIntroRef.current.currentTime >= desktopIntroRef.current.duration - 0.08
      ) {
        desktopIntroRef.current.pause();
        introFinishedRef.current = true;
      }
    }
  };

  useEffect(() => {
    document.title = "PÚA Brasa y Vino | Inicio — Sabores de Brasa & Cava VIP";

    // Inicializar propiedades muted/playsinline para compatibilidad estricta con iOS Safari
    setupVideoNode(mobileIntroRef.current);
    setupVideoNode(desktopIntroRef.current);
    setupVideoNode(desktopBgRef.current);
    setupVideoNode(mobileBgRef.current);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBackToTop(scrollY > 400);

      const hasScrolled = scrollY > 40;
      setIsScrolledDown(hasScrolled);

      if (hasScrolled) {
        if (mobileIntroRef.current && !mobileIntroRef.current.paused) {
          mobileIntroRef.current.pause();
        }
        if (desktopIntroRef.current && !desktopIntroRef.current.paused) {
          desktopIntroRef.current.pause();
        }
        if (mobileBgRef.current && mobileBgRef.current.paused) {
          setupVideoNode(mobileBgRef.current);
          mobileBgRef.current.play().catch(() => {});
        }
        if (desktopBgRef.current && desktopBgRef.current.paused) {
          setupVideoNode(desktopBgRef.current);
          desktopBgRef.current.play().catch(() => {});
        }
      } else {
        if (mobileIntroRef.current && mobileIntroRef.current.paused && !mobileIntroFinished) {
          setupVideoNode(mobileIntroRef.current);
          mobileIntroRef.current.play().catch(() => {});
        }
        if (desktopIntroRef.current && desktopIntroRef.current.paused && !introFinishedRef.current) {
          setupVideoNode(desktopIntroRef.current);
          desktopIntroRef.current.play().catch(() => {});
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Auto-play seguro: En móvil arranca SOLO el intro para evitar el botón nativo de play de iOS Safari
    const attemptPlay = () => {
      if (window.innerWidth < 768) {
        if (mobileIntroRef.current && !mobileIntroFinished) {
          setupVideoNode(mobileIntroRef.current);
          mobileIntroRef.current.play().catch(() => {});
        } else if (mobileBgRef.current) {
          setupVideoNode(mobileBgRef.current);
          mobileBgRef.current.play().catch(() => {});
        }
      } else {
        if (desktopIntroRef.current && !introFinishedRef.current) {
          setupVideoNode(desktopIntroRef.current);
          desktopIntroRef.current.play().catch(() => {});
        }
        if (desktopBgRef.current) {
          setupVideoNode(desktopBgRef.current);
          desktopBgRef.current.play().catch(() => {});
        }
      }
    };
    attemptPlay();

    const handleUserInteraction = () => {
      attemptPlay();
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
    };
    window.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true });
    window.addEventListener('click', handleUserInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
    };
  }, [mobileIntroFinished]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    const el = document.getElementById('statement-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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
    <div className="pt-0 pb-28 min-h-screen text-[#f5f7f5] bg-transparent relative overflow-x-clip font-sf-pro-text text-left">
      
      {/* ============================================================
          FONDO DE PÁGINA (SOLO VERSION WEB): VIDEO WEBSITE 2 EN LOOP CONTINUO
         ============================================================ */}
      <div className="hidden md:block fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <video
          ref={desktopBgRef}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className="w-full h-full object-cover"
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
          <source src="/website/website-2.mp4" type="video/mp4" />
          <source src="/website/website 2.MP4" type="video/mp4" />
        </video>
        {/* FILTRO SUTIL DE OSCURECIMIENTO / VIGNETTE PARA EL FONDO DEL SITIO */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.85) 100%)'
          }}
        />
      </div>

      {/* ============================================================
          FONDO DE PÁGINA (SOLO VERSION CELULAR): VIDEO PARTE 2 EN LOOP CONTINUO
         ============================================================ */}
      <div className="md:hidden fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <video
          ref={mobileBgRef}
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className="w-full h-full object-cover"
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
          <source src="/celular/parte-2-mobile.mp4" type="video/mp4" />
          <source src="/celular/Parte 2.MP4" type="video/mp4" />
          <source src="/celular/parte-2.mp4" type="video/mp4" />
        </video>
        {/* FILTRO SUTIL DE OSCURECIMIENTO / VIGNETTE PARA CELULAR */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.85) 100%)'
          }}
        />
      </div>

      {/* ============================================================
          01 HERO STAGE: INTRO LIMPIO SIN TEXTO
          DESKTOP: INTRO WEBSITE -> SE DETIENE EN PÚA
          MOBILE: INTRO -> AUTOPLAY LIMPIO
         ============================================================ */}
      <section 
        ref={heroRef} 
        className="relative w-full h-screen min-h-[100dvh] z-10 bg-transparent flex flex-col justify-between items-center overflow-hidden"
      >
        {/* BACKGROUND VIDEOS */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          
          {/* MOBILE VIDEO (CELULAR): PRIMERO INTRO */}
          <video
            ref={mobileIntroRef}
            autoPlay
            muted
            playsInline
            webkit-playsinline="true"
            preload="auto"
            onEnded={handleMobileIntroEnded}
            className={`md:hidden w-full h-full object-cover transition-opacity duration-700 ${
              mobileIntroFinished || isScrolledDown ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
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
              zIndex: 2,
            }}
          >
            <source src="/celular/intro-mobile.mp4" type="video/mp4" />
            <source src="/celular/Intro.MP4" type="video/mp4" />
            <source src="/celular/intro.mp4" type="video/mp4" />
          </video>

          {/* DESKTOP VIDEO (VERSION WEB): INTRO WEBSITE (SE DETIENE EN PÚA BRASA Y VINO) */}
          <video
            ref={desktopIntroRef}
            autoPlay
            muted
            playsInline
            webkit-playsinline="true"
            preload="auto"
            onEnded={handleIntroEnded}
            onTimeUpdate={handleIntroTimeUpdate}
            className={`hidden md:block w-full h-full object-cover transition-opacity duration-700 ${
              isScrolledDown ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
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
              zIndex: 2,
            }}
          >
            <source src="/website/intro-website.mp4" type="video/mp4" />
            <source src="/website/Intro website.MP4" type="video/mp4" />
          </video>
        </div>

        {/* ESPACIO SUPERIOR LIMPIO */}
        <div className="w-full pt-16 pointer-events-none" />

        {/* DESLIZA PARA EXPLORAR */}
        <div 
          onClick={handleScrollDown}
          className="relative z-20 pb-8 flex flex-col items-center justify-center gap-2 cursor-pointer select-none group transition-all duration-500"
        >
          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-[#d4d3c9] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] group-hover:text-white transition-colors">
            DESLIZA PARA EXPLORAR
          </span>
          <div className="w-8 h-8 rounded-full border border-white/25 bg-black/50 backdrop-blur-md flex items-center justify-center group-hover:border-[#c49a4a] group-hover:scale-110 transition-all shadow-xl animate-bounce">
            <ChevronDown className="w-4 h-4 text-white group-hover:text-[#c49a4a] transition-colors" />
          </div>
        </div>

      </section>

      {/* ============================================================
          02 SEGUNDO VIDEO (PARTE 2 / WEBSITE 2):
          AQUÍ SALE EL TEXTO, BAJADO Y CENTRADO SOBRE EL VIDEO DE FONDO
         ============================================================ */}
      <section 
        id="statement-section"
        className="relative w-full min-h-[85vh] md:min-h-screen z-10 flex flex-col justify-center items-center px-6 sm:px-12 text-center py-20 md:py-28"
      >
        <div className="max-w-3xl mx-auto space-y-6 text-center animate-fadeIn">
          <span className="text-xs sm:text-sm font-mono text-[#c49a4a] tracking-[0.28em] uppercase block font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            EL ARTE DE LA BRASA
          </span>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-sf-pro-display font-semibold tracking-[-0.02em] text-[#ffffff] leading-[1.15] drop-shadow-[0_4px_24px_rgba(0,0,0,0.98)]">
            EL RITUAL DEL FUEGO & LA CAVA.
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-[#f5f5f7] max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-[0_2px_16px_rgba(0,0,0,0.98)]">
            Cortes Angus Prime madurados en seco durante 45 días, sellados al fuego directo de encino a 600°C. Acompañados por una cava de más de 500 etiquetas internacionales curadas por sommelier.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <Link to="/reservas" className="btn-apple-blue font-semibold">
              <span>Reservar Mesa VIP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a 
              href="https://menu-pua.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-white-outline !text-xs font-semibold"
            >
              <span>Ver Menú Digital</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          03 REACT BITS PRO FEATURES 11: SPLIT HEADLINE (CENTRADO)
         ============================================================ */}
      <div id="features-section">
        <Features11 />
      </div>

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
