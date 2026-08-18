import React from 'react';

interface InspectionBannerProps {
  feature: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

const InspectionBanner: React.FC<InspectionBannerProps> = ({ feature, title, description, image, reverse }) => {
  return (
    <div className={`flex flex-col md:flex-row liquid-glass text-white rounded-3xl p-4 md:p-8 gap-8 max-w-7xl mx-auto my-12 border border-white/10 shadow-2xl ${reverse ? 'md:flex-row-reverse' : ''}`}>
      <div className="md:w-1/2 relative min-h-[300px] h-64 md:h-auto rounded-2xl overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center items-start">
        <span className="text-[#c19a5b] font-bold text-xs tracking-[0.2em] uppercase mb-4">
          {feature}
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-[#FDFBF7]" style={{ fontFamily: '"Montserrat", system-ui, sans-serif' }}>
          {title}
        </h2>
        <p className="text-[#d0d0d0] mb-10 text-base md:text-lg leading-relaxed font-medium">
          {description}
        </p>
        <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-neutral-200 transition-colors text-sm tracking-widest uppercase">
          Parcourir les motos
        </button>
      </div>
    </div>
  );
};

export default InspectionBanner;
