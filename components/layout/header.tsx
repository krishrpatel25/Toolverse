"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Sparkles, Heart, Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const islandScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 md:p-6 pointer-events-none">
      <div className="w-full max-w-7xl flex items-center justify-between gap-4">
        {/* MODULE 1: PERSISTENT LOGO */}
        <motion.div
          style={{ scale: islandScale }}
          className="pointer-events-auto group"
        >
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-3 bg-[#0A0A0A]/90 border border-white/5 p-1.5 md:p-2 rounded-xl md:rounded-2xl transition-all shadow-2xl matte-inner-glow"
          >
            <div className="relative flex h-8 w-8 md:h-10 md:w-10 items-center justify-center ">
              <Image
                src="/toolverse_logo.png"
                alt="ToolVerse Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-white font-extrabold tracking-tight text-sm md:text-lg pr-2">
              Tool<span className="text-emerald-500">Verse</span>
            </span>
          </Link>
        </motion.div>

        {/* MODULE 2: NAVIGATION DOCK (Desktop: Buttons | Mobile: Menu Trigger) */}
        <motion.nav
          style={{ scale: islandScale }}
          className="pointer-events-auto flex items-center bg-[#0A0A0A]/80 border border-white/5 p-1 md:p-1.5 rounded-full shadow-2xl matte-inner-glow"
        >
          {/* Desktop Links */}
          <div className="hidden md:flex items-center">
            <NavButton
              href="/tools"
              icon={<Sparkles size={15} />}
              label="All Tools"
            />
            <NavButton
              href="/favorites"
              icon={<Heart size={15} />}
              label="Favorites"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full text-emerald-500 hover:bg-white/5 transition-all"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.nav>
      </div>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-[90] pointer-events-auto md:hidden"
          >
            <div className="bg-[#0A0A0A]/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-4 shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
              <div className="grid grid-cols-1 gap-2">
                <MobileNavItem
                  href="/tools"
                  icon={<Sparkles size={18} />}
                  label="All Tools"
                  onClick={() => setIsOpen(false)}
                />
                <MobileNavItem
                  href="/favorites"
                  icon={<Heart size={18} />}
                  label="My Favorites"
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-components for cleaner code
function NavButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-all rounded-full hover:bg-white/10 group"
    >
      <span className="text-emerald-500/70 group-hover:text-emerald-500 transition-colors shrink-0">
        {icon}
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  );
}

function MobileNavItem({ href, icon, label, onClick }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 text-neutral-300 active:scale-95 transition-all"
    >
      <div className="h-10 w-10 flex items-center justify-center bg-emerald-500/10 rounded-xl text-emerald-500">
        {icon}
      </div>
      <span className="font-bold uppercase tracking-widest text-xs">
        {label}
      </span>
    </Link>
  );
}
