'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Twitter, Github, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#0A0A0A] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 lg:py-20 z-10">
        <motion.div
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Brand */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-start"
          >
            <Link
              href="/"
              className="group flex items-center gap-2 md:gap-3 mb-6 transition-all"
            >
              <div className="relative flex h-10 w-10 items-center justify-center ">
                <Image
                  src="/toolverse_logo.png"
                  alt="ToolVerse Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-extrabold tracking-tight text-sm md:text-lg pr-2">
                Tool<span className="text-emerald-500">Verse</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors leading-relaxed">
              Your complete toolkit with 100+ free online tools for developers,
              creators, and everyone in between. Build faster, create better.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold tracking-wider text-xs mb-6 uppercase text-emerald-500/80">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-neutral-400 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block"
                >
                  All Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="text-sm text-neutral-400 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="text-sm text-neutral-400 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold tracking-wider text-xs mb-6 uppercase text-emerald-500/80">
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/categories/text"
                  className="text-sm text-neutral-400 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block"
                >
                  Text Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/developer"
                  className="text-sm text-neutral-400 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block"
                >
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/calculator"
                  className="text-sm text-neutral-400 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block"
                >
                  Calculators
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/utility"
                  className="text-sm text-neutral-400 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block"
                >
                  Utilities
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold tracking-wider text-xs mb-6 uppercase text-emerald-500/80">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@toolverse.app"
                  className="flex items-center gap-2 text-sm text-neutral-400 hover:text-emerald-400 transition-colors group"
                >
                  <Mail
                    size={16}
                    className="text-neutral-500 group-hover:text-emerald-400 transition-colors"
                  />
                  Email Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-neutral-400 hover:text-emerald-400 transition-colors group"
                >
                  <Twitter
                    size={16}
                    className="text-neutral-500 group-hover:text-emerald-400 transition-colors"
                  />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-neutral-400 hover:text-emerald-400 transition-colors group"
                >
                  <Github
                    size={16}
                    className="text-neutral-500 group-hover:text-emerald-400 transition-colors"
                  />
                  GitHub
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          className="mt-16 border-t border-white/5 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-neutral-500 flex items-center gap-1.5 whitespace-nowrap">
              © {currentYear} TOOLVERSE. Built with{" "}
              <span className="text-emerald-500">♥</span> for creators.
            </p>
            <div className="flex gap-6 items-center">
              <Link
                href="#"
                className="text-xs text-neutral-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-neutral-500 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
