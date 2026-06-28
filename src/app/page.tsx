"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Users, Clock, Compass, Award, Star, ArrowRight, CheckCircle2, Play, Pause, MapPin, Phone, Map } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  
  // Maps state
  const [selectedMapOutlet, setSelectedMapOutlet] = useState("sembakkam");

  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    guests: "2",
    date: "",
    time: "19:00",
    type: "Dining Table",
  });

  const toggleTestimonialVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useGSAP(
    () => {
      // 1. Hero Text Reveal Animation
      gsap.fromTo(
        ".hero-reveal",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.6, ease: "power4.out", stagger: 0.2 }
      );

      // 2. Hero 2D Parallax Scroll
      gsap.to(".hero-bg-parallax", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 3. Hero Glass Panel Slide In
      gsap.fromTo(
        ".hero-glass-panel",
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.8, ease: "power3.out", delay: 0.5 }
      );

      // 4. Showcase Parallax Sections
      const showcaseItems = gsap.utils.toArray(".showcase-item");
      showcaseItems.forEach((item: any) => {
        const img = item.querySelector(".showcase-img");
        gsap.fromTo(
          img,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // 5. Fade-in animations for section titles
      const fadeTitles = gsap.utils.toArray(".fade-title");
      fadeTitles.forEach((title: any) => {
        gsap.fromTo(
          title,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
            },
          }
        );
      });

      // 6. Grid Menu Card Reveal
      gsap.fromTo(
        ".menu-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".menu-grid-container",
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  // Complete List of All 20 Menu Dishes
  const menuItems = [
    // Category: Starters (Starters, kebabs, tikkas, and requested mutton/beef items)
    { id: 1, name: "Signature Mutton Fry / Sukka", price: "₹480", category: "starters", desc: "Tender boneless mutton pan-roasted in black pepper, garlic, curry leaves, and traditional spices.", img: "/assets/menu/SnapInsta.to_653911670_17892071727432581_3269922815447339082_n.jpg" },
    { id: 2, name: "Mutton Shish Kebab (Shibab)", price: "₹520", category: "starters", desc: "Arabian minced mutton skewers infused with parsley, mint, cumin, and grilled over charcoal.", img: "/assets/menu/SnapInsta.to_652065263_17891187672432581_4218031647365573679_n.jpg" },
    { id: 3, name: "Murgh Tikka Kebab (Kekhar)", price: "₹410", category: "starters", desc: "Juicy chicken breast skewers marinated in hung yogurt, red chili spices, and roasted in clay oven.", img: "/assets/menu/SnapInsta.to_652753100_17891606469432581_5301649842473564304_n.jpg" },
    { id: 4, name: "Malabar Mandi Starter Cut", price: "₹450", category: "starters", desc: "Arabian style seasoned grilled chicken cut served with hot garlic paste and pickled turnips.", img: "/assets/menu/SnapInsta.to_719099546_17903910282432581_1617435154822403307_n.jpg" },
    { id: 5, name: "Malabar Beef Ularthiyathu (Uruthiyat)", price: "₹390", category: "starters", desc: "Classic Kerala beef slow-cooked and dry-fried with coconut slivers, ginger-garlic, and curry leaves.", img: "/assets/menu/SnapInsta.to_649222676_17890902630432581_7261003776042326459_n.jpg" },
    { id: 6, name: "Dragon Chili Prawns", price: "₹490", category: "starters", desc: "Crispy prawns stir-fried in hot pepper soy sauce with spring greens and bell peppers.", img: "/assets/menu/SnapInsta.to_628414034_17886841110432581_8525236740674358604_n.jpg" },

    // Category: Mandi & Biryani (Middle Section main courses)
    { id: 7, name: "Fattoush Special Mandi Rice", price: "₹650", category: "mandi_biryani", desc: "Signature tender mutton or chicken slow-baked inside tandoor pit, served on spiced basmati rice.", img: "/assets/menu/SnapInsta.to_653911670_17892071727432581_3269922815447339082_n.jpg" },
    { id: 8, name: "Alfahm Grilled Mandi", price: "₹590", category: "mandi_biryani", desc: "Arabian charcoal-grilled chicken served over long-grain lemon-mint spiced Mandi rice.", img: "/assets/menu/SnapInsta.to_713784101_17903481126432581_1186162752516623872_n.jpg" },
    { id: 9, name: "Malabar Dum Biryani", price: "₹450", category: "mandi_biryani", desc: "Fragrant short-grain Kaima rice layered with slow-cooked mutton, ghee, caramelized onions, and nuts.", img: "/assets/menu/SnapInsta.to_657937674_17893444488432581_1193461834641521238_n.jpg" },
    { id: 10, name: "Schezwan Chicken Noodles", price: "₹360", category: "mandi_biryani", desc: "Spicy stir-fried egg noodles tossed in Schezwan sauce, fresh wok greens, and chicken strips.", img: "/assets/menu/SnapInsta.to_613032570_17883681453432581_4839398789098766863_n.jpg" },
    { id: 11, name: "Golden Crispy Spring Rolls", price: "₹290", category: "mandi_biryani", desc: "Wok-cooked vegetables and chicken shreds enclosed in pastry shells and fried crispy.", img: "/assets/menu/SnapInsta.to_631465710_17887073562432581_5036453132423951357_n.jpg" },
    { id: 12, name: "Schezwan Wok Fried Rice", price: "₹340", category: "mandi_biryani", desc: "Stir-fried basmati rice with eggs, chicken bits, spring onions, and garlic-chili paste.", img: "/assets/menu/SnapInsta.to_612503335_17883135468432581_5765355919061231123_n.jpg" },
    { id: 13, name: "Mughlai Butter Chicken Masala", price: "₹430", category: "mandi_biryani", desc: "Shredded grilled chicken simmered in rich creamy tomato and butter cashew paste gravy.", img: "/assets/menu/SnapInsta.to_658826265_17893900710432581_4560143667535470893_n.jpg" },
    { id: 14, name: "Tandoori Paneer Butter Masala", price: "₹380", category: "mandi_biryani", desc: "Cottage cheese cubes tossed in butter gravy with dried fenugreek leaves and cream.", img: "/assets/menu/SnapInsta.to_628031511_17887269858432581_3456588834798739535_n.jpg" },
    { id: 15, name: "Malabar Chemmeen (Prawns) Curry", price: "₹480", category: "mandi_biryani", desc: "Coastal style prawns simmered in raw mango, red chili, and spiced coconut paste gravy.", img: "/assets/menu/SnapInsta.to_713763652_17903188251432581_5705696186481092309_n.jpg" },

    // Category: Desserts (At the end)
    { id: 16, name: "Malabar Elaneer Payasam", price: "₹240", category: "desserts", desc: "Chilled dessert made with tender coconut pulp, coconut milk, and sweetened condensed milk.", img: "/assets/menu/SnapInsta.to_582093935_17876884053432581_626155647724875192_n.jpg" },
    { id: 17, name: "Baked Cheese Kunafa", price: "₹340", category: "desserts", desc: "Middle-eastern kataifi pastry layers filled with rich sweet cheese, baked and soaked in rose syrup.", img: "/assets/menu/SnapInsta.to_619443090_17884276449432581_5636418717647713483_n.jpg" },
    { id: 18, name: "Pistachio Honey Baklava", price: "₹280", category: "desserts", desc: "Crisp layers of phyllo pastry filled with chopped pistachios and sweetened with warm honey.", img: "/assets/menu/SnapInsta.to_628031511_17887269858432581_3456588834798739535_n.jpg" },
    { id: 19, name: "Royal Mango Soufflé", price: "₹260", category: "desserts", desc: "Light, airy mango cream dessert topped with fresh Alphonso pulp and chopped nuts.", img: "/assets/menu/SnapInsta.to_621925383_17884881300432581_6868876401412117506_n.jpg" },
    { id: 20, name: "Slow Dum Dal Makhani Sweet", price: "₹210", category: "desserts", desc: "Traditional sweet black bean paste cooked with cardamom, milk solids, and honey.", img: "/assets/menu/SnapInsta.to_629588615_17886359985432581_8444463044736984912_n.jpg" },
  ];

  const filteredMenu = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const mapUrls = {
    sembakkam: "https://maps.google.com/maps?q=Fattoush%20Restaurant%20%26%20Banquet,%20Sembakkam,%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed",
    sholinganallur: "https://maps.google.com/maps?q=Fattoush%20Restaurant%20%26%20Banquet,%20Sholinganallur,%20OMR,%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed",
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-forest-dark min-h-screen">
      
      {/* SECTION 1: HERO SECTION */}
      <section ref={heroRef} id="hero" className="relative h-screen w-full flex items-center justify-between overflow-hidden px-6 md:px-16 lg:px-24">
        {/* Background video with 2D parallax */}
        <div className="absolute inset-0 z-0 hero-bg-parallax w-full h-[135%] -top-[20%]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter brightness-[0.35] saturate-[0.7] contrast-[1.05]"
          >
            <source
              src="/assets/intro/SnapInsta.to_AQMzImP2hb1MHZNtF9GXxU7ImHv_uNfrqqyGQE4PZEJYbFJ-LiuYlFyI3C0wtmkFmrgE3BZ-bZEHg_j8D4R2SrIMa-SEUZxkIprCFQ8.mp4"
              type="video/mp4"
            />
          </video>
          {/* Immersive Deep Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-transparent to-forest-dark/45" />
          {/* Fine Editorial Grid lines */}
          <div className="absolute inset-0 border-x border-white/10 mx-6 md:mx-16 lg:mx-24 pointer-events-none" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5 pointer-events-none" />
        </div>

        {/* Left Side: Typography */}
        <div className="relative z-10 max-w-3xl w-full flex flex-col items-start text-left pt-16">
          <div className="overflow-hidden mb-4">
            <span className="hero-reveal block text-xs md:text-sm font-sans tracking-[0.45em] text-gold-warm font-black uppercase">
              RESTORING TASTE SINCE 2016
            </span>
          </div>

          <div className="overflow-hidden mb-6">
            <h1 className="hero-reveal font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-widest text-white leading-[0.85]">
              FATTOUSH
            </h1>
          </div>

          <div className="overflow-hidden mb-10">
            <p className="hero-reveal text-sm md:text-base tracking-[0.2em] text-gold-pale/80 max-w-lg leading-relaxed font-sans uppercase">
              Immersive Arabian grills, Malabar curries, & tandoori classics.
            </p>
          </div>

          <div className="overflow-hidden flex gap-4">
            <button
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              className="hero-reveal px-8 py-4 bg-gold-warm text-forest-dark text-xs tracking-[0.25em] font-sans font-bold hover:bg-white hover:text-forest-dark transition-all duration-500 rounded-sm cursor-pointer shadow-lg uppercase"
            >
              Discover Menu
            </button>
            <button
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              className="hero-reveal px-8 py-4 bg-transparent border border-white/40 text-white text-xs tracking-[0.25em] font-sans font-bold hover:bg-white hover:text-forest-dark hover:border-white transition-all duration-500 rounded-sm cursor-pointer uppercase"
            >
              Book Table
            </button>
          </div>
        </div>

        {/* Right Side: Elegant Glassmorphism Details Card (Primary: Tambaram Sembakkam) */}
        <div className="hidden lg:block relative z-10 w-96 p-8 rounded-md backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hero-glass-panel">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-sm bg-gold-warm/15 text-gold-warm border border-gold-warm/25">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gold-warm font-sans tracking-widest font-black uppercase">Primary Hub</span>
                <span className="text-xs text-white/90 font-sans tracking-wide mt-0.5">Tambaram Sembakkam, Chennai</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-sm bg-gold-warm/15 text-gold-warm border border-gold-warm/25">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gold-warm font-sans tracking-widest font-black uppercase">Service Hours</span>
                <span className="text-xs text-white/90 font-sans tracking-wide mt-0.5 font-semibold">Daily: 11:30 AM - 11:30 PM</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-sm bg-gold-warm/15 text-gold-warm border border-gold-warm/25">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gold-warm font-sans tracking-widest font-black uppercase">Contact Desk</span>
                <span className="text-xs text-white/90 font-sans tracking-wide mt-0.5 font-semibold">+91 98765 43210</span>
              </div>
            </div>

            <div className="h-[1px] bg-white/10 my-1" />
            
            <p className="text-[10px] text-gold-pale/60 tracking-wider leading-relaxed uppercase font-sans">
              * Other Outlets: OMR Sholinganallur & Bangalore *
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 opacity-80 hover:opacity-100 transition-opacity"
             onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })}>
          <span className="text-[8px] tracking-[0.3em] text-gold-warm font-sans uppercase">Scroll to Discover</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-gold-warm to-transparent animate-pulse" />
        </div>
      </section>

      {/* SECTION 2: SHOWCASE / ABOUT */}
      <section id="showcase" className="relative py-28 md:py-36 bg-forest-deep border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-gold-warm)_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col gap-6 md:gap-8">
              <span className="text-xs text-gold-warm tracking-[0.3em] font-sans font-bold uppercase fade-title">
                OUR HERITAGE
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-widest leading-tight fade-title">
                CRAFTING FLAVORS SINCE 2016
              </h2>
              <p className="text-sm md:text-base text-gold-pale/80 font-sans leading-relaxed tracking-wide fade-title">
                Fattoush began with a single mission: to create a premium, inclusive dining experience marrying the smoky, rich spice profiles of Arabian Grills with Malabar, Chinese, and tandoori culinary crafts. Now serving from our flagship in Tambaram Sembakkam and outlets across OMR Sholinganallur and Bangalore.
              </p>
              
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/10 fade-title">
                {[
                  { icon: Compass, val: "3 Outlets", label: "Cities" },
                  { icon: Award, val: "Top Tier", label: "Quality" },
                  { icon: Star, val: "4.5+", label: "Rating" },
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-start gap-1">
                    <stat.icon className="w-5 h-5 text-gold-warm mb-1" />
                    <span className="text-sm md:text-base text-white font-bold tracking-wider">{stat.val}</span>
                    <span className="text-[10px] text-gold-pale/60 tracking-widest uppercase font-sans">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Grid Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="relative h-96 rounded-sm overflow-hidden border border-white/10 showcase-item shadow-2xl group">
                <Image
                  src="/assets/testimonials/SnapInsta.to_624151761_18066766052241179_1307991144574895989_n.jpg"
                  alt="Restaurant Ambiance"
                  fill
                  className="object-cover showcase-img transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs text-gold-warm tracking-widest font-black uppercase font-sans">FINE DINING</span>
                </div>
              </div>

              <div className="relative h-96 md:translate-y-12 rounded-sm overflow-hidden border border-white/10 showcase-item shadow-2xl group">
                <Image
                  src="/assets/testimonials/SnapInsta.to_624827577_18066280841536774_5383854590377454024_n.jpg"
                  alt="Banquet Setting"
                  fill
                  className="object-cover showcase-img transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs text-gold-warm tracking-widest font-black uppercase font-sans">BANQUET SUITE</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: MENU GRID SECTION */}
      <section id="menu" className="relative py-28 md:py-36 bg-forest-dark">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/5" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/5" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs text-gold-warm tracking-[0.3em] font-sans font-bold uppercase fade-title">
                CURATED CULINARY ART
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-widest fade-title">
                MENU
              </h2>
            </div>
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 md:gap-3 fade-title">
              {[
                { label: "SHOW ALL", key: "all" },
                { label: "STARTERS & KEBABS", key: "starters" },
                { label: "MANDI & BIRYANI", key: "mandi_biryani" },
                { label: "DESSERTS", key: "desserts" },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2.5 border text-[9px] md:text-xs tracking-[0.2em] font-sans font-bold uppercase rounded-sm cursor-pointer transition-all duration-300 ${
                    activeCategory === cat.key
                      ? "bg-gold-warm border-gold-warm text-forest-dark shadow-md"
                      : "border-white/10 text-white/80 hover:border-gold-warm hover:text-gold-warm"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Grid of All 20 Dishes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 menu-grid-container">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col bg-white/5 border border-white/5 hover:border-gold-warm/40 backdrop-blur-md rounded-sm overflow-hidden shadow-2xl transition-all duration-500 menu-card"
              >
                {/* Image Wrap */}
                <div className="relative h-64 w-full overflow-hidden border-b border-white/5">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.8] group-hover:brightness-[0.95]"
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 bg-forest-deep/90 border border-gold-warm/30 text-gold-warm text-[8px] font-sans font-black tracking-widest px-2.5 py-1 uppercase rounded-sm">
                    {item.category.replace("_", " ")}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-4 flex-grow justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-display text-base font-black tracking-wider text-white group-hover:text-gold-warm transition-colors duration-300 leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-sm font-display font-black text-gold-warm shrink-0">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-xs text-gold-pale/75 font-sans leading-relaxed tracking-wide">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Action link */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] tracking-[0.2em] font-sans font-black text-gold-warm uppercase opacity-65 group-hover:opacity-100 transition-opacity">
                    <span>Order / Reservation</span>
                    <ArrowRight className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: SERVICES */}
      <section id="services" className="relative py-28 md:py-36 bg-forest-deep">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col gap-3 mb-16 items-center text-center">
            <span className="text-xs text-gold-warm tracking-[0.3em] font-sans font-bold uppercase fade-title">
              PREMIUM HOSPITALITY
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-widest fade-title">
              OUR SPACES & SERVICES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "FINE DINING",
                desc: "An ambient, dimly lit dining experience highlighting grilled delicacies, freshly made breads, and warm hospitality.",
                img: "/assets/menu/SnapInsta.to_658826265_17893900710432581_4560143667535470893_n.jpg",
              },
              {
                title: "BANQUET SUITE",
                desc: "Fully equipped luxury halls with high ceilings, customizable layouts, and dedicated catering for up to 300 guests.",
                img: "/assets/testimonials/SnapInsta.to_624827577_18066280841536774_5383854590377454024_n.jpg",
              },
              {
                title: "PRIVATE CATERING",
                desc: "Bring our kitchens to your home or office. Tailored menu sheets cooked and served by our executive chefs.",
                img: "/assets/menu/SnapInsta.to_713763652_17903188251432581_5705696186481092309_n.jpg",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="relative h-[450px] rounded-sm overflow-hidden border border-white/10 hover:border-gold-warm/30 shadow-2xl group cursor-pointer"
              >
                {/* Image Overlay */}
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.35] saturate-[0.7]"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
                
                {/* Card borders */}
                <div className="absolute inset-4 border border-white/10 group-hover:border-gold-warm/30 transition-colors duration-500 pointer-events-none" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end gap-3 z-10 bg-gradient-to-t from-forest-deep via-transparent to-transparent">
                  <h3 className="font-display text-xl font-black text-white tracking-widest group-hover:text-gold-warm transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gold-pale/75 font-sans leading-relaxed tracking-wide">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: TESTIMONIAL VIDEO INTERACTIVE AREA */}
      <section id="testimonials" className="relative py-28 md:py-36 bg-forest-dark border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="flex flex-col gap-3 mb-16 items-center text-center">
            <span className="text-xs text-gold-warm tracking-[0.3em] font-sans font-bold uppercase fade-title">
              GUEST EXPERIENCES
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-widest fade-title">
              TESTIMONIALS & REVIEWS
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Testimonial video player (Glassmorphism layout - Tall vertical layout) */}
            <div className="lg:col-span-5 relative max-w-sm w-full aspect-[9/16] h-[550px] md:h-[650px] mx-auto rounded-md backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-3 flex flex-col justify-center items-center group">
              <video
                ref={videoRef}
                loop
                playsInline
                className="w-full h-full object-cover rounded-sm filter brightness-[0.7] group-hover:brightness-[0.85] transition-all"
              >
                <source
                  src="/assets/testimonials/SnapInsta.to_AQPO_Xdf_LAGI-e8T4v-iJ-iEfyb1aE6NfMt2sVwDaOo5eBsTAHkQYDRHqpa13iXCsKz-Yxwkys35z754Q508MbnYVTcZE51tNBbEZg.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Play/Pause Overlay */}
              <button
                onClick={toggleTestimonialVideo}
                className="absolute p-6 rounded-full bg-gold-warm border border-gold-warm/40 text-forest-dark hover:bg-white transition-all duration-300 shadow-2xl cursor-pointer"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current translate-x-[2px]" />}
              </button>

              <div className="absolute bottom-6 left-6 z-10 flex flex-col text-left">
                <span className="text-[10px] text-gold-warm font-sans tracking-widest font-black uppercase">Live Video Review</span>
                <span className="text-xs text-white font-sans mt-0.5 tracking-wide">Fattoush Banquet Hall event setup & guest review</span>
              </div>
            </div>

            {/* Right: Testimonial Text & Quotes */}
            <div className="lg:col-span-7 flex flex-col gap-8 text-left">
              <div className="flex flex-col gap-6">
                <p className="font-display text-xl md:text-2xl font-medium tracking-wide text-gold-pale italic leading-relaxed">
                  &ldquo;The Murgh Tikka Masala and Kaima Rice Biryani are exceptional. We hosted our corporate banquet at Fattoush, and the food quality and hall management exceeded our expectations!&rdquo;
                </p>

                <div className="flex flex-col gap-1">
                  <span className="text-sm font-sans tracking-widest text-white font-bold uppercase">Ananth Krishnan</span>
                  <span className="text-[10px] text-gold-warm font-sans tracking-widest uppercase">Chennai Banquet Client</span>
                </div>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-warm text-gold-warm" />
                  ))}
                </div>
              </div>

              <div className="h-[1px] bg-white/10" />

              {/* Mini secondary quote */}
              <div className="flex flex-col gap-4">
                <p className="text-xs md:text-sm text-gold-pale/80 font-sans leading-relaxed italic">
                  &ldquo;Alfahm Spicy Grilled Chicken is a absolute must-try! Best garlic dip in Sembakkam.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-[1px] bg-gold-warm" />
                  <span className="text-[10px] text-white font-sans tracking-widest uppercase">Priya S.</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: RESERVATIONS */}
      <section id="booking" className="relative py-28 md:py-36 bg-forest-deep">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          
          <div className="flex flex-col gap-3 mb-14 items-center text-center">
            <span className="text-xs text-gold-warm tracking-[0.3em] font-sans font-bold uppercase">
              RESERVATIONS
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-widest">
              SECURE A TABLE
            </h2>
            <p className="text-xs text-gold-pale/60 tracking-widest uppercase font-sans mt-2">
              For Fine Dining, Catering, & Banquet Halls
            </p>
          </div>

          {!bookingSubmitted ? (
            <form onSubmit={handleBookingSubmit} className="flex flex-col gap-8 bg-forest-dark/40 backdrop-blur-md p-8 md:p-12 border border-white/10 rounded-sm shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Guest Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] font-sans tracking-[0.25em] text-gold-warm font-bold uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-forest-deep border border-white/10 text-white placeholder-white/25 px-4 py-3.5 text-sm tracking-widest focus:outline-none focus:border-gold-warm rounded-sm transition-colors"
                  />
                </div>

                {/* Contact Phone */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-[10px] font-sans tracking-[0.25em] text-gold-warm font-bold uppercase">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full bg-forest-deep border border-white/10 text-white placeholder-white/25 px-4 py-3.5 text-sm tracking-widest focus:outline-none focus:border-gold-warm rounded-sm transition-colors"
                  />
                </div>

                {/* Booking Type */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="type" className="text-[10px] font-sans tracking-[0.25em] text-gold-warm font-bold uppercase">
                    Reservation Type
                  </label>
                  <select
                    id="type"
                    value={bookingData.type}
                    onChange={(e) => setBookingData({ ...bookingData, type: e.target.value })}
                    className="w-full bg-forest-deep border border-white/10 text-white px-4 py-3.5 text-sm tracking-widest focus:outline-none focus:border-gold-warm rounded-sm transition-colors cursor-pointer"
                  >
                    <option value="Dining Table">Dining Table Booking</option>
                    <option value="Banquet Hall">Banquet Suite Booking</option>
                    <option value="Catering Service">Outdoor Catering Sheet</option>
                  </select>
                </div>

                {/* Date Picker */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="date" className="text-[10px] font-sans tracking-[0.25em] text-gold-warm font-bold uppercase">
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    required
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="w-full bg-forest-deep border border-white/10 text-white px-4 py-3.5 text-sm tracking-widest focus:outline-none focus:border-gold-warm rounded-sm transition-colors cursor-pointer"
                  />
                </div>

                {/* Time Picker */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="time" className="text-[10px] font-sans tracking-[0.25em] text-gold-warm font-bold uppercase">
                    Select Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    required
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    className="w-full bg-forest-deep border border-white/10 text-white px-4 py-3.5 text-sm tracking-widest focus:outline-none focus:border-gold-warm rounded-sm transition-colors cursor-pointer"
                  />
                </div>

                {/* Guest Count */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="guests" className="text-[10px] font-sans tracking-[0.25em] text-gold-warm font-bold uppercase">
                    Guests Count
                  </label>
                  <input
                    type="number"
                    id="guests"
                    min="1"
                    max="100"
                    required
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                    className="w-full bg-forest-deep border border-white/10 text-white px-4 py-3.5 text-sm tracking-widest focus:outline-none focus:border-gold-warm rounded-sm transition-colors"
                  />
                </div>

              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="mt-4 px-8 py-4 bg-gold-warm text-forest-dark text-xs tracking-[0.25em] font-sans font-bold hover:bg-white hover:text-forest-dark transition-all duration-500 rounded-sm cursor-pointer uppercase shadow-lg"
              >
                Send Reservation Request
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-6 bg-forest-dark/40 backdrop-blur-md p-12 border border-white/15 rounded-sm shadow-2xl text-center">
              <CheckCircle2 className="w-16 h-16 text-gold-warm animate-bounce" />
              <h3 className="font-display text-2xl font-black text-white tracking-widest uppercase">
                REQUEST RECEIVED
              </h3>
              <p className="text-sm text-gold-pale/85 max-w-md font-sans leading-relaxed">
                Thank you, <strong>{bookingData.name}</strong>. Your reservation request for a <strong>{bookingData.type}</strong> on <strong>{bookingData.date}</strong> at <strong>{bookingData.time}</strong> (for <strong>{bookingData.guests} guests</strong>) has been registered.
              </p>
              <div className="w-full h-[1px] bg-gold-warm/25 my-2" />
              <p className="text-[10px] text-gold-warm font-sans tracking-[0.2em] uppercase">
                A coordinator will contact you at {bookingData.phone} shortly.
              </p>
              <button
                onClick={() => setBookingSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-transparent border border-white text-white text-[10px] tracking-[0.2em] font-sans font-bold hover:bg-white hover:text-forest-dark transition-colors duration-500 rounded-sm cursor-pointer uppercase"
              >
                Book Another Table
              </button>
            </div>
          )}

        </div>
      </section>

      {/* SECTION 7: INTERACTIVE GOOGLE MAPS SECTION (Elementis.co style) */}
      <section id="maps" className="relative py-28 bg-forest-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Outlet selectors and address details */}
            <div className="lg:col-span-5 flex flex-col gap-8 text-left">
              <div className="flex flex-col gap-3">
                <span className="text-xs text-gold-warm tracking-[0.3em] font-sans font-bold uppercase">
                  FIND US NEAR YOU
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-widest leading-none">
                  OUR OUTLETS
                </h2>
              </div>

              {/* Outlet List Buttons */}
              <div className="flex flex-col gap-4 mt-4">
                
                {/* Outlet 1: Sembakkam */}
                <div
                  onClick={() => setSelectedMapOutlet("sembakkam")}
                  className={`p-6 border rounded-sm cursor-pointer transition-all duration-500 ${
                    selectedMapOutlet === "sembakkam"
                      ? "bg-white/5 border-gold-warm shadow-xl"
                      : "bg-transparent border-white/10 hover:border-gold-warm/50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-display text-base font-black tracking-widest text-white">
                      TAMBARAM SEMBAKKAM
                    </span>
                    <span className="text-[8px] bg-gold-warm text-forest-dark font-sans font-black px-2 py-0.5 tracking-widest uppercase rounded-sm shrink-0">
                      FLAGSHIP
                    </span>
                  </div>
                  <p className="text-xs text-gold-pale/75 font-sans leading-relaxed tracking-wide mt-2">
                    No. 120, Velachery Main Road, Sembakkam, Tambaram, Chennai - 600073
                  </p>
                  <a
                    href="https://share.google/SIZvfTv9sZ56Sa9JT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[9px] text-gold-warm font-sans font-black tracking-widest uppercase mt-4 hover:underline"
                  >
                    Open in Google Maps <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Outlet 2: Sholinganallur */}
                <div
                  onClick={() => setSelectedMapOutlet("sholinganallur")}
                  className={`p-6 border rounded-sm cursor-pointer transition-all duration-500 ${
                    selectedMapOutlet === "sholinganallur"
                      ? "bg-white/5 border-gold-warm shadow-xl"
                      : "bg-transparent border-white/10 hover:border-gold-warm/50"
                  }`}
                >
                  <span className="font-display text-base font-black tracking-widest text-white">
                    OMR SHOLINGANALLUR
                  </span>
                  <p className="text-xs text-gold-pale/75 font-sans leading-relaxed tracking-wide mt-2">
                    425/1A, Nookampalayam Link Rd, Sholinganallur, Chennai - 600119
                  </p>
                  <a
                    href="https://share.google/77twiBdPnZfuNakZA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[9px] text-gold-warm font-sans font-black tracking-widest uppercase mt-4 hover:underline"
                  >
                    Open in Google Maps <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Outlet 3: Bangalore */}
                <div className="p-6 border border-white/5 bg-white/[0.01] rounded-sm opacity-60">
                  <div className="flex justify-between items-center">
                    <span className="font-display text-base font-black tracking-widest text-white/90">
                      BANGALORE HUB
                    </span>
                    <span className="text-[8px] bg-white/20 text-white font-sans font-black px-2 py-0.5 tracking-widest uppercase rounded-sm shrink-0">
                      COMING SOON
                    </span>
                  </div>
                  <p className="text-xs text-gold-pale/60 font-sans leading-relaxed tracking-wide mt-2">
                    Koramangala 4th Block, Bangalore - 560034
                  </p>
                </div>

              </div>

            </div>

            {/* Right: Map Iframe display card */}
            <div className="lg:col-span-7 relative w-full h-[400px] md:h-[500px] rounded-md backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-4">
              <iframe
                src={mapUrls[selectedMapOutlet as keyof typeof mapUrls]}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "2px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter invert-[0.9] hue-rotate-[180deg] brightness-[0.95] contrast-[0.95]"
              />
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-forest-deep border-t border-white/5 py-16 text-gold-pale/70 text-center font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-8">
          
          {/* Brand */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-display text-2xl font-black text-white tracking-widest">FATTOUSH</span>
            <span className="text-[9px] tracking-[0.3em] text-gold-warm font-black">RESTAURANT & BANQUET</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full text-xs tracking-wider font-sans border-y border-white/10 py-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-gold-warm font-bold tracking-widest uppercase">Flagship Location</span>
              <p className="text-white/80 leading-relaxed uppercase">
                No. 120, Velachery Main Road,<br />
                Sembakkam, Tambaram, Chennai - 600073
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-gold-warm font-bold tracking-widest uppercase">Contact Desk</span>
              <p className="text-white/80 leading-relaxed">
                Desk: +91 98765 43210<br />
                Mail: contact@fattoush.in
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-gold-warm font-bold tracking-widest uppercase">Other Outlets</span>
              <p className="text-white/80 leading-relaxed uppercase">
                OMR Sholinganallur, Chennai<br />
                Koramangala, Bangalore
              </p>
            </div>
          </div>

          <p className="text-[10px] tracking-widest text-white/30 uppercase mt-4">
            &copy; {new Date().getFullYear()} FATTOUSH RESTAURANT & BANQUET. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

    </div>
  );
}
