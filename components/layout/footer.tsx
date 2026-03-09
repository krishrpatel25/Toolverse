'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
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
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold">
                ⚙️
              </div>
              <span className="font-bold text-foreground">ToolVerse</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your complete toolkit with 100+ free online tools for developers and everyone.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/text" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Text Tools
                </Link>
              </li>
              <li>
                <Link href="/categories/developer" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link href="/categories/calculator" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Calculators
                </Link>
              </li>
              <li>
                <Link href="/categories/utility" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Utilities
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@toolverse.app" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Email
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          className="mt-12 border-t border-border pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2025 ToolVerse. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
