import React, { useState, useEffect } from 'react';
import {
  Check,
  ShieldCheck,
  Zap,
  Infinity as InfinityIcon,
  ChevronDown,
  Gift,
  Lock,
  ArrowRight,
  Sparkles,
  Download,
  Clock,
  Star,
  X
} from 'lucide-react';

// Image assets
import heroImg from './assets/images/hero_user_provided.jpg';
import dorImg from './assets/images/dor_user_provided.jpg';
import chickenImg from './assets/images/airfryer_crispy_chicken_1790715545188.jpg';
import salmonImg from './assets/images/airfryer_salmon_healthy_1790715559904.jpg';
import potatoesImg from './assets/images/airfryer_crispy_potatoes_1790715570547.jpg';
import dessertImg from './assets/images/airfryer_sweet_dessert_1790715581658.jpg';
import { carouselRow1, carouselRow2 } from './data/carouselImages';
import bonus1Img from './assets/images/bonuses_user/bonus1.jpeg';
import bonus2Img from './assets/images/bonuses_user/bonus2.jpeg';
import bonus3Img from './assets/images/bonuses_user/bonus3.jpeg';
import bonusExtra1Img from './assets/images/bonuses_user/bonus_extra1.jpeg';
import bonusExtra2Img from './assets/images/bonuses_user/bonus_extra2.jpeg';
import bonusExtra3Img from './assets/images/bonuses_user/bonus_extra3.jpeg';
import offerBundleImg from './assets/images/offer_bundle_user.jpeg';
import guaranteeSealImg from './assets/images/gold_guarantee_badge_1790971350263.jpg';
import avatarMarianaImg from './assets/images/avatar_mariana_1790971079695.jpg';
import avatarCarlosImg from './assets/images/avatar_carlos_1790971089396.jpg';
import avatarValeriaImg from './assets/images/avatar_valeria_1790971099457.jpg';

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);

  // 15-minute countdown timer in Latin Spanish
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    try {
      const saved = sessionStorage.getItem('bonus_timer_remaining');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return 15 * 60; // 15:00
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        const next = prev > 1 ? prev - 1 : 15 * 60;
        try {
          sessionStorage.setItem('bonus_timer_remaining', next.toString());
        } catch {
          // ignore
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timerHours = Math.floor(secondsRemaining / 3600);
  const timerMinutes = Math.floor((secondsRemaining % 3600) / 60);
  const timerSeconds = secondsRemaining % 60;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenCheckout = () => {
    setShowCheckoutModal(true);
    setOrderComplete(false);
  };

  const handleSimulatePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail) return;
    setOrderComplete(true);
  };

  const testimonials = [
    {
      name: 'Mariana Ruiz',
      location: 'Ciudad de México, México',
      avatar: avatarMarianaImg,
      recipe: 'Pollo crujiente al limón con finas hierbas',
      comment:
        'Antes solo usaba mi Air Fryer para recalentar papas congeladas. Ahora preparo almuerzos enteros en 20 minutos y a mis hijos les fascina. ¡El menú de 30 días y las salsas caseras me salvaron la rutina diaria!',
    },
    {
      name: 'Carlos Méndez',
      location: 'Santiago de Chile, Chile',
      avatar: avatarCarlosImg,
      recipe: 'Salmón glaseado con espárragos y papas rústicas',
      comment:
        'No tenía idea de la cantidad de cosas deliciosas que se podían preparar. Las recetas de 15 minutos para cuando llego cansado del trabajo son una maravilla; la comida queda tierna y bien crocante.',
    },
    {
      name: 'Valeria Gómez',
      location: 'Bogotá, Colombia',
      avatar: avatarValeriaImg,
      recipe: 'Brownie saludable de chocolate y snacks crocantes',
      comment:
        'Lo que más me sorprendió fue la lista de compras y la guía de congelación. Cocino una sola vez el fin de semana y tengo comidas listas y frescas sin ensuciar la cocina. Vale totalmente la pena.',
    },
  ];

  const faqs = [
    {
      q: '¿Cómo recibo las recetas?',
      a: 'Recibirás el acceso digital después de confirmar tu compra.',
    },
    {
      q: '¿Funciona con cualquier Air Fryer?',
      a: 'Sí. El tiempo puede variar ligeramente según cada modelo.',
    },
    {
      q: '¿Necesito saber cocinar?',
      a: 'No. Las recetas son simples y fáciles de seguir.',
    },
    {
      q: '¿Es una suscripción?',
      a: 'No. Realizas un único pago.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 font-sans antialiased selection:bg-amber-500 selection:text-white pb-12 overflow-x-hidden">
      {/* Banner estático verde */}
      <div className="bg-emerald-600 text-white text-center py-2.5 px-4">
        <p className="text-xs sm:text-sm font-bold tracking-wide">
          Oferta válida solo por hoy
        </p>
      </div>

      <main className="max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24 pt-4 sm:pt-8">
        {/* =========================================================================
            BLOCO 1 — HERO
            Objetivo: Fazer a pessoa entender imediatamente o que está sendo vendido.
           ========================================================================= */}
        <section id="hero" className="text-center pt-2">
          {/* Badge superior no estilo da referência */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 text-amber-800 text-[11px] sm:text-xs font-bold tracking-wide uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            <span>OFERTA LIMITADA - ACCESO INMEDIATO</span>
          </div>

          {/* Headline */}
          <h1 className="font-black text-3xl sm:text-4xl md:text-5xl text-stone-950 tracking-tight leading-[1.15] max-w-xl mx-auto">
            365 Recetas Deliciosas para Air Fryer
          </h1>

          {/* Subtítulo */}
          <p className="mt-2 font-black text-xl sm:text-2xl md:text-3xl text-amber-600 tracking-tight">
            + Bonos Exclusivos
          </p>

          {/* Subheadline com contraste proporcional */}
          <p className="mt-4 sm:mt-5 text-stone-500 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            <strong className="font-bold text-stone-950">Acceso inmediato</strong> a 365 recetas para Air Fryer con opciones para <strong className="font-bold text-stone-950">desayunos, almuerzos, cenas, snacks y postres</strong>. Contenido <strong className="font-bold text-stone-950">práctico, fácil de seguir y listo para usar</strong>, ideal para quienes quieren <strong className="font-bold text-stone-950">variar sus comidas, ahorrar tiempo</strong> y <strong className="font-bold text-stone-950">aprovechar mucho más su Air Fryer</strong>.
          </p>

          {/* Imagen principal del producto */}
          <div className="mt-6 relative mx-auto max-w-md">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 bg-white">
              <img
                src={heroImg}
                alt="365 Recetas Deliciosas para Air Fryer"
                referrerPolicy="no-referrer"
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>

          {/* Benefícios rápidos */}
          <div className="mt-6 bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-stone-200/80 shadow-xs max-w-md mx-auto">
            <ul className="grid grid-cols-2 gap-2.5 text-left text-sm text-stone-700 font-medium">
              <li className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span>Fáciles de preparar</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span>Para toda la familia</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span>Recetas para todo el día</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span>Acceso de por vida</span>
              </li>
            </ul>
          </div>

          {/* Botão */}
          <div className="mt-6">
            <button
              onClick={() => scrollToSection('oferta')}
              className="w-full max-w-md mx-auto bg-amber-600 hover:bg-amber-500 active:scale-[0.99] text-white font-heading font-bold text-base sm:text-lg py-4 px-6 rounded-xl shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>QUIERO DESCUBRIR LAS RECETAS</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* =========================================================================
            BLOCO 2 — IDENTIFICAÇÃO
            Título: “¿Tu Air Fryer siempre termina preparando lo mismo?”
           ========================================================================= */}
        <section id="identificacion" className="scroll-mt-20">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm max-w-xl mx-auto">
            {/* Título */}
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-stone-950 text-center leading-snug">
              ¿Tu Air Fryer siempre termina preparando lo mismo?
            </h2>

            {/* Imagem atraente de Air Fryer + comida (Dor / Identificación) */}
            <div className="mt-6 rounded-2xl overflow-hidden shadow-sm border border-stone-200">
              <img
                src={dorImg}
                alt="Air Fryer con comida crujiente y deliciosa"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] sm:aspect-[16/9] object-cover"
              />
            </div>

            {/* Colocar apenas a lista solicitada */}
            <ul className="mt-6 space-y-3.5 text-stone-700 text-base font-medium">
              <li className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 shrink-0">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </span>
                <span>Gastas demasiado en delivery</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 shrink-0">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </span>
                <span>Repites siempre las mismas recetas</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 shrink-0">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </span>
                <span>Quieres comidas rápidas y fáciles</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 shrink-0">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </span>
                <span>Quieres aprovechar mejor tu Air Fryer</span>
              </li>
            </ul>

            {/* Frase final */}
            <div className="mt-6 pt-5 border-t border-stone-100 text-center">
              <p className="font-heading font-bold text-lg sm:text-xl text-amber-700">
                Ahora tendrás una idea diferente para cada día del año.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            BLOCO 3 — O QUE ESTÁ INCLUÍDO
            Título: “365 ideas para disfrutar mucho más tu Air Fryer”
           ========================================================================= */}
        <section id="incluido" className="scroll-mt-20 text-center">
          {/* Pequeno banner escrito: La solución */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-black tracking-wider uppercase mb-3 border border-emerald-300 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>La solución</span>
          </div>

          {/* Título */}
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-stone-950 tracking-tight">
            365 ideas para disfrutar mucho más tu Air Fryer
          </h2>

          {/* Texto curto */}
          <p className="mt-3 text-stone-600 text-base max-w-lg mx-auto">
            Desde recetas simples para el día a día hasta comidas especiales para compartir.
          </p>

          {/* Carrossel automático de 2 andares com as imagens das receitas */}
          <div className="mt-8 relative overflow-hidden py-3 -mx-4 sm:-mx-6 md:-mx-10">
            {/* Efeito de fade nas bordas */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#faf8f5] to-transparent z-10"></div>
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#faf8f5] to-transparent z-10"></div>

            <div className="space-y-3.5 sm:space-y-4">
              {/* Andar 1 — Rola suavemente para a esquerda */}
              <div className="overflow-hidden">
                <div className="animate-marquee-left pause-on-hover flex gap-3 sm:gap-4">
                  {[...carouselRow1, ...carouselRow1].map((imgSrc, idx) => (
                    <div
                      key={`row1-${idx}`}
                      className="w-44 sm:w-60 aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-stone-200/90 bg-white shrink-0 hover:scale-[1.03] transition-transform duration-300"
                    >
                      <img
                        src={imgSrc}
                        alt={`Receta para Air Fryer ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Andar 2 — Rola suavemente para a direita */}
              <div className="overflow-hidden">
                <div className="animate-marquee-right pause-on-hover flex gap-3 sm:gap-4">
                  {[...carouselRow2, ...carouselRow2].map((imgSrc, idx) => (
                    <div
                      key={`row2-${idx}`}
                      className="w-44 sm:w-60 aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-stone-200/90 bg-white shrink-0 hover:scale-[1.03] transition-transform duration-300"
                    >
                      <img
                        src={imgSrc}
                        alt={`Receta para Air Fryer ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            DIVISOR ANTES DE LA SECCIÓN DE BONOS: FAIXA CINZA ESCURA FULL-WIDTH
           ========================================================================= */}
        <div className="pt-6 pb-2 text-center">
          {/* Faixa cinza escura cobrindo toda a lateral com fonte aumentada */}
          <div className="relative left-1/2 -translate-x-1/2 w-screen bg-stone-900 text-white py-4 sm:py-5 px-4 shadow-md flex items-center justify-center border-y border-stone-800">
            <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl tracking-wide uppercase text-white flex items-center justify-center gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl">👀</span>
              <span>ANTES DE QUE CONTINÚES...</span>
            </h3>
          </div>

          <div className="max-w-xl mx-auto px-4 mt-6 sm:mt-7">
            <p className="font-bold text-stone-900 text-base sm:text-lg md:text-xl leading-snug">
              Solo hoy, al elegir esta oferta, recibes como <span className="text-amber-600 font-black">BONOS</span> todos estos <span className="underline decoration-amber-500 decoration-2 underline-offset-4">MATERIALES</span>:
            </p>
            <div className="text-2xl sm:text-3xl mt-2.5 animate-bounce">
              👇
            </div>
          </div>
        </div>

        {/* =========================================================================
            BLOCO 4 — BÔNUS
            Mobile First — 1 card por linha, 4 cards com mockups Book + iPhone
           ========================================================================= */}
        <section id="bonos" className="scroll-mt-20 text-center">
          {/* 4 Cards otimizados para Mobile (1 card por linha) */}
          <div className="mt-5 flex flex-col gap-6 sm:gap-8 max-w-md sm:max-w-lg mx-auto text-center">
            {/* CARD 1: BONUS 1 */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/90 shadow-md flex flex-col items-center hover:border-amber-300 transition-colors">
              {/* Badge externo */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs sm:text-sm font-black uppercase tracking-wider border border-amber-300 shadow-2xs mb-3">
                🎁 BONUS 1 🎁
              </div>

              {/* Título acima do mockup */}
              <h3 className="font-heading font-black text-xl sm:text-2xl text-stone-950 leading-snug">
                Lista de Compras Inteligente
              </h3>

              {/* Mockup Book + iPhone */}
              <div className="mt-4 w-full max-w-[280px] sm:max-w-xs aspect-square rounded-2xl overflow-hidden shadow-xs border border-stone-200/80 bg-stone-50">
                <img
                  src={bonus1Img}
                  alt="Mockup Book e iPhone - Lista de Compras Inteligente"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Ancoragem de preço */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="text-red-500 line-through font-bold text-base sm:text-lg">
                  DE: US$17
                </span>
                <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-sm sm:text-base border border-emerald-300 shadow-xs">
                  HOY: GRATIS
                </span>
              </div>

              {/* Copy curta de 2 a 4 linhas */}
              <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
                Organiza tus compras de forma rápida, eficiente y sin olvidar ningún ingrediente esencial para tus recetas en Air Fryer. Ahorra tiempo y dinero en cada ida al supermercado.
              </p>
            </div>

            {/* CARD 2: BONUS 2 */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/90 shadow-md flex flex-col items-center hover:border-amber-300 transition-colors">
              {/* Badge externo */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs sm:text-sm font-black uppercase tracking-wider border border-amber-300 shadow-2xs mb-3">
                🎁 BONUS 2 🎁
              </div>

              {/* Título acima do mockup */}
              <h3 className="font-heading font-black text-xl sm:text-2xl text-stone-950 leading-snug">
                Menú Listo de 30 Días para Air Fryer
              </h3>

              {/* Mockup Book + iPhone */}
              <div className="mt-4 w-full max-w-[280px] sm:max-w-xs aspect-square rounded-2xl overflow-hidden shadow-xs border border-stone-200/80 bg-stone-50">
                <img
                  src={bonus2Img}
                  alt="Mockup Book e iPhone - Menú Listo de 30 Días para Air Fryer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Ancoragem de preço */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="text-red-500 line-through font-bold text-base sm:text-lg">
                  DE: US$27
                </span>
                <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-sm sm:text-base border border-emerald-300 shadow-xs">
                  HOY: GRATIS
                </span>
              </div>

              {/* Copy curta de 2 a 4 linhas */}
              <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
                Un mes completo de comidas planificadas para que nunca más te preguntes qué cocinar hoy. Variedad deliciosa garantizada para todos los días del mes sin complicaciones.
              </p>
            </div>

            {/* CARD 3: BONUS 3 */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/90 shadow-md flex flex-col items-center hover:border-amber-300 transition-colors">
              {/* Badge externo */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs sm:text-sm font-black uppercase tracking-wider border border-amber-300 shadow-2xs mb-3">
                🎁 BONUS 3 🎁
              </div>

              {/* Título acima do mockup */}
              <h3 className="font-heading font-black text-xl sm:text-2xl text-stone-950 leading-snug">
                Guía de Congelación y Recalentamiento
              </h3>

              {/* Mockup Book + iPhone */}
              <div className="mt-4 w-full max-w-[280px] sm:max-w-xs aspect-square rounded-2xl overflow-hidden shadow-xs border border-stone-200/80 bg-stone-50">
                <img
                  src={bonus3Img}
                  alt="Mockup Book e iPhone - Guía de Congelación y Recalentamiento"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Ancoragem de preço */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="text-red-500 line-through font-bold text-base sm:text-lg">
                  DE: US$17
                </span>
                <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-sm sm:text-base border border-emerald-300 shadow-xs">
                  HOY: GRATIS
                </span>
              </div>

              {/* Copy curta de 2 a 4 linhas */}
              <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
                Aprende las técnicas exactas para conservar y recalentar tus platos manteniendo el sabor fresco, la textura crujiente y todos los nutrientes como recién hechos.
              </p>
            </div>

            {/* CARD 4: +3 BONOS */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-300 shadow-lg flex flex-col items-center">
              {/* Badge externo */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500 text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-xs mb-3">
                🎁 +3 BONOS 🎁
              </div>

              {/* Mockups agrupados (3 bônus) */}
              <div className="w-full grid grid-cols-3 gap-2 sm:gap-3 items-center">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xs border border-stone-200/80 bg-stone-50">
                  <img
                    src={bonusExtra1Img}
                    alt="30 Condimentos y Salsas para Variar los Sabores"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-amber-400 bg-stone-50 scale-105 z-10">
                  <img
                    src={bonusExtra2Img}
                    alt="50 Recetas Listas en Hasta 15 Minutos"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xs border border-stone-200/80 bg-stone-50">
                  <img
                    src={bonusExtra3Img}
                    alt="+40 Cenas Románticas para Parejas"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Lista dos 3 bônus com check verde */}
              <ul className="mt-5 w-full space-y-3 text-left bg-amber-50/70 rounded-2xl p-4 sm:p-5 border border-amber-200/80">
                <li className="flex items-start gap-2.5 text-stone-800 text-sm sm:text-base font-semibold">
                  <span className="text-emerald-600 font-bold shrink-0 text-base">✅</span>
                  <span>30 Condimentos y Salsas para Variar los Sabores</span>
                </li>
                <li className="flex items-start gap-2.5 text-stone-800 text-sm sm:text-base font-semibold">
                  <span className="text-emerald-600 font-bold shrink-0 text-base">✅</span>
                  <span>50 Recetas Listas en Hasta 15 Minutos</span>
                </li>
                <li className="flex items-start gap-2.5 text-stone-800 text-sm sm:text-base font-semibold">
                  <span className="text-emerald-600 font-bold shrink-0 text-base">✅</span>
                  <span>+40 Cenas Románticas para Parejas</span>
                </li>
              </ul>

              {/* Ancoragem de preço */}
              <div className="mt-5 flex items-center justify-center gap-3">
                <span className="text-red-500 line-through font-bold text-base sm:text-lg">
                  VALOR TOTAL: US$57
                </span>
                <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-sm sm:text-base border border-emerald-300 shadow-xs">
                  HOY: GRATIS
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            BLOCO 5 — CARD PRINCIPAL DA OFERTA (ESTILO REFERÊNCIA)
            ESTE DEVE SER O BLOCO DE MAIOR DESTAQUE DA PÁGINA.
            O PREÇO DEVE APARECER SOMENTE AQUI.
           ========================================================================= */}
        <section id="oferta" className="scroll-mt-20">
          <div className="relative mx-auto max-w-xl">
            {/* Outer container com estilo verde-oliva da referência */}
            <div className="bg-[#3b4834] p-3 sm:p-5 rounded-[2.5rem] shadow-2xl">
              {/* Card principal em tom creme / marfim premium */}
              <div className="bg-[#FAF8F2] rounded-[2rem] border border-stone-200/90 shadow-xl overflow-hidden pb-8 text-center">
                
                {/* 1. Cronômetro / Faixa de Urgência no topo do card */}
                <div className="bg-white/90 backdrop-blur-xs py-3 px-4 border-b border-stone-200/80 flex items-center justify-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E53935] flex items-center justify-center text-white shadow-xs shrink-0">
                    <Clock className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] sm:text-xs font-black tracking-widest text-amber-700 uppercase leading-none">
                      OFERTA EXPIRA EN
                    </div>
                    <div className="mt-0.5 font-heading font-black text-xl sm:text-2xl text-stone-900 tracking-wider tabular-nums leading-tight">
                      {String(timerHours).padStart(2, '0')} : {String(timerMinutes).padStart(2, '0')} : {String(timerSeconds).padStart(2, '0')}
                    </div>
                  </div>
                </div>

                {/* 2. Mockup dos Produtos no topo */}
                <div className="p-4 sm:p-6 pb-2">
                  <div className="w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-sm border border-stone-200/70 bg-white p-1 sm:p-2">
                    <img
                      src={offerBundleImg}
                      alt="365 Recetas en Air Fryer - Mockup Completo de la Oferta"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>
                </div>

                {/* 3. Título verde em destaque máximo como na referência */}
                <div className="px-5 sm:px-8 mt-3">
                  <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#27AE60] tracking-tight uppercase leading-snug">
                    365 RECETAS EN AIR FRYER<br />
                    <span className="text-[#1e824c]">(CON MUCHO SABOR)®</span>
                  </h2>
                </div>

                {/* 4. Lista itemizada com linhas pontilhadas e preços ancorados à direita */}
                <div className="mt-6 px-5 sm:px-8">
                  <div className="divide-y divide-dashed divide-stone-300 border-t border-b border-dashed border-stone-300 py-1 text-left text-sm sm:text-base text-stone-800">
                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[#27AE60] font-black text-base shrink-0">✔</span>
                        <span className="font-semibold text-stone-900">Acceso completo en App + PDF</span>
                      </div>
                      <span className="font-black text-stone-950 shrink-0">US$ 37</span>
                    </div>

                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[#27AE60] font-black text-base shrink-0">✔</span>
                        <span className="font-medium text-stone-800">Lista de Compras Inteligente</span>
                      </div>
                      <span className="font-black text-stone-950 shrink-0">US$ 20</span>
                    </div>

                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[#27AE60] font-black text-base shrink-0">✔</span>
                        <span className="font-medium text-stone-800">Menú Listo de 30 Días para Air Fryer</span>
                      </div>
                      <span className="font-black text-stone-950 shrink-0">US$ 27</span>
                    </div>

                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[#27AE60] font-black text-base shrink-0">✔</span>
                        <span className="font-medium text-stone-800">Guía de Congelación y Recalentado</span>
                      </div>
                      <span className="font-black text-stone-950 shrink-0">US$ 17</span>
                    </div>

                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[#27AE60] font-black text-base shrink-0">✔</span>
                        <span className="font-medium text-stone-800">30 Condimentos y Salsas para Variar Sabores</span>
                      </div>
                      <span className="font-black text-stone-950 shrink-0">US$ 19</span>
                    </div>

                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[#27AE60] font-black text-base shrink-0">✔</span>
                        <span className="font-medium text-stone-800">50 Recetas Listas en Hasta 15 Minutos</span>
                      </div>
                      <span className="font-black text-stone-950 shrink-0">US$ 19</span>
                    </div>

                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[#27AE60] font-black text-base shrink-0">✔</span>
                        <span className="font-medium text-stone-800">+40 Cenas Románticas para Parejas</span>
                      </div>
                      <span className="font-black text-stone-950 shrink-0">US$ 17</span>
                    </div>

                    <div className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[#27AE60] font-black text-base shrink-0">✔</span>
                        <span className="font-medium text-stone-800">Guía de Limpieza y Cuidado Air Fryer</span>
                      </div>
                      <span className="font-black text-stone-950 shrink-0">US$ 10</span>
                    </div>
                  </div>

                  {/* 5. Linha de Valor Total com Risco Vermelho */}
                  <div className="mt-4 pt-3 pb-2 flex items-center justify-between text-base sm:text-lg font-bold text-stone-900 border-b-2 border-stone-200">
                    <span className="font-heading font-black text-stone-950">Valor total</span>
                    <span className="line-through text-[#D32F2F] font-heading font-black text-2xl sm:text-3xl">US$ 166</span>
                  </div>
                </div>

                {/* 6. Bloco "Hoy, solo hoy:" e Preço em Destaque */}
                <div className="mt-6 px-5 sm:px-8 text-center">
                  <p className="font-heading font-black text-xl sm:text-2xl text-stone-900">
                    Hoy, solo hoy:
                  </p>
                  <div className="text-[#27AE60] font-heading font-extrabold text-lg sm:text-xl tracking-wide uppercase mt-1">
                    por solo
                  </div>
                  {/* E logo abaixo, em destaque máximo: US$7,90 (ÚNICA VEZ EM TODA A PÁGINA) */}
                  <div className="font-heading font-black text-5xl sm:text-6xl text-[#27AE60] tracking-tight leading-none my-2">
                    US$7,90
                  </div>
                  <p className="font-heading font-black text-stone-900 text-sm sm:text-base tracking-wide uppercase">
                    PAGO ÚNICO • ACCESO DE POR VIDA
                  </p>
                  <p className="text-stone-500 font-medium text-xs sm:text-sm mt-1">
                    Sin mensualidades ni costos adicionales
                  </p>
                </div>

                {/* 7. Botão Grande de Alta Conversão */}
                <div className="mt-6 px-5 sm:px-8">
                  <a
                    href="https://pay.hotmart.com/W107906430Q?checkoutMode=10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 active:scale-[0.99] text-white font-heading font-black text-lg sm:text-xl py-4 sm:py-5 px-6 rounded-2xl shadow-xl shadow-amber-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                  >
                    <span>¡SÍ! QUIERO APROVECHAR AHORA</span>
                    <ArrowRight className="w-6 h-6 stroke-[3]" />
                  </a>
                </div>

                {/* 8. Selos de Segurança e Confiança */}
                <div className="mt-6 pt-5 pb-1 border-t border-stone-200/80 px-5 sm:px-8 flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-stone-600 font-bold flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>Pago 100% Seguro</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-600 fill-amber-600" />
                    <span>Acceso Inmediato</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Garantía de 7 Días</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECCIÓN DE GARANTÍA (COMPACTA - 7 DÍAS)
            NÃO mostrar preço nesse bloco.
           ========================================================================= */}
        <section id="garantia" className="scroll-mt-20">
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
              {/* Selo oficial de garantia de 7 dias ampliado */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 flex items-center justify-center">
                <img
                  src={guaranteeSealImg}
                  alt="Garantía de 7 Días"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>

              {/* Texto enxuto e direto */}
              <div className="flex-1">
                <h3 className="font-heading font-black text-xl sm:text-2xl text-stone-950 leading-snug">
                  Garantía Total de 7 Días
                </h3>
                <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
                  Pruébalo con tu familia. Si por cualquier motivo no te encanta, te devolvemos el <strong>100% de tu dinero</strong> de inmediato y sin preguntas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECCIÓN DE TESTIMONIOS
            NÃO mostrar preço nesse bloco.
           ========================================================================= */}
        <section id="testimonios" className="scroll-mt-20">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center">
              {/* Badge superior */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-wider uppercase mb-3 border border-amber-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Resultados Reales</span>
              </div>

              {/* Título da seção */}
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-stone-950 tracking-tight">
                Lo que dicen quienes ya están cocinando
              </h2>

              {/* Subtítulo com Estrelas */}
              <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <span className="font-heading font-bold text-stone-900 text-sm sm:text-base">
                  4.9/5
                </span>
                <span className="text-stone-500 text-xs sm:text-sm">
                  (+1.200 opiniones de clientes verificados)
                </span>
              </div>
            </div>

            {/* Cards de Depoimentos */}
            <div className="space-y-4">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-xs text-left transition-all hover:shadow-md"
                >
                  {/* Cabeçalho do Card */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar com foto de perfil e badge verificado */}
                      <div className="relative shrink-0">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-full object-cover border-2 border-stone-200/90 shadow-xs"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-xs">
                          <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-stone-900 text-base leading-tight">
                          {t.name}
                        </h3>
                        <p className="text-xs text-stone-500">{t.location}</p>
                      </div>
                    </div>

                    {/* Badge Compra Verificada */}
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Verificado</span>
                    </div>
                  </div>

                  {/* Estrelas */}
                  <div className="mt-3 flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>

                  {/* Texto do depoimento */}
                  <p className="mt-3 text-stone-700 text-sm sm:text-base leading-relaxed">
                    “{t.comment}”
                  </p>

                  {/* Tag da receita favorita */}
                  <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/70 shrink-0">
                      Receta favorita:
                    </span>
                    <span className="font-medium text-stone-700 truncate">{t.recipe}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chamada para ação pós-depoimentos */}
            <div className="text-center pt-2">
              <button
                onClick={() => scrollToSection('oferta')}
                className="w-full bg-amber-600 hover:bg-amber-500 active:scale-[0.99] text-white font-heading font-black text-base sm:text-lg py-4 px-6 rounded-2xl shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span>QUIERO MIS 365 RECETAS Y BONOS AHORA</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            BLOCO 6 — FAQ
            NÃO mostrar preço nesse bloco.
           ========================================================================= */}
        <section id="faq" className="scroll-mt-20">
          <div className="max-w-xl mx-auto space-y-12">
            {/* FAQ curto */}
            <div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-stone-950 text-center tracking-tight mb-6">
                Preguntas Frecuentes
              </h2>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 text-left font-heading font-bold text-base sm:text-lg text-stone-900 flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-amber-600' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-stone-600 text-sm sm:text-base leading-relaxed border-t border-stone-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer minimalista e limpo */}
      <footer className="mt-16 text-center text-xs text-stone-500 border-t border-stone-200/70 pt-8 px-4">
        <p>© 2026 365 Recetas Deliciosas para Air Fryer. Todos los derechos reservados.</p>
        <p className="mt-1 text-stone-400">Entrega digital inmediata tras confirmar tu pedido.</p>
      </footer>

      {/* Interactive Modal for Checkout / Digital Delivery */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!orderComplete ? (
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-black text-2xl text-stone-950">
                  Acceso Inmediato
                </h3>
                <p className="text-stone-600 text-sm mt-1">
                  Ingresa tu correo para recibir tus 365 recetas y los 6 bonos exclusivos al instante.
                </p>

                <form onSubmit={handleSimulatePurchase} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. María González"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-stone-900 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="tucorreo@ejemplo.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-stone-900 text-sm"
                    />
                    <span className="text-[11px] text-stone-500 mt-1 block">
                      Aquí te enviaremos el enlace de descarga seguro.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-amber-600 hover:bg-amber-500 text-white font-heading font-bold text-base py-3.5 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>CONFIRMAR Y OBTENER ACCESO</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-4 text-xs text-stone-500 pt-2">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Pago 100% Seguro
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      Entrega Instantánea
                    </span>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="font-heading font-black text-2xl text-stone-950">
                  ¡Acceso Concedido!
                </h3>
                <p className="text-stone-600 text-sm mt-2">
                  Hemos enviado las credenciales de acceso a <strong className="text-stone-900">{customerEmail}</strong>.
                </p>
                <div className="mt-6 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left text-xs text-stone-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-stone-900">
                    <Download className="w-4 h-4 text-amber-600" />
                    Paquete listo para descarga:
                  </div>
                  <p>✓ 365 Recetas Deliciosas para Air Fryer</p>
                  <p>✓ 6 Bonos Exclusivos Incluidos</p>
                </div>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="w-full mt-6 bg-stone-900 hover:bg-stone-800 text-white font-heading font-bold py-3.5 rounded-xl transition-colors cursor-pointer"
                >
                  CERRAR Y VOLVER A LA PÁGINA
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
