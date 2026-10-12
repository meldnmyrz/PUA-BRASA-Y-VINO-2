import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Features11 Component (React Bits Pro Specification)
 * Split headline with three indexed cards for PÚA Brasa y Vino
 */
export default function Features11() {
  const cards = [
    {
      index: '01',
      metric: '600°C',
      title: 'Fuego Directo de Encino',
      desc: 'Sellado en parrilla a temperatura extrema que sella los jugos naturales y genera la costra caramelizada perfecta en cada corte Angus Prime.'
    },
    {
      index: '02',
      metric: '45 DÍAS',
      title: 'Cámara de Maduración en Seco',
      desc: 'Ambiente estrictamente controlado a 85% de humedad relativa y flujo de aire constante para maximizar la concentración de sabor y ternura.'
    },
    {
      index: '03',
      metric: '500+',
      title: 'Cava VIP & Sommelier',
      desc: 'Curaduría internacional con cosechas de Valle de Guadalupe, Rioja, Burdeos, Napa Valley y Champagne listos para maridar cada tiempo.'
    }
  ];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 mt-8 mb-20 md:my-28 z-10 relative text-center">
      
      {/* HEADLINE (CENTERED) */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
        <span className="text-xs font-semibold text-[#c49a4a] tracking-widest uppercase font-mono block">
          ESTÁNDARES DE CALIDAD PÚA
        </span>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-[#f8f9fa] font-sf-pro-display leading-[1.14]">
          MÁXIMA PRECISIÓN EN CADA CORTE Y ETIQUETA.
        </h2>

        <p className="text-body-apple text-[#c4c2b9] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto pt-1">
          Evaluamos cada parámetro de maduración en seco y control de temperatura en la brasa para garantizar consistencia, ternura extrema y el sello ahumado característico de PÚA.
        </p>

        <div className="pt-2 flex justify-center">
          <Link to="/nosotros" className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#c49a4a] hover:text-white transition-colors group">
            <span>Conoce nuestra filosofía del fuego →</span>
          </Link>
        </div>
      </div>

      {/* THREE COLUMNS (CENTERED CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 max-w-5xl mx-auto text-center">
        {cards.map((card) => {
          return (
            <div
              key={card.index}
              className="space-y-4 group cursor-default text-center flex flex-col items-center"
            >
              {/* METRIC DISPLAY & TITLE */}
              <div className="space-y-2 text-center">
                <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white block font-sf-pro-display group-hover:text-[#c49a4a] transition-colors text-center">
                  {card.metric}
                </span>
                <h3 className="text-xl font-semibold text-[#f8f9fa] font-sf-pro-display text-center">
                  {card.title}
                </h3>
              </div>

              {/* DESCRIPTION */}
              <p className="text-xs sm:text-sm text-[#c4c2b9] leading-relaxed text-center max-w-sm mx-auto">
                {card.desc}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
}
