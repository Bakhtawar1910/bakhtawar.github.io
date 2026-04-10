import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const isTickingRef = useRef(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "journey", label: "Journey" },
    { id: "projects", label: "Projects" },
    { id: "connect", label: "Connect" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (isTickingRef.current) return;
      isTickingRef.current = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Keep navbar transparent while user is within hero section.
        const heroSection = document.getElementById("home");
        const heroBoundary = heroSection
          ? Math.max(80, heroSection.offsetHeight - 140)
          : 100;

        setIsScrolled(scrollY >= heroBoundary);

        // Update active section
        const offset = scrollY + 180;
        let current = "home";

        navLinks.forEach((link) => {
          const section = document.getElementById(link.id);
          if (!section) return;
          if (offset >= section.offsetTop) {
            current = link.id;
          }
        });

        setActiveSection(current);
        isTickingRef.current = false;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      isTickingRef.current = false;
    };
  }, []);

  useEffect(() => {
    const updateActiveFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) setActiveSection(hash);
    };

    updateActiveFromHash();
    window.addEventListener("hashchange", updateActiveFromHash);
    return () => window.removeEventListener("hashchange", updateActiveFromHash);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animate navbar on scroll
  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        backgroundColor: isScrolled 
          ? "rgba(0, 0, 0, 0.6)" 
          : "rgba(0, 0, 0, 0)",
        borderBottom: isScrolled 
          ? "1px solid rgba(255, 255, 255, 0.1)" 
          : "1px solid rgba(255, 255, 255, 0)",
        paddingTop: isScrolled ? 16 : 24,
        paddingBottom: isScrolled ? 16 : 24,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [isScrolled]);

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-8 md:px-12 lg:px-16 xl:px-20 transition-[background-color,padding,border-color,box-shadow] duration-300"
      style={{
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.25)' : 'none',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo - Left */}
        <div className="text-white font-bold text-2xl max-md:pl-2">
          Bakhtawar<span className="text-orange-500">.</span>
        </div>

        {/* Navigation Links - Center */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setActiveSection(link.id)}
              className={`relative font-medium text-sm transition-colors duration-300 ${
                activeSection === link.id
                  ? "text-orange-500"
                  : "text-white/70 hover:text-orange-500"
              }`}
              style={
                activeSection === link.id
                  ? {
                      borderBottom: "2px solid #f97316",
                      paddingBottom: "4px",
                      transition: "all 0.3s ease-in-out"
                    }
                  : {
                      borderBottom: "2px solid transparent",
                      paddingBottom: "4px",
                      transition: "all 0.3s ease-in-out"
                    }
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Download Resume Button - Right */}
        <button className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium transition-[transform,background-color] duration-300 hover:scale-[1.02]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Resume
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle mobile navigation"
          aria-expanded={isMobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div className={`md:hidden transition-[max-height,opacity,padding-top] duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-[28rem] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0"}`}>
        <div className="rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 p-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => {
                  setActiveSection(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                  activeSection === link.id
                    ? "bg-orange-500/10 text-orange-500"
                    : "text-white/80 hover:bg-white/5 hover:text-orange-500"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
