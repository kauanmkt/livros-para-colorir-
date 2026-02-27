/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  CheckCircle2, 
  Star, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Printer,
  Edit3,
  Infinity,
  ArrowRight,
  Users,
  Gift,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const container = ref.current;
      const items = container.children;
      if (items.length === 0) return;
      
      const gap = parseInt(window.getComputedStyle(container).gap) || 0;
      const itemWidth = (items[0] as HTMLElement).offsetWidth + gap; 
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.offsetWidth;
      
      let target;
      if (direction === 'left') {
        target = currentScroll - itemWidth;
        if (target < -itemWidth / 2) target = maxScroll;
      } else {
        target = currentScroll + itemWidth;
        if (target > maxScroll + itemWidth / 2) target = 0;
      }
      
      container.scrollTo({ 
        left: target, 
        behavior: 'smooth' 
      });
    }
  };

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('precos');
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500; // Slower duration in milliseconds
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      // EaseInOutQuad function
      const ease = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(animation);
    }
  };

  // Removed auto-scroll useEffect

  const [today, setToday] = useState(new Date().toLocaleDateString('pt-BR'));

  useEffect(() => {
    const timer = setInterval(() => {
      setToday(new Date().toLocaleDateString('pt-BR'));
    }, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(timer);
  }, []);

  const handleCheckout = (baseUrl: string) => {
    const searchParams = window.location.search;
    const separator = baseUrl.includes('?') ? '&' : '?';
    const finalUrl = searchParams ? `${baseUrl}${separator}${searchParams.substring(1)}` : baseUrl;
    window.location.href = finalUrl;
  };

  const faqs = [
    {
      q: "Preciso pagar Canva Pro?",
      a: "Não. O material foi desenvolvido para funcionar perfeitamente na versão gratuita do Canva."
    },
    {
      q: "Recebo em casa?",
      a: "Não. O acesso é 100% digital e imediato. Você recebe os links por e-mail logo após a confirmação do pagamento."
    },
    {
      q: "Posso usar para vender?",
      a: "Sim! Você pode personalizar os livrinhos e vender o produto físico impresso para seus clientes."
    },
    {
      q: "Posso imprimir quantas vezes quiser?",
      a: "Sim, o uso é ilimitado. Uma vez que você tem o arquivo, pode imprimir para quantos eventos ou alunos precisar."
    }
  ];

  const themes = [
    { img: "https://i.imgur.com/lcqUfxf.jpeg" },
    { img: "https://i.imgur.com/bexRYuw.png" },
    { img: "https://i.imgur.com/tYajoeS.png" },
    { img: "https://i.imgur.com/kX8eOaN.png" },
  ];

  return (
    <div className="min-h-screen bg-bg-soft text-text-main font-sans selection:bg-cta/30 text-center">
      {/* Urgency Header */}
      <div className="bg-brand text-white py-3 px-4 text-center shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="font-bold uppercase tracking-wider text-sm">
            ⏳ SOMENTE HOJE – DIA {today}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative pt-16 pb-20 px-6 overflow-hidden bg-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-8 text-brand">
              +150 LIVRINHOS DE COLORIR <span className="text-cta">PRONTOS PARA IMPRIMIR</span>
            </h1>

            {/* Video Field */}
            <div className="w-full max-w-[320px] mx-auto shadow-xl mb-10 border-4 border-white rounded-2xl overflow-hidden bg-black">
              {/* @ts-ignore */}
              <lite-video-player 
                video-id="18a834fe-aa93-428c-b851-93159f290d2a" 
                aspect-ratio="9:16" 
                base-url="https://app.litevideo.net" 
                params="aspectRatio=9%3A16&coverColor=%230f172a&progressSpeed=normal&progressBarHeight=4&showCover=true&coverStyle=gradient&playIconStyle=circle&playIconSize=medium&showTitle=false&showControls=false&showProgressBar=true&iconColor=%23ffffff&iconBackgroundColor=%23ffffff&iconBackgroundOpacity=30&progressBarColor=%2322c55e&controlsStyle=default&controlsPosition=bottom&controlsColor=%23ffffff&controlsBackground=gradient&hoverEffect=fade&thumbnailUrl=&endThumbnailUrl=&autoPlay=false&smartAutoPlay=false&loop=true&liveSimulatorEnabled=false&liveSimulatorViewersMin=10&liveSimulatorViewersMax=50&liveSimulatorGrowthRate=moderate&domainLockEnabled=false&domainLockDomains=&showComments=false&ctas=%5B%5D"
              ></lite-video-player>
            </div>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
              Edite no Canva, personalize com nome e idade e use para vender, festas ou sala de aula.
            </p>

            <div className="flex justify-center w-full">
              <a 
                href="#precos" 
                onClick={scrollToPricing}
                className="px-10 py-4 bg-cta hover:bg-cta-hover text-brand font-black rounded-xl text-lg shadow-lg shadow-cta/20 transition-all hover:scale-105 flex items-center gap-2"
              >
                QUERO MEU ACESSO AGORA <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Target Audience */}
      <section className="py-12 px-6 bg-bg-soft">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand">
              PARA QUEM É ESSE KIT?
            </h2>
            <p className="text-text-main/70 text-lg">Se você quer praticidade e variedade, esse material é para você.</p>
          </div>

          <div className="space-y-6 w-full max-w-2xl">
            {[
              { title: "PARA MÃES", desc: "Que querem lembrancinhas personalizadas gastando pouco" },
              { title: "PARA QUEM DESEJA VENDER", desc: "E ganhar renda extra com personalizados" },
              { title: "PARA PROFESSORAS", desc: "Que precisam de atividades criativas prontas" }
            ].map((item, i) => (
              <div 
                key={i}
                className="bg-white p-6 rounded-xl border border-brand/10 flex flex-col items-center justify-center gap-2 text-center shadow-sm"
              >
                <div>
                  <h4 className="font-bold text-brand text-lg">{item.title}</h4>
                  <p className="text-text-main/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand uppercase">
              O QUE VOCÊ VAI RECEBER
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 w-full">
            {[
              { icon: <BookOpen />, title: "+150 Livrinhos", desc: "organizados por temas" },
              { icon: <Edit3 />, title: "Arquivos editáveis", desc: "No Canva" },
              { icon: <Printer />, title: "Prontos para imprimir", desc: "Modelos prontos" },
              { icon: <Infinity />, title: "Uso ilimitado", desc: "Para sempre" }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-bg-soft rounded-2xl border border-brand/5 shadow-sm flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4 text-brand">
                  {item.icon}
                </div>
                <h4 className="font-bold text-sm md:text-base mb-1 text-brand">{item.title}</h4>
                <p className="text-text-main/60 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Theme Gallery Carousel */}
          <div className="relative w-full group">
            <div 
              ref={galleryRef}
              className="flex overflow-x-auto snap-x snap-proximity gap-4 pb-4 no-scrollbar"
            >
              {themes.map((theme, i) => (
                <div key={i} className="flex-none w-[280px] md:w-[320px] snap-center">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    <img 
                      src={theme.img} 
                      alt={`Amostra ${i + 1}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={() => scroll(galleryRef, 'left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 text-brand flex hover:scale-110 transition-transform z-10 border border-brand/10"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={() => scroll(galleryRef, 'right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 text-brand flex hover:scale-110 transition-transform z-10 border border-brand/10"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-bg-soft">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand uppercase">QUEM JÁ COMPROU APROVOU</h2>
          </div>

          {/* Feedback Carousel */}
          <div className="relative w-full group">
            <div 
              ref={feedbackRef}
              className="flex overflow-x-auto snap-x snap-proximity gap-6 pb-4 no-scrollbar"
            >
              {[
                "https://i.imgur.com/gTyH24E.png",
                "https://i.imgur.com/ywVlJX2.png",
                "https://i.imgur.com/13cGbjY.png",
                "https://i.imgur.com/0wWe0w6.png"
              ].map((img, i) => (
                <div key={i} className="flex-none w-[260px] md:w-[300px] snap-center">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand/10">
                    <img 
                      src={img} 
                      alt={`Feedback ${i + 1}`} 
                      className="w-full h-auto object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => scroll(feedbackRef, 'left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 text-brand flex hover:scale-110 transition-transform z-10 border border-brand/10"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={() => scroll(feedbackRef, 'right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 text-brand flex hover:scale-110 transition-transform z-10 border border-brand/10"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-brand uppercase">
              COMPRANDO HOJE VOCÊ GANHA:
            </h2>
            <p className="text-brand-secondary font-bold">Bônus exclusivos liberados imediatamente</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 w-full">
            {[
              { 
                title: "+100 Moldes de Personagens 3D", 
                img: "https://i.imgur.com/DQZ4Og9.png" 
              },
              { 
                title: "+100 Bobbie Goods Bíblico", 
                img: "https://bobbiegoods.lovable.app/lovable-uploads/c6b0b2c1-64c9-4c86-bd4e-a5b4b3575131.png" 
              },
              { 
                title: "+50 Quebra-Cabeça para imprimir", 
                img: "https://i.pinimg.com/1200x/21/2f/04/212f0484e6958a91dab7b295fff9afb4.jpg" 
              }
            ].map((bonus, i) => (
              <div key={i} className="bg-bg-soft rounded-3xl p-6 shadow-xl border border-brand/5 flex flex-col items-center group hover:scale-105 transition-all">
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-white">
                  <img 
                    src={bonus.img} 
                    alt={bonus.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="font-black text-brand text-lg mb-4 text-center leading-tight">
                  {bonus.title}
                </h4>
                <div className="mt-auto px-6 py-2 bg-green-100 text-green-600 rounded-full font-bold text-sm uppercase tracking-widest">
                  Grátis
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="py-16 px-6 bg-bg-soft scroll-mt-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand uppercase">ESCOLHA SEU PACOTE</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
            {/* Basic Plan */}
            <div className="bg-white rounded-3xl p-10 border border-brand/10 flex flex-col items-center shadow-sm">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-brand uppercase">PACOTE BÁSICO</h3>
              </div>
              <ul className="space-y-4 mb-8 flex-grow text-left w-full max-w-[200px] mx-auto">
                <li className="flex items-center gap-3 text-text-main/70">
                  <CheckCircle2 className="text-brand w-4 h-4 shrink-0" />
                  <span className="text-sm">+50 livrinhos editáveis</span>
                </li>
                <li className="flex items-center gap-3 text-text-main/70">
                  <CheckCircle2 className="text-brand w-4 h-4 shrink-0" />
                  <span className="text-sm">Acesso imediato</span>
                </li>
                <li className="flex items-center gap-3 text-red-500 font-medium">
                  <X className="w-4 h-4 shrink-0" />
                  <span className="text-sm">Nenhum Bônus</span>
                </li>
              </ul>
              <div className="mb-8">
                <div className="flex items-baseline gap-1 justify-center">
                  <span className="text-xl font-bold text-brand">R$</span>
                  <span className="text-5xl font-black text-brand">8,99</span>
                </div>
              </div>
              <button 
                onClick={() => setShowUpsell(true)}
                className="w-full py-4 bg-brand-secondary/10 text-brand rounded-xl font-bold hover:bg-brand-secondary/20 transition-all"
              >
                QUERO O PACOTE BÁSICO
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-3xl p-10 border-4 border-cta flex flex-col items-center relative shadow-xl shadow-cta/10">
              <div className="absolute top-4 bg-cta text-brand px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                Recomendado
              </div>
              <div className="mb-6 mt-4">
                <h3 className="text-2xl font-black text-brand uppercase">PACOTE PREMIUM</h3>
              </div>
              <ul className="space-y-4 mb-8 flex-grow text-left w-full max-w-[220px] mx-auto">
                <li className="flex items-center gap-3 text-text-main">
                  <CheckCircle2 className="text-brand w-4 h-4 shrink-0" />
                  <span className="text-sm">+150 livrinhos editáveis</span>
                </li>
                <li className="flex items-center gap-3 text-text-main">
                  <CheckCircle2 className="text-brand w-4 h-4 shrink-0" />
                  <span className="text-sm">Tutorial de montagem</span>
                </li>
                <li className="flex items-center gap-3 text-text-main">
                  <CheckCircle2 className="text-brand w-4 h-4 shrink-0" />
                  <span className="text-sm">Dicas de impressão</span>
                </li>
                <li className="flex items-center gap-3 text-text-main">
                  <CheckCircle2 className="text-brand w-4 h-4 shrink-0" />
                  <span className="text-sm">Atualizações futuras</span>
                </li>
                <li className="flex items-center gap-3 text-brand font-bold">
                  <Gift className="w-4 h-4 shrink-0" />
                  <span className="text-sm">Todos os Bônus inclusos</span>
                </li>
              </ul>
              <div className="mb-8">
                <div className="flex items-baseline gap-1 justify-center">
                  <span className="text-xl font-bold text-brand">R$</span>
                  <span className="text-5xl font-black text-brand">17,99</span>
                </div>
              </div>
              <button 
                onClick={() => handleCheckout('https://pay.lowify.com.br/checkout.php?product_id=NOoO32')}
                className="w-full py-4 bg-cta hover:bg-cta-hover text-brand rounded-xl font-black text-lg transition-all shadow-lg shadow-cta/20"
              >
                QUERO O PACOTE PREMIUM
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 px-6 bg-brand text-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-8 text-cta uppercase tracking-tight">
            GARANTIA DE 7 DIAS
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-4 max-w-2xl">
            Você pode acessar todo o material e testar. Se não gostar por qualquer motivo, devolvemos 100% do seu dinheiro dentro de 7 dias.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand uppercase">
              PERGUNTAS FREQUENTES
            </h2>
          </div>

          <div className="space-y-4 w-full">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-brand/5 rounded-xl overflow-hidden bg-bg-soft/30">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white transition-colors"
                >
                  <span className="font-bold text-text-main">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-brand transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-text-main/70 border-t border-brand/5 text-left">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t border-brand/10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <img 
            src="https://i.imgur.com/PMU4KYs.png" 
            alt="Footer Logo" 
            className="h-12 mb-6 grayscale opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-2 text-sm text-text-main/60">
            <p>Entrega imediata após confirmação de pagamento.</p>
            <p>Este produto não possui vínculo com marcas específicas de personagens.</p>
            <p>Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Upsell Popup */}
      <AnimatePresence>
        {showUpsell && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUpsell(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 overflow-hidden border-4 border-cta"
            >
              <button 
                onClick={() => setShowUpsell(false)}
                className="absolute top-4 right-4 p-2 hover:bg-bg-soft rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-text-main/30" />
              </button>

              <div className="text-center">
                <div className="inline-block px-4 py-1 bg-brand/10 text-brand rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                  DESCONTO EXCLUSIVO
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-brand mb-4 leading-tight">
                  ESPERE! LEVE O PACOTE PREMIUM COM DESCONTO
                </h3>
                <p className="text-text-main/70 mb-6">
                  Por apenas mais <span className="font-bold text-brand">R$ 4,00</span> você garante o acesso completo com todos os bônus e atualizações futuras.
                </p>

                <div className="bg-bg-soft p-6 rounded-2xl mb-8">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-text-main/30 line-through text-lg">R$ 17,99</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-brand">R$</span>
                      <span className="text-5xl font-black text-brand">12,99</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => handleCheckout('https://pay.lowify.com.br/go.php?offer=2joansk')}
                    className="w-full py-4 bg-cta hover:bg-cta-hover text-brand rounded-xl font-black text-lg transition-all shadow-lg shadow-cta/20"
                  >
                    SIM! QUERO O PREMIUM POR R$ 12,99
                  </button>
                  <button 
                    onClick={() => handleCheckout('https://pay.lowify.com.br/checkout?product_id=EzH8OI')}
                    className="w-full py-2 text-text-main/40 text-sm hover:text-text-main/60 transition-colors underline"
                  >
                    Não, prefiro continuar com o Plano Básico
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
