import { Brush, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Artwork", href: "#artwork" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-xs"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="section-container h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <button
            type="button"
            data-ocid="nav.link"
            className="flex items-center gap-2 font-bold text-xl text-black"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Brush size={20} className="text-teal-500" />
            DesignStudio
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <button
                type="button"
                key={link.href}
                data-ocid={`nav.link.${i + 1}`}
                onClick={() => scrollTo(link.href)}
                className="nav-link"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              data-ocid="nav.primary_button"
              onClick={() => scrollTo("#contact")}
              className="ml-2 px-5 py-2 rounded-full text-sm font-semibold bg-teal-600 hover:bg-teal-500 text-white transition-colors duration-200"
            >
              Hire Me
            </button>
          </nav>

          {/* Mobile */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link, i) => (
              <button
                type="button"
                key={link.href}
                data-ocid={`nav.link.${i + 1}`}
                onClick={() => scrollTo(link.href)}
                className="text-left px-4 py-3 rounded-lg text-gray-600 hover:text-black hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              data-ocid="nav.primary_button"
              onClick={() => scrollTo("#contact")}
              className="mt-2 px-5 py-3 rounded-full text-sm font-semibold bg-teal-600 text-white text-center"
            >
              Hire Me
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
