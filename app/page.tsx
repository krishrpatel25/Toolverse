"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  Sparkles,
  Zap,
  ShieldCheck,
  Code2,
  Cpu,
  Globe,
  Box,
  Terminal,
  Layers,
  LayoutGrid,
  FileCode,
  Languages,
  Binary,
  Database,
  Lock,
  Share2,
  Settings2,
  Image as ImageIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { TOOL_DEFINITIONS, getAllCategories } from "@/lib/tools/definitions";

// 1. UPDATED COMPREHENSIVE CATEGORY MAP
const CATEGORY_MAP: Record<string, any> = {
  json: Code2,
  security: ShieldCheck,
  crypto: Zap,
  dev: Terminal,
  web: Globe,
  formatting: Layers,
  format: Layers,
  converters: Cpu,
  convert: Cpu,
  utilities: Box,
  utility: Box,
  network: Globe,
  seo: Search, // Added SEO Icon
  ai: Sparkles, // Added AI Icon
  file: FileCode, // Added File Icon
  text: Languages, // Added Text Icon
  math: Binary, // Added Math Icon
  data: Database,
  auth: Lock,
  social: Share2,
  system: Settings2,
  image: ImageIcon,
};

// Helper function for fuzzy matching icons
const getCategoryIcon = (name: string) => {
  const nameLower = name.toLowerCase().trim();
  const matchedKey = Object.keys(CATEGORY_MAP).find((key) =>
    nameLower.includes(key),
  );
  return matchedKey ? CATEGORY_MAP[matchedKey] : Layers;
};

export default function Home() {
  const categories = getAllCategories();
  const [searchFocused, setSearchFocused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      document.documentElement.style.setProperty("--mouse-x", `${clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#020202] text-neutral-400 font-sans">
        <Header />
        <main className="relative z-10">
          <section className="relative pt-44 pb-20 px-6">
            <div className="max-w-7xl mx-auto text-center">
              <div className="space-y-8">
                <div className="h-24 md:h-[180px] w-3/4 mx-auto bg-white/5 animate-pulse rounded-3xl" />
                <div className="h-6 md:h-12 w-1/2 mx-auto bg-white/5 animate-pulse rounded-xl" />
                <div className="h-14 w-48 mx-auto bg-white/10 animate-pulse rounded-full" />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryTools = categories.map((cat) => ({
    category: cat,
    tools: TOOL_DEFINITIONS.filter((t) => t.category === cat),
  }));

  return (
    <div className="min-h-screen bg-[#020202] text-neutral-400 selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(16,185,129,0.08),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <Header />

      <main className="relative z-10">
        {/* HERO */}
        <section className="relative pt-44 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-5xl md:text-[90px] font-medium text-white tracking-tighter leading-[0.8] mb-12">
                <span className=" font-serif text-emerald-500">
                  100+ tools working
                </span>
                <br />
                locally
                <br />
                <span className="text-neutral-500">in your</span>
                <span className="text-white"> browser.</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-[12px] md:text-2xl text-neutral-500 max-w-3xl mx-auto mb-8 font-light leading-snug">
              Instant local utilities. No latency.{" "}
              <span className="text-white">Zero tracking.</span> Your browser is
              now a high-performance terminal.
            </p>

            {/* --- NEW EXPLORE BUTTON --- */}
            <div className="flex justify-center mb-10 px-8">
              {/* Added px-4 to prevent touching screen edges */}
              <Link href="/tools" className="w-full sm:w-auto">
                {" "}
                {/* Link takes full width on mobile if needed */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-full bg-emerald-500 text-black text-sm md:text-base font-bold flex items-center justify-center gap-3 overflow-hidden transition-all hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)]"
                >
                  {/* Subtle Shine Flare Effect */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

                  <span className="relative z-10">Explore All Tools</span>

                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 relative z-10" />
                </motion.button>
              </Link>
            </div>

            {/* Search Glow Effect */}
            <div className="relative max-w-2xl mx-auto group mb-12">
              <div
                className={`absolute -inset-4 bg-emerald-500/10 rounded-[2.5rem] blur-3xl transition-opacity duration-700 ${searchFocused ? "opacity-100" : "opacity-0"}`}
              />
            </div>
            <div className="relative max-w-5xl mx-auto mt-24">
              {/* GREEN GLOW */}
              <div
                className="absolute -top-28 left-1/2 -translate-x-1/2 w-[1000px] h-[420px] 
    opacity-80 blur-[180px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(34,197,94,1) 100%, rgba(34,197,94,1) 100%, rgba(34,197,94,0) 100%)",
                }}
              />

              {/* WHITE CENTER GLOW */}
              <div
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-[550px] h-[240px] 
    opacity-90 blur-[140px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.9) 100%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0) 70%)",
                }}
              />

              {/* DASHBOARD CARD */}
              <div className="relative rounded-[2.5rem] border border-white/10 bg-[#050505] overflow-hidden shadow-[0_50px_120px_-20px_rgba(0,0,0,1)]">
                {/* WASM Visualizer */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="relative max-w-5xl mx-auto"
                >
                  {/* GREEN GLOW */}
                  <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/30 blur-[140px] rounded-full opacity-60" />

                  <div className="relative rounded-[2.5rem] border border-white/10 bg-[#050505] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]">
                    {/* WINDOW HEADER */}
                    <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-white/[0.02]">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                      </div>

                      <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-emerald-500/80">
                        <ShieldCheck className="w-4 h-4" /> JSON Formatter
                      </div>
                    </div>

                    {/* CONTENT GRID */}
                    {/* CONTENT GRID - Responsive Height & Stacking */}
                    <div className="grid grid-cols-1 md:grid-cols-2 md:h-[500px] divide-y md:divide-y-0 md:divide-x divide-white/5 font-mono">
                      {/* LEFT SIDE - Raw Input Stream */}
                      <div className="p-8 md:p-12 text-left bg-black/20 overflow-hidden relative">
                        <div className="text-[9px] md:text-[10px] text-neutral-700 mb-6 md:mb-8 uppercase tracking-[0.2em] font-bold">
                          Raw Input Stream
                        </div>

                        <pre className="text-[10px] md:text-[11px] text-emerald-500/60 whitespace-pre-wrap leading-relaxed break-all">
                          {/* Mobile: Medium-short data | Desktop: Full long data */}
                          <span className="md:hidden">
                            {`{"id":"772-wasm","status":"active","payload":{"user":"Test_User","nodes":[12,45,89]},"security":{"isolated":true}}`}
                          </span>
                          <span className="hidden md:inline">
                            {`{"id":"772-wasm","status":"active","payload":{"user":"Test_User","tier":"premium","nodes":[12,45,89],"latency":"0.04ms"},"security":{"encryption":"AES-256","isolated":true},"meta":{"runtime":"V8_Edge","region":"local_browser"}}`}
                          </span>
                        </pre>

                        <div className="absolute bottom-0 left-0 w-full h-16 md:h-20 bg-gradient-to-t from-[#050505] to-transparent opacity-40" />
                      </div>

                      {/* RIGHT SIDE - Formatted Output */}
                      {/* RIGHT SIDE */}
                      <div className="p-6 md:p-12 text-left bg-black/40 relative overflow-y-auto no-scrollbar">
                        <div className="text-[10px] text-emerald-500 mb-8 uppercase tracking-[0.2em] font-bold">
                          Formatted Output
                        </div>

                        <div className="text-[10px] md:text-xs leading-relaxed font-mono mb-12">
                          <span className="text-neutral-500">{"{"}</span> <br />
                          &nbsp;&nbsp;
                          <span className="text-emerald-400">"id"</span>:{" "}
                          <span className="text-yellow-200">"772-wasm"</span>,{" "}
                          <br />
                          &nbsp;&nbsp;
                          <span className="text-emerald-400">
                            "status"
                          </span>:{" "}
                          <span className="text-yellow-200">"active"</span>,{" "}
                          <br />
                          {/* Payload - Fully visible on mobile now */}
                          &nbsp;&nbsp;
                          <span className="text-emerald-400">
                            "payload"
                          </span>: <span className="text-pink-400">{"{"}</span>{" "}
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="text-emerald-400">"user"</span>:{" "}
                          <span className="text-yellow-200">"Test_User"</span>,{" "}
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="text-emerald-400">
                            "nodes"
                          </span>: <span className="text-pink-400">{"["}</span>{" "}
                          <span className="text-orange-400">12, 45, 89</span>{" "}
                          <span className="text-pink-400">{"]"}</span>, <br />
                          &nbsp;&nbsp;
                          <span className="text-pink-400">{"}"}</span>, <br />
                          &nbsp;&nbsp;
                          <span className="text-emerald-400">
                            "security"
                          </span>: <span className="text-pink-400">{"{"}</span>{" "}
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="text-emerald-400">"encryption"</span>
                          : <span className="text-yellow-200">"AES-256"</span>,{" "}
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="text-emerald-400">
                            "isolated"
                          </span>: <span className="text-blue-400">true</span>{" "}
                          <br />
                          &nbsp;&nbsp;
                          <span className="text-pink-400">{"}"}</span> <br />
                          <span className="text-neutral-500">{"}"}</span>
                        </div>

                        {/* Processed Badge */}
                        <div className="absolute bottom-6 right-6 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest italic">
                            ✓ Processed locally
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* POPULAR UTILITIES */}
        <section className="py-24 px-6 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 px-2">
            <h2 className="text-5xl font-medium text-white tracking-tighter text-emerald-500">
              Popular Utilities
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent mx-8 hidden lg:block" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {TOOL_DEFINITIONS.slice(11, 24).map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#080808] p-7 hover:border-emerald-500/40 transition-all duration-500 h-[240px] flex flex-col"
                >
                  <div className="flex justify-between items-start mb-5 relative z-10">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] text-neutral-500 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 border border-white/5 transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[8px] font-bold text-neutral-700 uppercase tracking-[0.2em] group-hover:text-emerald-500/40 transition-colors">
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium text-white mb-2 relative z-10 tracking-tight">
                    {tool.name}
                  </h3>

                  <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2 font-light max-w-[220px] relative z-10">
                    {tool.description}
                  </p>

                  <div className="mt-auto opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0 relative z-10">
                    <ArrowUpRight className="w-5 h-5 text-emerald-500" />
                  </div>

                  {/* --- DYNAMIC ICON WATERMARK --- */}
                  <div className="absolute -bottom-0 -right-6 text-white/8 group-hover:text-emerald-500/8 transition-all duration-700 ">
                    <Icon
                      size={90}
                      strokeWidth={
                        2
                      } /* Thinner stroke looks more premium at large sizes */
                      className="transition-all"
                    />
                  </div>

                  {/* Optional: Subtle Glow following the icon */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* CLASSIFIED BY FUNCTION GRID */}

        <section className="relative py-20 px-6 border-y border-white/5 bg-[#020202] overflow-hidden">
          <div className="relative z-10 lg:px-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 px-2">
              <h2 className="text-5xl font-medium text-white tracking-tighter text-emerald-500">
                Categories
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent mx-8 hidden lg:block" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoryTools.map(({ category, tools }) => {
                const DynamicIcon = getCategoryIcon(category);
                return (
                  <Link
                    key={category}
                    href={`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group relative p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all duration-500 text-center flex flex-col items-center overflow-hidden"
                  >
                    {/* Individual Card Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 text-neutral-500 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all duration-300">
                      <DynamicIcon className="w-5 h-5" />
                    </div>

                    <div className="relative z-10 text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-[0.2em] group-hover:text-emerald-500/70 transition-colors">
                      {tools.length} Modules
                    </div>

                    <h3 className="relative z-10 text-2xl font-medium text-white capitalize tracking-tight">
                      {category}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 relative text-center overflow-hidden bg-[#020202]">
          <div
            className="absolute bottom-0 left-0 right-0 h-[500px] opacity-20 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              transform: "rotateX(60deg) translateY(100px)",
              maskImage: "linear-gradient(to top, black, transparent)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto relative z-10"
          >
            <h2 className="text-6xl md:text-[100px] font-medium text-white mb-16 tracking-[-0.06em] leading-[0.75]">
              Start <br />{" "}
              <span className="text-emerald-500 italic font-serif">
                Building.
              </span>
            </h2>
            {/* --- NEW EXPLORE BUTTON --- */}
            <div className="flex justify-center mb-10 px-8">
              {/* Added px-4 to prevent touching screen edges */}
              <Link href="/tools" className="w-full sm:w-auto">
                {" "}
                {/* Link takes full width on mobile if needed */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-full bg-emerald-500 text-black text-[12px] md:text-base font-bold flex items-center justify-center gap-3 overflow-hidden transition-all hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)]"
                >
                  {/* Subtle Shine Flare Effect */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

                  <span className="relative z-10 ">Explore All Tools</span>

                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 relative z-10" />
                </motion.button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-12 text-[10px] font-bold text-neutral-600 uppercase tracking-[0.3em]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500/50" /> No Data
                Leaves Browser
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-500/50" /> Powered by WASM
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* TITANIUM DOCK */}
      <div className="hidden md:block fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-auto">
        <div className="flex items-center gap-1 p-2 rounded-[2rem] border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="px-5 border-r border-white/10 shrink-0">
            <LayoutGrid className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="flex items-center gap-1 px-2 overflow-x-auto no-scrollbar scroll-smooth">
            {categories.map((catName) => {
              const DynamicIcon = getCategoryIcon(catName);
              return (
                <Link
                  key={catName}
                  href={`/categories/${catName.toLowerCase().replace(/\s+/g, "-")}`}
                  className="p-3 rounded-xl text-neutral-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all relative group/item shrink-0"
                >
                  <DynamicIcon className="h-5 w-5" />
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest opacity-0 translate-y-2 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition-all pointer-events-none whitespace-nowrap">
                    {catName}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 border-b border-r border-white/10 rotate-45" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
