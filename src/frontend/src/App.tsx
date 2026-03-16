import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  ExternalLink,
  Github,
  Instagram,
  Layers,
  Layout,
  Linkedin,
  Mail,
  MapPin,
  Megaphone,
  Minus,
  Monitor,
  Music,
  Package,
  Pen,
  Plus,
  Send,
  Share2,
  Sparkles,
  Type,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
}

type GalleryFilter = "all" | "posters" | "branding" | "typography" | "abstract";

interface GalleryImage {
  src: string;
  tag: GalleryFilter;
  title: string;
}

interface Project {
  id: number;
  title: string;
  client: string;
  challenge: string;
  processSrc?: string;
  finalSrc: string;
  tags: string[];
  color: string;
}

interface Testimonial {
  photo: string;
  name: string;
  company: string;
  review: string;
}

// ─── useScrollReveal hook ──────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        }
      },
      { threshold: 0.1 },
    );
    const elements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale",
    );
    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);
}

// ─── Canvas particle hero background ─────────────────────────────────────────
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create 80 particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();
      }

      // Connect particles within 120px
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="hero-canvas" />;
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 border-b border-white/5 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="font-display font-black text-2xl text-white tracking-tight cursor-pointer bg-transparent border-0 p-0"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              GK<span style={{ color: "#8b5cf6" }}>.</span>
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              ["Work", "work"],
              ["About", "about"],
              ["Services", "services"],
              ["Process", "process"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                type="button"
                data-ocid={`nav.${id}.link`}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 relative group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-violet-400 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Hire Me */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("contact")}
              type="button"
              data-ocid="nav.hire_me.button"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
              }}
            >
              Hire Me
              <ArrowUpRight size={14} />
            </button>
            <button
              type="button"
              className="md:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="w-5 h-0.5 bg-white mb-1" />
              <div className="w-5 h-0.5 bg-white mb-1" />
              <div className="w-3 h-0.5 bg-white" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {[
              ["Work", "work"],
              ["About", "about"],
              ["Services", "services"],
              ["Process", "process"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                type="button"
                data-ocid={`nav.${id}.link`}
                className="block w-full text-left py-3 text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              type="button"
              data-ocid="nav.hire_me.button"
              className="mt-3 w-full py-2.5 rounded-full text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
              }}
            >
              Hire Me
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const scrollToWork = () =>
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <HeroCanvas />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(139,92,246,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 section-container text-center">
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-fade-up">
          <span className="pill-badge">
            <span style={{ color: "#8b5cf6" }}>✦</span> Available for Work
          </span>
        </div>

        {/* Name */}
        <h1
          className="font-display font-black text-white mb-4 animate-fade-up-1 leading-none"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 9rem)",
            letterSpacing: "-0.04em",
          }}
        >
          Gopal <span className="gradient-text-violet">Krishna</span>
        </h1>

        {/* Title */}
        <p
          className="text-white/50 font-light tracking-widest uppercase text-sm md:text-base mb-8 animate-fade-up-2"
          style={{ letterSpacing: "0.25em" }}
        >
          Graphic Designer &amp; Visual Storyteller
        </p>

        {/* Quote */}
        <p
          className="font-serif italic text-lg md:text-xl max-w-2xl mx-auto mb-12 animate-fade-up-3 leading-relaxed"
          style={{ color: "#f59e0b" }}
        >
          &ldquo;Great design doesn&rsquo;t just decorate ideas — it gives them
          meaning.&rdquo;
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-4">
          <button
            type="button"
            onClick={scrollToWork}
            data-ocid="hero.view_work.primary_button"
            className="px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)",
            }}
          >
            View Work
          </button>
          <button
            type="button"
            onClick={scrollToContact}
            data-ocid="hero.lets_talk.secondary_button"
            className="px-8 py-3.5 rounded-full font-semibold text-white border border-white/20 hover:border-violet-400/50 hover:bg-white/5 transition-all duration-300"
          >
            Let&rsquo;s Talk
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-up-5">
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span
              className="text-xs tracking-widest uppercase"
              style={{ letterSpacing: "0.2em" }}
            >
              Scroll
            </span>
            <ChevronDown size={20} className="animate-bounce-scroll" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-32" style={{ background: "#0f0f0f" }}>
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <p className="section-label mb-4 reveal">About Me</p>
            <h2
              className="section-title text-5xl md:text-6xl mb-8 reveal reveal-delay-1"
              style={{ lineHeight: 1.05 }}
            >
              The Mind Behind
              <br />
              <span className="gradient-text-violet">the Work</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-6 reveal reveal-delay-2">
              I&rsquo;m Gopal Krishna — a multi-disciplinary graphic designer
              driven by curiosity and a deep passion for visual communication.
              My process begins with questions: What does this brand stand for?
              What emotion should this design evoke?
            </p>
            <p className="text-white/60 leading-relaxed mb-10 reveal reveal-delay-3">
              I thrive in the space between concept and execution — exploring
              dozens of directions before committing to the one that&rsquo;s
              unmistakably right. From rough pencil sketches to refined digital
              systems, every mark I make has intention behind it.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 reveal reveal-delay-4">
              {[
                ["6+", "Years Experience"],
                ["120+", "Projects"],
                ["40+", "Clients"],
              ].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div
                    className="font-display font-black text-4xl mb-1"
                    style={{ color: "#8b5cf6" }}
                  >
                    {num}
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wider">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image grid */}
          <div className="grid grid-cols-2 gap-3 reveal-right">
            <div
              className="col-span-2 rounded-2xl overflow-hidden"
              style={{ height: "280px" }}
            >
              <img
                src="/assets/generated/portrait-designer.dim_600x700.jpg"
                alt="Gopal Krishna"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="rounded-xl overflow-hidden"
              style={{ height: "160px" }}
            >
              <img
                src="/assets/generated/sketchbook-desk.dim_800x600.jpg"
                alt="Sketchbook"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="rounded-xl overflow-hidden"
              style={{ height: "160px" }}
            >
              <img
                src="/assets/generated/design-desk-setup.dim_900x600.jpg"
                alt="Design desk"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
const services = [
  {
    icon: Pen,
    name: "Logo Design",
    desc: "Timeless marks that define identity",
  },
  {
    icon: Layers,
    name: "Brand Identity",
    desc: "Cohesive visual systems that tell stories",
  },
  {
    icon: Layout,
    name: "Poster Design",
    desc: "Bold compositions that command attention",
  },
  {
    icon: Share2,
    name: "Social Media Graphics",
    desc: "Scroll-stopping content for every platform",
  },
  {
    icon: Music,
    name: "Album Cover Artwork",
    desc: "Visual narratives for sonic experiences",
  },
  {
    icon: Package,
    name: "Packaging Design",
    desc: "Tactile brand experiences in physical form",
  },
  {
    icon: Type,
    name: "Typography Design",
    desc: "Custom letterforms with personality",
  },
  {
    icon: Monitor,
    name: "UI Graphic Assets",
    desc: "Pixel-perfect visual assets for digital products",
  },
  {
    icon: Compass,
    name: "Creative Direction",
    desc: "Strategic vision that guides brand aesthetics",
  },
  {
    icon: Megaphone,
    name: "Advertising Design",
    desc: "Campaigns that capture attention and drive action",
  },
  {
    icon: Sparkles,
    name: "Illustration Graphics",
    desc: "Unique hand-crafted visual narratives",
  },
  {
    icon: Zap,
    name: "Motion Concepts",
    desc: "Bringing static designs to life",
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-32" style={{ background: "#0a0a0a" }}>
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="section-label mb-3 reveal">Services</p>
          <h2 className="section-title text-5xl md:text-6xl reveal reveal-delay-1">
            What I Create
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <div
              key={s.name}
              className={`glass-card reveal reveal-delay-${Math.min((i % 4) + 1, 6)}`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(139, 92, 246, 0.15)" }}
              >
                <s.icon size={18} style={{ color: "#8b5cf6" }} />
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">
                {s.name}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Case Studies Section ─────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: 1,
    title: "NOIR BREW",
    client: "Coffee Brand & Packaging",
    challenge:
      "Create a premium dark-roast coffee brand that feels both artisanal and modern, balancing craft heritage with contemporary minimalism.",
    processSrc: "/assets/generated/coffee-brand-sketches.dim_800x600.jpg",
    finalSrc: "/assets/generated/coffee-brand-final.dim_800x600.jpg",
    tags: ["Branding", "Packaging", "Logo"],
    color: "#f59e0b",
  },
  {
    id: 2,
    title: "GRVND",
    client: "Streetwear Brand Identity",
    challenge:
      "Build a raw, unapologetic streetwear identity that resonates with urban youth culture — bold, gritty, and completely original.",
    processSrc: "/assets/generated/streetwear-brand-process.dim_800x600.jpg",
    finalSrc: "/assets/generated/streetwear-brand-final.dim_800x600.jpg",
    tags: ["Identity", "Typography", "Apparel"],
    color: "#ef4444",
  },
  {
    id: 3,
    title: "LUNA",
    client: "Music Album Artwork",
    challenge:
      "Translate an artist's emotional sound into a visual world through atmospheric imagery and celestial symbolism.",
    finalSrc: "/assets/generated/album-cover-final.dim_800x800.jpg",
    tags: ["Album Art", "Photography", "Art Direction"],
    color: "#8b5cf6",
  },
  {
    id: 4,
    title: "PRISM",
    client: "Festival Poster Design",
    challenge:
      "Design a poster that captures the energy and diversity of a multi-genre music festival through light, color, and bold typography.",
    finalSrc: "/assets/generated/festival-poster-final.dim_600x900.jpg",
    tags: ["Poster Design", "Typography", "Event"],
    color: "#06b6d4",
  },
  {
    id: 5,
    title: "SERENE",
    client: "Mobile App Branding",
    challenge:
      "Create a calm, trust-building visual identity for a wellness and mindfulness app — approachable, refined, and deeply human.",
    processSrc: "/assets/generated/mobile-app-process.dim_800x600.jpg",
    finalSrc: "/assets/generated/mobile-app-final.dim_800x600.jpg",
    tags: ["App Branding", "UI Assets", "Digital"],
    color: "#10b981",
  },
  {
    id: 6,
    title: "VELOUR",
    client: "Social Media Campaign",
    challenge:
      "Design a cohesive campaign visual system for a luxury fashion brand's seasonal launch across all social platforms.",
    finalSrc: "/assets/generated/social-campaign-final.dim_800x600.jpg",
    tags: ["Social Media", "Campaign", "Fashion"],
    color: "#f43f5e",
  },
];

function CaseStudiesSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (id: number) =>
    setExpanded((prev) => (prev === id ? null : id));

  return (
    <section id="work" className="py-32" style={{ background: "#111111" }}>
      <div className="section-container">
        <div className="mb-16">
          <p className="section-label mb-3 reveal">Case Studies</p>
          <h2 className="section-title text-5xl md:text-6xl reveal reveal-delay-1">
            Featured Work
          </h2>
        </div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <button
              key={project.id}
              type="button"
              data-ocid={`case_study.item.${project.id}`}
              className={`project-card-dark reveal reveal-delay-${Math.min(i + 1, 4)} cursor-pointer w-full text-left`}
              onClick={() => toggle(project.id)}
            >
              {/* Card header */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8">
                {/* Number */}
                <div
                  className="font-display font-black text-6xl md:text-7xl leading-none shrink-0"
                  style={{ color: project.color, opacity: 0.3 }}
                >
                  0{project.id}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-white/50 text-sm mt-0.5">
                        {project.client}
                      </p>
                    </div>
                    <div
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: `${project.color}22`,
                        border: `1px solid ${project.color}44`,
                      }}
                    >
                      {expanded === project.id ? (
                        <Minus size={14} style={{ color: project.color }} />
                      ) : (
                        <Plus size={14} style={{ color: project.color }} />
                      )}
                    </div>
                  </div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: `${project.color}15`,
                          color: project.color,
                          border: `1px solid ${project.color}30`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expanded content */}
              {expanded === project.id && (
                <div
                  className="border-t px-6 md:px-8 py-8"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                  role="presentation"
                >
                  <p className="text-white/60 mb-8 max-w-2xl leading-relaxed">
                    {project.challenge}
                  </p>
                  <div
                    className={`grid gap-6 ${
                      project.processSrc
                        ? "md:grid-cols-2"
                        : "md:grid-cols-1 max-w-2xl"
                    }`}
                  >
                    {project.processSrc && (
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-widest mb-3">
                          Process
                        </p>
                        <div
                          className="rounded-xl overflow-hidden"
                          style={{ height: "240px" }}
                        >
                          <img
                            src={project.processSrc}
                            alt={`${project.title} process`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-widest mb-3">
                        Final Design
                      </p>
                      <div
                        className="rounded-xl overflow-hidden"
                        style={{ height: "240px" }}
                      >
                        <img
                          src={project.finalSrc}
                          alt={`${project.title} final`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Client Mockups Showcase ──────────────────────────────────────────────────
const mockups = [
  {
    src: "/assets/generated/mockup-building-signage.dim_900x600.jpg",
    label: "Building Signage",
    span: "col-span-2",
  },
  {
    src: "/assets/generated/mockup-coffee-cups.dim_800x600.jpg",
    label: "Product Packaging",
    span: "",
  },
  {
    src: "/assets/generated/mockup-street-poster.dim_900x600.jpg",
    label: "Street Poster",
    span: "",
  },
  {
    src: "/assets/generated/mockup-vinyl-record.dim_800x800.jpg",
    label: "Vinyl Record",
    span: "",
  },
  {
    src: "/assets/generated/mockup-packaging-box.dim_800x600.jpg",
    label: "Retail Packaging",
    span: "",
  },
  {
    src: "/assets/generated/mockup-phone-social.dim_600x800.jpg",
    label: "Social Media",
    span: "",
  },
];

function MockupsSection() {
  return (
    <section className="py-32" style={{ background: "#0a0a0a" }}>
      <div className="section-container">
        <div className="mb-16">
          <p className="section-label mb-3 reveal">Real World</p>
          <h2 className="section-title text-5xl md:text-6xl reveal reveal-delay-1">
            Brought to Life
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {mockups.map((m, i) => (
            <div
              key={m.label}
              className={`mockup-item reveal reveal-delay-${Math.min(i + 1, 6)} ${
                i === 0 ? "col-span-2 md:col-span-2" : ""
              }`}
              style={{ height: i === 0 ? "300px" : "200px" }}
            >
              <img src={m.src} alt={m.label} />
              <div className="mockup-label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials: Testimonial[] = [
  {
    photo: "/assets/generated/testimonial-1.dim_200x200.jpg",
    name: "Aiko Tanaka",
    company: "NOIR BREW Coffee Co.",
    review:
      "Gopal transformed our brand vision into something far beyond what we imagined. The packaging design alone increased our shelf visibility by 40%. Truly extraordinary work.",
  },
  {
    photo: "/assets/generated/testimonial-2.dim_200x200.jpg",
    name: "Marcus Williams",
    company: "GRVND Clothing",
    review:
      "The brand identity he created for us is exactly what we needed. Bold, authentic, and completely on point with our audience. Our Instagram engagement tripled after the rebrand.",
  },
  {
    photo: "/assets/generated/testimonial-3.dim_200x200.jpg",
    name: "Elena Marchetti",
    company: "PRISM Festival",
    review:
      "Working with Gopal on our festival campaign was seamless. He understood the brief immediately and delivered posters that became iconic in our city. We'll never go back to another designer.",
  },
];

function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section className="py-32" style={{ background: "#111111" }}>
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="section-label mb-3 reveal">Testimonials</p>
          <h2 className="section-title text-5xl md:text-6xl reveal reveal-delay-1">
            Client Voices
          </h2>
        </div>

        <div className="max-w-3xl mx-auto reveal reveal-delay-2">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="carousel-slide absolute inset-0"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? "translateY(0)" : "translateY(12px)",
                pointerEvents: i === active ? "auto" : "none",
                position: i === active ? "relative" : "absolute",
              }}
            >
              <div className="glass-strong rounded-2xl p-8 md:p-12 text-center">
                <p className="font-serif italic text-lg md:text-xl text-white/80 leading-relaxed mb-8">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                    style={{ border: "2px solid rgba(139,92,246,0.4)" }}
                  />
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={prev}
              data-ocid="testimonials.prev.pagination_prev"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <ChevronLeft size={16} className="text-white/60" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  type="button"
                  key={testimonials[i].name}
                  onClick={() => setActive(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? "24px" : "8px",
                    height: "8px",
                    background:
                      i === active ? "#8b5cf6" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              data-ocid="testimonials.next.pagination_next"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <ChevronRight size={16} className="text-white/60" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────
const galleryImages: GalleryImage[] = [
  {
    src: "/assets/generated/gallery-typography-poster.dim_600x800.jpg",
    tag: "typography",
    title: "Typography Study",
  },
  {
    src: "/assets/generated/gallery-abstract-1.dim_600x600.jpg",
    tag: "abstract",
    title: "Electric Flow",
  },
  {
    src: "/assets/generated/gallery-magazine-layout.dim_900x600.jpg",
    tag: "branding",
    title: "Editorial Layout",
  },
  {
    src: "/assets/generated/gallery-branding-system.dim_900x600.jpg",
    tag: "branding",
    title: "Brand System",
  },
  {
    src: "/assets/generated/gallery-abstract-2.dim_600x800.jpg",
    tag: "abstract",
    title: "Cosmic Series",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-10-at-12.15.22-PM-5--3.jpeg",
    tag: "posters",
    title: "Tredzilla Poster Series",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-10-at-12.15.23-PM-4--1.jpeg",
    tag: "branding",
    title: "Business Card Design",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-10-at-12.15.21-PM-4--2.jpeg",
    tag: "posters",
    title: "Illustrator Portfolio",
  },
];

const filterLabels: { key: GalleryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "posters", label: "Posters" },
  { key: "branding", label: "Branding" },
  { key: "typography", label: "Typography" },
  { key: "abstract", label: "Abstract" },
];

function GallerySection() {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((g) => g.tag === filter);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeLightbox]);

  return (
    <section id="gallery" className="py-32" style={{ background: "#0a0a0a" }}>
      <div className="section-container">
        <div className="mb-12">
          <p className="section-label mb-3 reveal">Gallery</p>
          <h2 className="section-title text-5xl md:text-6xl reveal reveal-delay-1">
            Visual Explorations
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10 reveal reveal-delay-2">
          {filterLabels.map(({ key, label }) => (
            <button
              type="button"
              key={key}
              onClick={() => setFilter(key)}
              data-ocid={`gallery.${key}.tab`}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background:
                  filter === key ? "#8b5cf6" : "rgba(255,255,255,0.06)",
                color: filter === key ? "white" : "rgba(255,255,255,0.5)",
                border:
                  filter === key
                    ? "1px solid #8b5cf6"
                    : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((img) => (
            <button
              key={img.src}
              type="button"
              className="gallery-item break-inside-avoid mb-3 reveal w-full border-0 bg-transparent p-0 text-left"
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full block"
                style={{ display: "block" }}
              />
              <div className="overlay">
                <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                  {img.title}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          onKeyDown={(e) => e.key === "Escape" && closeLightbox()}
          role="presentation"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl"
          />
        </div>
      )}
    </section>
  );
}

// ─── Design Process ───────────────────────────────────────────────────────────
const processSteps = [
  {
    num: "01",
    title: "Research & Inspiration",
    desc: "Diving deep into the brand's world, competitors, and audience to uncover the emotional truth behind every brief.",
    img: "/assets/generated/process-moodboard.dim_800x600.jpg",
  },
  {
    num: "02",
    title: "Sketching Ideas",
    desc: "Rapid ideation with pen and paper, exploring all directions without judgment — the most honest part of the process.",
    img: "/assets/generated/process-sketching.dim_800x600.jpg",
  },
  {
    num: "03",
    title: "Digital Experimentation",
    desc: "Translating the best sketches into refined digital concepts, testing color, type, and form at full fidelity.",
    img: "/assets/generated/process-digital.dim_800x600.jpg",
  },
  {
    num: "04",
    title: "Design Refinement",
    desc: "Iterating and perfecting every detail — spacing, weight, color temperature, and proportion until nothing feels wrong.",
    img: "/assets/generated/sketchbook-desk.dim_800x600.jpg",
  },
  {
    num: "05",
    title: "Final Delivery",
    desc: "Packaging everything beautifully — files, guidelines, assets — for a seamless handoff and lasting impact.",
    img: "/assets/generated/design-desk-setup.dim_900x600.jpg",
  },
];

function ProcessSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="py-32" style={{ background: "#111111" }}>
      <div className="section-container">
        <div className="mb-16">
          <p className="section-label mb-3 reveal">Process</p>
          <h2 className="section-title text-5xl md:text-6xl reveal reveal-delay-1">
            How I Work
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Steps list */}
          <div className="space-y-3">
            {processSteps.map((step, i) => (
              <button
                key={step.num}
                type="button"
                onClick={() => setActive(i)}
                className={`reveal reveal-delay-${i + 1} w-full text-left flex gap-5 p-5 rounded-xl cursor-pointer transition-all duration-300 ${
                  active === i ? "glass-strong" : "hover:bg-white/3"
                }`}
                style={{
                  borderLeft:
                    active === i
                      ? "2px solid #8b5cf6"
                      : "2px solid transparent",
                }}
              >
                <div
                  className="font-display font-black text-2xl leading-none shrink-0"
                  style={{
                    color: active === i ? "#8b5cf6" : "rgba(255,255,255,0.2)",
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <h3
                    className="font-semibold mb-1 transition-colors duration-300"
                    style={{
                      color: active === i ? "white" : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {step.title}
                  </h3>
                  {active === i && (
                    <p className="text-white/50 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Image */}
          <div className="reveal-right sticky top-24">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ height: "400px" }}
            >
              <img
                src={processSteps[active].img}
                alt={processSteps[active].title}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-white/40 text-sm">
                {processSteps[active].title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────
const skills = [
  { name: "Logo Design", pct: 98 },
  { name: "Branding", pct: 95 },
  { name: "Poster Design", pct: 94 },
  { name: "Visual Storytelling", pct: 93 },
  { name: "Typography", pct: 92 },
  { name: "Layout Design", pct: 90 },
  { name: "Social Media Graphics", pct: 88 },
  { name: "Creative Direction", pct: 85 },
];

function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32"
      style={{ background: "#0a0a0a" }}
    >
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="section-label mb-3 reveal">Expertise</p>
          <h2 className="section-title text-5xl md:text-6xl reveal reveal-delay-1">
            Skills &amp; Expertise
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className={`reveal reveal-delay-${Math.min(i + 1, 8)}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/80 text-sm font-medium">
                  {skill.name}
                </span>
                <span className="text-white/40 text-xs">{skill.pct}%</span>
              </div>
              <div className="skill-bar-track">
                <div
                  className="skill-bar-fill"
                  style={{ width: triggered ? `${skill.pct}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      if (form.email && form.name && form.message) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }, 1200);
  };

  return (
    <section id="contact" className="py-32" style={{ background: "#0f0f0f" }}>
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <p className="section-label mb-4 reveal">Contact</p>
            <h2
              className="section-title text-5xl md:text-6xl mb-6 reveal reveal-delay-1"
              style={{ lineHeight: 1.05 }}
            >
              Let&rsquo;s Create
              <br />
              <span className="gradient-text-violet">Something</span>
            </h2>
            <p className="text-white/50 leading-relaxed mb-10 reveal reveal-delay-2">
              Have a project in mind? I&rsquo;d love to hear about it.
              Let&rsquo;s talk about your vision and how great design can bring
              it to life.
            </p>

            <div className="space-y-5 reveal reveal-delay-3">
              <a
                href="mailto:hello@gopalkrishna.design"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(139,92,246,0.15)" }}
                >
                  <Mail size={16} style={{ color: "#8b5cf6" }} />
                </div>
                <span className="text-white/60 group-hover:text-white transition-colors text-sm">
                  hello@gopalkrishna.design
                </span>
              </a>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(139,92,246,0.15)" }}
                >
                  <MapPin size={16} style={{ color: "#8b5cf6" }} />
                </div>
                <span className="text-white/60 text-sm">
                  Available Worldwide · Based in India
                </span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-10 reveal reveal-delay-4">
              {[
                {
                  icon: Instagram,
                  label: "Instagram",
                  href: "https://instagram.com",
                },
                { icon: Github, label: "Behance", href: "https://behance.net" },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: "https://linkedin.com",
                },
                {
                  icon: ExternalLink,
                  label: "Dribbble",
                  href: "https://dribbble.com",
                },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Icon size={16} className="text-white/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal-right">
            {status === "success" ? (
              <div
                data-ocid="contact.success_state"
                className="glass-strong rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.3)",
                  }}
                >
                  <Send size={24} style={{ color: "#10b981" }} />
                </div>
                <h3 className="text-white font-display font-bold text-2xl mb-3">
                  Message Sent!
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Thanks for reaching out. I&rsquo;ll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-strong rounded-2xl p-8 space-y-5"
              >
                {status === "error" && (
                  <div
                    data-ocid="contact.error_state"
                    className="p-4 rounded-xl text-sm"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      color: "#f87171",
                    }}
                  >
                    Please fill in all required fields.
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs text-white/40 mb-2 uppercase tracking-wider"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      data-ocid="contact.name.input"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-white/20 text-sm outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(139,92,246,0.5)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(139,92,246,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.1)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs text-white/40 mb-2 uppercase tracking-wider"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      data-ocid="contact.email.input"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-white/20 text-sm outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(139,92,246,0.5)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(139,92,246,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.1)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-project-type"
                    className="block text-xs text-white/40 mb-2 uppercase tracking-wider"
                  >
                    Project Type
                  </label>
                  <select
                    id="contact-project-type"
                    data-ocid="contact.project_type.select"
                    value={form.projectType}
                    onChange={(e) =>
                      setForm({ ...form, projectType: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none cursor-pointer transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: form.projectType
                        ? "white"
                        : "rgba(255,255,255,0.3)",
                    }}
                  >
                    <option value="" style={{ background: "#1a1a1a" }}>
                      Select project type
                    </option>
                    <option value="branding" style={{ background: "#1a1a1a" }}>
                      Brand Identity
                    </option>
                    <option value="logo" style={{ background: "#1a1a1a" }}>
                      Logo Design
                    </option>
                    <option value="poster" style={{ background: "#1a1a1a" }}>
                      Poster Design
                    </option>
                    <option value="packaging" style={{ background: "#1a1a1a" }}>
                      Packaging Design
                    </option>
                    <option value="social" style={{ background: "#1a1a1a" }}>
                      Social Media Graphics
                    </option>
                    <option value="other" style={{ background: "#1a1a1a" }}>
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs text-white/40 mb-2 uppercase tracking-wider"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    data-ocid="contact.message.textarea"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/20 text-sm outline-none resize-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(139,92,246,0.5)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(139,92,246,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  data-ocid="contact.submit.submit_button"
                  disabled={status === "loading"}
                  className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                    boxShadow: "0 0 20px rgba(139,92,246,0.3)",
                  }}
                >
                  {status === "loading" ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="text-center md:text-left">
            <div className="font-display font-black text-2xl text-white tracking-tight mb-1">
              GK<span style={{ color: "#8b5cf6" }}>.</span>
            </div>
            <p className="text-white/30 text-xs">
              Crafting visual stories that matter.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-white/40">
            {["Work", "About", "Services", "Process", "Contact"].map((link) => (
              <button
                type="button"
                key={link}
                onClick={() =>
                  document
                    .getElementById(link.toLowerCase())
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="hover:text-white transition-colors"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Social */}
          <div className="flex gap-3">
            {[
              {
                icon: Instagram,
                href: "https://instagram.com",
                name: "Instagram",
              },
              { icon: Github, href: "https://github.com", name: "Github" },
              {
                icon: Linkedin,
                href: "https://linkedin.com",
                name: "LinkedIn",
              },
            ].map(({ icon: SIcon, href, name }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <SIcon size={14} className="text-white/40" />
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-white/25">
            &copy; {year} Gopal Krishna. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/25 hover:text-white/50 transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal();

  return (
    <div
      className="min-h-screen text-foreground overflow-x-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CaseStudiesSection />
        <MockupsSection />
        <TestimonialsSection />
        <GallerySection />
        <ProcessSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
