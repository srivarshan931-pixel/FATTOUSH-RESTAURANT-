"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-4 ${
        isScrolled
          ? "bg-forest-deep/90 backdrop-blur-md border-b border-gold-warm/20 py-3 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand Title */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold-warm/30 transition-transform duration-500 group-hover:scale-105">
            <Image
              src="/assets/logo/IMG_8495.jpg"
              alt="Fattoush Logo"
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg md:text-xl font-black tracking-widest text-white transition-colors duration-300 group-hover:text-gold-warm">
              FATTOUSH
            </span>
            <span className="text-[8px] md:text-[9px] font-sans tracking-[0.25em] text-gold-warm font-semibold">
              RESTAURANT & BANQUET
            </span>
          </div>
        </div>

        {/* Menu Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: "Home", id: "hero" },
            { name: "Showcase", id: "showcase" },
            { name: "Menu", id: "menu" },
            { name: "Services", id: "services" },
            { name: "Reviews", id: "testimonials" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-sans tracking-widest text-white/80 hover:text-gold-warm transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gold-warm after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-500 cursor-pointer"
            >
              {item.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Booking CTA Button */}
        <div>
          <Link
            href="/reserve"
            className="px-6 py-2.5 bg-transparent border border-gold-warm text-gold-warm text-xs tracking-[0.2em] font-sans font-bold hover:bg-gold-warm hover:text-forest-dark transition-all duration-500 ease-out uppercase rounded-sm shadow-md cursor-pointer inline-block text-center"
          >
            Reserve Table
          </Link>
        </div>
      </div>
    </nav>
  );
}
