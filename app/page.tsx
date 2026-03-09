import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { TOOL_DEFINITIONS, getAllCategories } from "@/lib/tools/definitions";

export const metadata = {
  title: "ToolVerse - 100+ Free Online Tools | Home",
  description: "Access 100+ free online tools for text processing, development, image manipulation, and more. No signup required.",
};

export default function Home() {
  const categories = getAllCategories();
  const topTools = TOOL_DEFINITIONS.slice(0, 6);
  const categoryTools = categories.map((cat) => ({
    category: cat,
    tools: TOOL_DEFINITIONS.filter((t) => t.category === cat),
  }));

  return (
    <div className="min-h-screen bg-black text-neutral-300 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <header className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20">
          {/* Animated Background Gradients */}
          <div className="absolute top-[10%] left-[15%] w-[40rem] h-[40rem] bg-emerald-900/20 rounded-full blur-[120px] -z-10 animate-[subtle-drift-1_20s_ease-in-out_infinite]" />
          <div className="absolute bottom-[10%] right-[15%] w-[35rem] h-[35rem] bg-emerald-600/5 rounded-full blur-[80px] -z-10 animate-[subtle-drift-2_25s_ease-in-out_infinite]" />

          <div className="text-center max-w-4xl mx-auto z-10 w-full flex flex-col items-center">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-medium tracking-widest uppercase text-neutral-400">
                All systems operational
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-normal text-white tracking-tighter mb-6 leading-[1.05]">
              100+ Free Online <br />
              <span className="font-serif italic text-emerald-400 pr-2">
                Tools.
              </span>
            </h1>

            <p className="text-base md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Your complete toolkit for productivity. From text processing to
              development utilities, everything you need in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
              <Button
                asChild
                className="w-full sm:w-auto px-8 py-6 bg-emerald-400 text-black rounded-full text-sm font-medium hover:bg-emerald-300 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-400/20"
              >
                <Link href="/tools">
                  Explore Tools
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

            </div>
          </div>
        </header>

        {/* Features Grid */}
        <section className="py-24 px-6 md:px-12 w-full max-w-[1600px] mx-auto z-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              {
                title: "Fast & Reliable",
                desc: "Lightning-fast performance with no wait times. All tools run locally.",
                icon: "bolt",
              },
              {
                title: "Private & Secure",
                desc: "Your data stays on your device. No tracking, no ads, no data collection.",
                icon: "shield",
              },
              {
                title: "Always Free",
                desc: "All tools are completely free to use. No hidden charges or premiums.",
                icon: "users",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="tool-card group flex flex-col"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center mb-12 group-hover:scale-110 transition-transform duration-500 text-emerald-400">
                    <ChevronRight />
                  </div>
                  <h3 className="text-xl font-medium tracking-tight text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="py-24 px-6 md:px-12 w-full max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-4">
                Popular Tools
              </h2>
              <p className="text-lg text-neutral-400 font-light leading-relaxed">
                Most-used utilities across development and writing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="tool-card group h-full"
              >
                <div className="relative z-10 w-full flex flex-col h-full">
                  <div className="flex items-center justify-between mb-12">
                    {/* FIXED ICON */}
                    <div className="tool-icon-wrapper">
                      <tool.icon className="tool-icon" />
                    </div>

                    <div className="w-8 h-8 rounded-full bg-emerald-400/10 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="h-4 w-4 text-emerald-400 rotate-[-45deg]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-medium text-white tracking-tight mb-3">
                    {tool.name}
                  </h3>

                  <p className="text-sm text-neutral-400 font-light leading-relaxed flex-grow">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse Categories */}
        <section className="py-24 px-6 md:px-12 w-full max-w-[1600px] mx-auto">
          <div className="mb-12 border-b border-neutral-800 pb-8">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-white mb-2">
              Browse Categories
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categoryTools.map(({ category, tools }) => (
              <Link
                key={category}
                href={`/categories/${category}`}
                className="group flex flex-col justify-between bg-neutral-900/30 backdrop-blur-sm border border-neutral-800 rounded-[1.5rem] p-6 min-h-[160px] hover:border-emerald-500/40 hover:bg-neutral-900/60 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10 text-xs font-medium text-neutral-500 group-hover:text-emerald-400 transition-colors">
                  {tools.length} tools
                </span>
                <h3 className="relative z-10 text-lg font-medium text-white tracking-tight flex items-center gap-2 capitalize">
                  {category}
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-400" />
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 md:px-12 text-white bg-[#050505] rounded-t-[3rem] pt-24 pb-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 font-light max-w-xl mx-auto mb-10 leading-relaxed">
              Access all 100+ tools right now. Sign up to save your favorites.
            </p>
            <Button
              asChild
              className="px-10 py-7 bg-emerald-400 text-black rounded-full text-md font-medium hover:bg-emerald-300 hover:scale-105 transition-all"
            >
              <Link href="/tools">Start Using Tools</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}