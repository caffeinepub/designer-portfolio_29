import { ArrowDown } from "lucide-react";

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

// Geometric triangle SVG pattern
function TrianglePattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Large triangles — scattered across hero */}
      <polygon
        points="80,60 200,60 140,160"
        fill="none"
        stroke="#14B8A6"
        strokeWidth="1"
        opacity="0.08"
      />
      <polygon
        points="600,40 760,40 680,180"
        fill="none"
        stroke="#14B8A6"
        strokeWidth="1"
        opacity="0.06"
      />
      <polygon
        points="1100,20 1300,20 1200,200"
        fill="none"
        stroke="#14B8A6"
        strokeWidth="1"
        opacity="0.07"
      />
      <polygon
        points="200,400 350,400 275,520"
        fill="none"
        stroke="#14B8A6"
        strokeWidth="1"
        opacity="0.05"
      />
      <polygon
        points="900,300 1050,300 975,440"
        fill="none"
        stroke="#14B8A6"
        strokeWidth="1"
        opacity="0.06"
      />
      <polygon
        points="1400,350 1550,350 1475,480"
        fill="none"
        stroke="#14B8A6"
        strokeWidth="1"
        opacity="0.05"
      />
      <polygon
        points="50,550 180,550 115,680"
        fill="none"
        stroke="#14B8A6"
        strokeWidth="1"
        opacity="0.04"
      />
      <polygon
        points="700,500 820,500 760,620"
        fill="none"
        stroke="#14B8A6"
        strokeWidth="1.5"
        opacity="0.07"
      />
      <polygon
        points="1250,550 1400,550 1325,700"
        fill="none"
        stroke="#14B8A6"
        strokeWidth="1"
        opacity="0.05"
      />
      {/* Small filled accent triangles */}
      <polygon points="400,100 420,100 410,118" fill="#14B8A6" opacity="0.08" />
      <polygon points="850,200 876,200 863,222" fill="#14B8A6" opacity="0.07" />
      <polygon
        points="1500,100 1520,100 1510,118"
        fill="#14B8A6"
        opacity="0.06"
      />
      <polygon points="300,650 322,650 311,670" fill="#14B8A6" opacity="0.06" />
      <polygon
        points="1100,600 1122,600 1111,622"
        fill="#14B8A6"
        opacity="0.07"
      />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      <TrianglePattern />

      {/* Subtle radial teal wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.96 0.04 186) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 section-container text-center px-4 py-24">
        {/* Badge */}
        <div className="animate-fade-in inline-flex items-center gap-2 border border-teal-200 bg-teal-50 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse-dot" />
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-widest">
            Award-Winning Designer
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-delay-1 font-display text-5xl md:text-7xl font-bold tracking-tight text-black max-w-4xl mx-auto leading-tight">
          Crafting Visual{" "}
          <span className="italic" style={{ color: "#14B8A6" }}>
            Stories
          </span>{" "}
          That Matter
        </h1>

        {/* Subtext */}
        <p className="animate-fade-in-delay-2 text-xl text-gray-500 max-w-2xl mx-auto mt-6 leading-relaxed">
          From branding to UI/UX, I bring ideas to life with creativity and
          precision.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={() => scrollToSection("work")}
            className="px-8 py-3.5 rounded-full font-semibold text-sm bg-teal-600 hover:bg-teal-500 text-white transition-all duration-200 shadow-sm hover:shadow-teal-glow"
          >
            View Portfolio
          </button>
          <button
            type="button"
            data-ocid="hero.secondary_button"
            onClick={() => scrollToSection("contact")}
            className="px-8 py-3.5 rounded-full font-semibold text-sm border border-gray-300 text-gray-700 hover:border-gray-400 hover:text-black bg-white transition-all duration-200"
          >
            Get Quote
          </button>
        </div>

        {/* Sub-CTA note */}
        <p className="animate-fade-in-delay-4 text-sm text-gray-400 mt-5">
          Free consultation &bull; Fast turnaround
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest">
          Scroll
        </span>
        <ArrowDown size={14} className="text-gray-400 animate-scroll-bounce" />
      </div>
    </section>
  );
}
