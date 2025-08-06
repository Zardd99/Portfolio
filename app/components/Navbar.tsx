import React from "react";
import { useState, useRef, useEffect } from "react";
import {
  NAVBAR_CONTENT,
  NAV_ITEMS,
  NavbarContents,
  NavItems,
} from "../constants/navbar";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const cta: NavbarContents = NAVBAR_CONTENT[0];
  const navItems: NavItems = NAV_ITEMS[0];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const hamburgerToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`font-bebas-neue fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="group relative">
              <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:via-blue-500 hover:to-cyan-400 transition-all duration-300">
                Sakda
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-3 py-2 text-xl font-medium text-gray-300 hover:text-white transition-all duration-300"
                >
                  {item.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* CTA Button */}
            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center px-4 py-2 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
            >
              <span>{cta.cta}</span>
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </Link>

            {/* Mobile menu button */}
            <div ref={navRef} className="lg:hidden">
              <button
                onClick={hamburgerToggle}
                className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-all duration-300"
                aria-label="Toggle menu"
              >
                <div className="flex flex-col w-5 h-4 justify-between">
                  <span
                    className={`block h-0.5 w-full bg-white transform transition-all duration-300 ${
                      isOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                      isOpen ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-full bg-white transform transition-all duration-300 ${
                      isOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  ></span>
                </div>
              </button>

              {/* Mobile Menu Dropdown */}
              <div
                className={`absolute right-0 top-14 w-64 transform transition-all duration-300 origin-top-right ${
                  isOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
                  <div className="py-4">
                    {NAV_ITEMS.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        className={`block px-6 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 transform ${
                          isOpen
                            ? "translate-x-0 opacity-100"
                            : "translate-x-4 opacity-0"
                        }`}
                        style={{
                          transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          {item.label}
                          <svg
                            className="w-4 h-4 opacity-50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </Link>
                    ))}

                    {/* Mobile CTA */}
                    <div className="px-6 pt-4 mt-4 border-t border-gray-700/50">
                      <Link
                        href="#contact"
                        onClick={closeMenu}
                        className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
                      >
                        <span>Get In Touch</span>
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 lg:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
