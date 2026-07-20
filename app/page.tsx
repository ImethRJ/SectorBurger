"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const BURGER_MENU = [
  {
    id: "b1",
    name: "The Jaffna Fire-Cracker",
    description: "Crispy beef smash patties dripping with roasted Sri Lankan chili paste, dark roasted curry powder infusion, and melted cheddar.",
    price: "Rs. 1,450",
    spiceLevel: 5,
    spiceLabel: "Nai Miris Level",
    tags: ["Signature", "Fiery"],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "b2",
    name: "Seeni Sambol Glazed Melt",
    description: "Premium beef patties layered with a thick, slow-caramelized sweet and spicy Seeni Sambol relish, topped with a perfectly laced fried egg.",
    price: "Rs. 1,550",
    spiceLevel: 2,
    spiceLabel: "Mild Katta",
    tags: ["Chef Special", "Sweet & Savory"],
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "b3",
    name: "Pol Sambol Crispy Clucker",
    description: "Buttermilk fried chicken breast dredged in island spices, loaded with freshly scraped lime-infused Pol Sambol and cool coconut mayo.",
    price: "Rs. 1,350",
    spiceLevel: 3,
    spiceLabel: "Classic Island Spice",
    tags: ["Crunchy"],
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "b4",
    name: "The Sector Double Stack",
    description: "Our signature blend double beef stack, Kochchi green chili cheese spread, pickled red onions, served on a toasted brioche bun.",
    price: "Rs. 1,750",
    spiceLevel: 4,
    spiceLabel: "Kochchi Kick",
    tags: ["Heavyweight"],
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=600&auto=format&fit=crop"
  }
];

export default function SectorHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen || cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, cartOpen]);

  const addToCart = (burgerId: string) => {
    const burger = BURGER_MENU.find((b) => b.id === burgerId);
    setCart((prev) => {
      const existing = prev.find((item) => item.id === burgerId);
      if (existing) {
        return prev.map((item) =>
          item.id === burgerId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: burgerId, quantity: 1 }];
    });

    if (burger) {
      setToast(`Added "${burger.name}" to your bag`);
      setTimeout(() => setToast(null), 3500);
    }
  };

  const updateQuantity = (burgerId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === burgerId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { id: string; quantity: number }[]
    );
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
  };

  const subtotalPrice = cart.reduce((sum, item) => {
    const burger = BURGER_MENU.find((b) => b.id === item.id);
    return sum + (burger ? parsePrice(burger.price) * item.quantity : 0);
  }, 0);

  const deliveryFee = totalCartCount > 0 ? 350 : 0;
  const totalPrice = subtotalPrice + deliveryFee;

  // Modern Native Scroll Logic targeting element viewports directly
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // 1. Immediately drop the drawer state out of view
    setMobileMenuOpen(false); 
    
    // 2. Queue the navigation transition immediately after the animation frame clears
    requestAnimationFrame(() => {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }
      }, 50); 
    });
  };

  return (
    <>
      {/* Target anchor wrapper top boundary */}
      <div id="home" />

      {/* GLOBAL BANNER CAPSULATION */}
      <div className="w-full bg-sector-charcoal text-sector-turmeric text-center py-2 text-xs tracking-widest font-bold px-4 max-w-[1920px] mx-auto">
        CRISPY SMASH BARS & LANKAN SPICE COLLIDE. OPEN DAILY 11 AM - 11 PM.
      </div>

      {/* RESPONSIVE HEADER CONTAINER */}
      <header className="sticky top-0 z-40 bg-sector-offwhite/90 backdrop-blur-md border-b border-sector-charcoal/10 w-full max-w-[1920px] mx-auto">
        <div className="px-4 py-4 md:px-8 xl:px-12 max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Branding */}
          <a href="#home" onClick={(e) => handleScroll(e, "home")} className="text-2xl font-black tracking-tighter text-sector-charcoal flex items-center gap-1">
            SECTOR<span className="text-sector-turmeric font-extrabold text-3xl">.</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm tracking-wide text-sector-charcoal">
            <a href="#menu" onClick={(e) => handleScroll(e, "menu")} className="hover:text-sector-cinnamon transition-colors">THE MENU</a>
            <a href="#story" onClick={(e) => handleScroll(e, "story")} className="hover:text-sector-cinnamon transition-colors">OUR VIBE</a>
            <span className="opacity-40 cursor-not-allowed">SECTOR SQUAD</span>
            <span className="opacity-40 cursor-not-allowed">LOCATIONS</span>
          </nav>

          {/* Action CTA & Shopping Bag Trigger */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => {
                const el = document.getElementById("menu");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-sector-charcoal text-white text-xs md:text-sm font-bold tracking-tight px-5 py-2.5 rounded-none border border-sector-charcoal hover:bg-sector-turmeric hover:text-sector-charcoal transition-all duration-300 uppercase"
            >
              ORDER NOW
            </button>
            <button 
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-sector-turmeric text-sector-charcoal text-xs md:text-sm font-black tracking-tight px-4 py-2.5 hover:bg-sector-charcoal hover:text-sector-turmeric transition-all duration-300 uppercase"
              aria-label="View Bag"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>BAG ({totalCartCount})</span>
            </button>
          </div>

          {/* Mobile Actions Container */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-sector-charcoal focus:outline-none flex items-center gap-1 font-mono text-xs font-bold"
              aria-label="Open Bag"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalCartCount > 0 && (
                <span className="bg-sector-turmeric text-sector-charcoal rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburg Trigger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-sector-charcoal relative focus:outline-none"
              aria-label="Toggle Menu"
            >
              <div className="space-y-1.5 w-6">
                <span className={`block h-0.5 bg-current transform transition duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 bg-current transition duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 bg-current transform transition duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fixed Full-Screen Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-sector-offwhite text-sector-charcoal p-6 sm:p-8 flex flex-col justify-between lg:hidden overflow-y-auto animate-slide-down">
          {/* Mobile Overlay Top Header Bar */}
          <div className="flex items-center justify-between border-b border-sector-charcoal/10 pb-5">
            <a 
              href="#home" 
              onClick={(e) => handleScroll(e, "home")} 
              className="text-2xl font-black tracking-tighter text-sector-charcoal flex items-center gap-1"
            >
              SECTOR<span className="text-sector-turmeric font-extrabold text-3xl">.</span>
              <span className="text-[10px] tracking-widest text-sector-charcoal/50 uppercase ml-2 font-mono">Colombo Smash</span>
            </a>

            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-sector-charcoal hover:text-sector-cinnamon transition-colors focus:outline-none"
              aria-label="Close menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6 my-auto py-8">
            <a 
              href="#menu" 
              onClick={(e) => handleScroll(e, "menu")} 
              className="group flex items-baseline gap-4 text-3xl font-black tracking-tight text-sector-charcoal border-b border-sector-charcoal/10 pb-4 transition-colors hover:text-sector-cinnamon"
            >
              <span className="text-xs font-mono text-sector-cinnamon">01 /</span> THE MENU
            </a>
            <a 
              href="#story" 
              onClick={(e) => handleScroll(e, "story")} 
              className="group flex items-baseline gap-4 text-3xl font-black tracking-tight text-sector-charcoal border-b border-sector-charcoal/10 pb-4 transition-colors hover:text-sector-cinnamon"
            >
              <span className="text-xs font-mono text-sector-cinnamon">02 /</span> OUR VIBE
            </a>
            <span className="group flex items-baseline gap-4 text-3xl font-black tracking-tight text-sector-charcoal/30 border-b border-sector-charcoal/5 pb-4 cursor-not-allowed">
              <span className="text-xs font-mono text-sector-charcoal/20">03 /</span> SECTOR SQUAD
            </span>
            <span className="group flex items-baseline gap-4 text-3xl font-black tracking-tight text-sector-charcoal/30 border-b border-sector-charcoal/5 pb-4 cursor-not-allowed">
              <span className="text-xs font-mono text-sector-charcoal/20">04 /</span> LOCATIONS
            </span>
          </nav>

          {/* Bottom Footer Info & CTA */}
          <div className="pt-6 border-t border-sector-charcoal/10">
            <div className="grid grid-cols-2 gap-4 text-xs tracking-wider text-sector-charcoal/70 font-bold uppercase mb-6">
              <div>
                <span className="text-sector-cinnamon block mb-1 text-[10px]">Hours</span>
                Daily 11 AM - 11 PM
              </div>
              <div>
                <span className="text-sector-cinnamon block mb-1 text-[10px]">Squad HQ</span>
                Colombo, Sri Lanka
              </div>
            </div>
            
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setTimeout(() => {
                  const el = document.getElementById("menu");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="w-full bg-sector-charcoal text-white font-black py-4 text-center tracking-widest text-xs uppercase hover:bg-sector-turmeric hover:text-sector-charcoal transition-colors duration-300"
            >
              START ORDER
            </button>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT WRAPPER CONTAINER */}
      <main className="flex-grow w-full max-w-[1920px] mx-auto overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="px-4 py-6 md:px-8 xl:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
            <div className="bg-sector-cinnamon text-white p-6 md:p-12 lg:col-span-7 flex flex-col justify-between min-h-[320px] md:min-h-[420px] relative overflow-hidden">
              <div className="z-10">
                <span className="text-sector-turmeric uppercase font-bold tracking-widest text-xs block mb-3">
                  Sri Lankan Street Burger Culture
                </span>
                <h1 className="text-3xl xs:text-4xl md:text-5xl xl:text-6xl font-black tracking-tighter leading-none uppercase max-w-xl">
                  Spiced<span className="text-sector-turmeric">.</span> <br />
                  Stacked<span className="text-sector-turmeric">.</span> <br />
                  Smashed<span className="text-sector-turmeric">.</span>
                </h1>
              </div>
              <p className="text-sm md:text-base text-gray-300 max-w-md z-10 mt-6 lg:mt-0">
                We take core premium smashed beef and crispy chicken architecture, then load it with authentic Nai Miris cheese, hot Seeni Sambol caramelization, and fresh coconut relishes.
              </p>
              <div className="absolute right-[-10%] bottom-[-20%] text-[12rem] font-black text-white/[0.03] select-none pointer-events-none">
                SCTR
              </div>
            </div>

            <div className="relative min-h-[240px] md:min-h-[300px] lg:min-h-full lg:col-span-5 overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop"
                alt="Signature Jaffna Fire-Cracker Burger Showcase"
                fill
                priority={true}
                loading="eager"
                unoptimized={process.env.NODE_ENV === 'development'}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sector-charcoal/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <span className="text-sector-turmeric font-bold text-xs tracking-wider uppercase">Hot Spotlight</span>
                <h3 className="text-white text-xl font-bold tracking-tight">The Jaffna Fire-Cracker</h3>
              </div>
            </div>
          </div>
        </section>

        {/* TARGET SECTION 1: MENU */}
        <section 
          id="menu" 
          className="bg-sector-charcoal text-white py-12 px-4 md:px-8 xl:px-12 mt-8 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase">THE BURGER GRID</h2>
                <p className="text-gray-400 text-xs md:text-sm mt-1">Select an item below to customize your native spice heat setting.</p>
              </div>
            </div>

            <div className="flex overflow-x-auto pb-6 gap-4 snap-x snap-mandatory scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6 sm:overflow-x-visible sm:pb-0">
              {BURGER_MENU.map((burger) => (
                <div 
                  key={burger.id} 
                  className="bg-[#1a1a1a] border border-white/5 flex-shrink-0 w-[280px] xs:w-[300px] sm:w-auto snap-start flex flex-col justify-between group transition-all duration-300 hover:border-sector-turmeric/30"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image 
                      src={burger.image} 
                      alt={burger.name}
                      fill
                      priority={true}
                      loading="eager"
                      unoptimized={process.env.NODE_ENV === 'development'}
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                      sizes="(max-width: 640px) 300px, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>

                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-base md:text-lg font-black tracking-tight leading-tight uppercase group-hover:text-sector-turmeric transition-colors">
                          {burger.name}
                        </h3>
                        <span className="text-sector-turmeric font-extrabold text-sm bg-white/5 px-2 py-0.5">
                          {burger.price}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-3 mb-4">
                        {burger.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5">
                      <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1.5 font-mono">
                        <span>{burger.spiceLabel}</span>
                        <span className="font-bold text-white">{burger.spiceLevel} / 5</span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-1.5 flex-grow ${i < burger.spiceLevel ? 'bg-sector-kochchi' : 'bg-white/10'}`}
                          />
                        ))}
                      </div>
                      <button 
                        onClick={() => addToCart(burger.id)}
                        className="w-full mt-4 bg-white text-sector-charcoal text-xs font-bold py-2.5 uppercase rounded-none hover:bg-sector-turmeric hover:text-sector-charcoal transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        ADD TO BAG
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TARGET SECTION 2: STORY */}
        <section 
          id="story" 
          className="px-4 py-16 md:px-8 xl:px-12 max-w-7xl mx-auto scroll-mt-20"
        >
          <div className="flex flex-col md:flex-row items-stretch gap-8 lg:gap-12">
            <div className="relative w-full min-h-[250px] sm:min-h-[350px] md:w-1/2 overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800&auto=format&fit=crop"
                alt="Culinary chef assembly of local ingredients"
                fill
                priority={true}
                loading="eager"
                unoptimized={process.env.NODE_ENV === 'development'}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <span className="text-sector-cinnamon font-black text-xs tracking-widest uppercase mb-2 block">
                The Culmination
              </span>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter uppercase leading-none text-sector-charcoal mb-4">
                WESTERN STYLE.<br />ISLAND DNA.
              </h2>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed mb-6">
                Born out of pure frustration with boring, uninspired fast-food burgers, Sector redefines the baseline menu configuration. We fuse premium aged smash meats with localized street culinary processes. 
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-sector-charcoal text-white/40 text-xs py-8 px-4 border-t border-white/5 w-full max-w-[1920px] mx-auto">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2026 SECTOR Restaurants Sri Lanka. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-sector-charcoal text-white px-5 py-3.5 shadow-2xl border-l-4 border-sector-turmeric flex items-center gap-3 animate-fade-in-up">
          <span className="text-sector-turmeric font-black text-lg">✓</span>
          <span className="text-xs font-bold tracking-wide">{toast}</span>
          <button 
            onClick={() => {
              setToast(null);
              setCartOpen(true);
            }} 
            className="ml-3 text-xs underline text-sector-turmeric font-bold hover:text-white uppercase tracking-wider"
          >
            VIEW BAG
          </button>
        </div>
      )}

      {/* Shopping Bag Slide-Over Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-sector-offwhite text-sector-charcoal flex flex-col justify-between shadow-2xl z-50">
              {/* Drawer Header */}
              <div className="p-6 border-b border-sector-charcoal/10 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black tracking-tight uppercase">YOUR BAG</h2>
                  <span className="bg-sector-charcoal text-sector-turmeric text-xs font-mono font-bold px-2 py-0.5">
                    {totalCartCount} ITEMS
                  </span>
                </div>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="p-1 text-sector-charcoal hover:text-sector-cinnamon transition-colors focus:outline-none"
                  aria-label="Close bag"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer Body / Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-sector-charcoal/5 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-sector-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-sector-charcoal/80 mb-1">Your bag is empty</h3>
                    <p className="text-xs text-sector-charcoal/50 max-w-xs mb-6">Explore our menu of fiery Sri Lankan smashed burgers and add your favorites!</p>
                    <button 
                      onClick={() => {
                        setCartOpen(false);
                        const el = document.getElementById("menu");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-sector-charcoal text-white text-xs font-bold px-6 py-3 uppercase hover:bg-sector-turmeric hover:text-sector-charcoal transition-colors"
                    >
                      EXPLORE MENU
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    const burger = BURGER_MENU.find((b) => b.id === item.id);
                    if (!burger) return null;
                    const itemTotal = parsePrice(burger.price) * item.quantity;
                    return (
                      <div key={item.id} className="bg-white border border-sector-charcoal/10 p-4 flex gap-4 items-center">
                        <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100">
                          <Image 
                            src={burger.image} 
                            alt={burger.name} 
                            fill 
                            className="object-cover"
                            sizes="80px" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-black uppercase truncate text-sector-charcoal">{burger.name}</h4>
                          <p className="text-xs text-sector-cinnamon font-bold mt-0.5">{burger.price}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center border border-sector-charcoal/20">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="px-2.5 py-0.5 text-xs font-bold hover:bg-sector-charcoal/10"
                              >
                                -
                              </button>
                              <span className="px-2.5 text-xs font-mono font-bold">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-2.5 py-0.5 text-xs font-bold hover:bg-sector-charcoal/10"
                              >
                                +
                              </button>
                            </div>
                            <button 
                              onClick={() => updateQuantity(item.id, -item.quantity)}
                              className="text-[10px] text-red-600 font-bold uppercase hover:underline"
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                        <div className="text-right font-mono text-xs font-bold text-sector-charcoal">
                          Rs. {itemTotal.toLocaleString()}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer / Order Summary */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-sector-charcoal/10 space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-sector-charcoal/70">
                      <span>Subtotal</span>
                      <span className="font-mono font-bold text-sector-charcoal">Rs. {subtotalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sector-charcoal/70">
                      <span>Delivery (Colombo Metro)</span>
                      <span className="font-mono font-bold text-sector-charcoal">Rs. {deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black pt-2 border-t border-sector-charcoal/10">
                      <span>TOTAL</span>
                      <span className="font-mono text-sector-cinnamon">Rs. {totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {orderSuccess ? (
                    <div className="bg-sector-kochchi/10 border border-sector-kochchi text-sector-charcoal p-4 text-center">
                      <span className="block font-black text-sm text-sector-kochchi mb-1">✓ ORDER CONFIRMED!</span>
                      <p className="text-xs text-gray-700">Your Sri Lankan smash burgers are being prepared now.</p>
                    </div>
                  ) : (
                    <button 
                      onClick={() => {
                        setOrderSuccess(true);
                        setTimeout(() => {
                          setCart([]);
                          setOrderSuccess(false);
                          setCartOpen(false);
                        }, 3500);
                      }}
                      className="w-full bg-sector-charcoal text-white font-black py-4 text-center tracking-widest text-xs uppercase hover:bg-sector-turmeric hover:text-sector-charcoal transition-colors duration-300"
                    >
                      PROCEED TO CHECKOUT
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}