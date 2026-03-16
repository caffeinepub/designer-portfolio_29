import { FileImage, Hexagon, Monitor, Share2 } from "lucide-react";
import { useEffect, useRef } from "react";

const services = [
  {
    icon: Hexagon,
    title: "Brand Identity",
    description:
      "Logo design, visual identity systems, and brand guidelines that position your company with authority and distinction.",
    color: "oklch(0.65 0.28 300)",
    tag: "Strategy \u00b7 Visual Design",
  },
  {
    icon: Share2,
    title: "Social Media Design",
    description:
      "Scroll-stopping content creation, cohesive templates, and campaign visuals built for engagement and brand recognition.",
    color: "oklch(0.70 0.24 310)",
    tag: "Content \u00b7 Campaigns",
  },
  {
    icon: FileImage,
    title: "Poster &amp; Print Design",
    description:
      "Event posters, editorial flyers, and print-ready layouts that command attention and communicate with precision.",
    color: "oklch(0.75 0.18 200)",
    tag: "Print \u00b7 Editorial",
  },
  {
    icon: Monitor,
    title: "UI Graphics",
    description:
      "Interface elements, icon sets, and app visuals crafted for clarity, beauty, and an exceptional user experience.",
    color: "oklch(0.72 0.20 230)",
    tag: "UX \u00b7 Interface",
  },
];

const scrollToContact = () => {
  const el = document.getElementById("contact");
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    // Use reveal-scale for cards, reveal for headers
    const items = section.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-scale",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 },
    );
    for (const item of items) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.28 300 / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="section-container">
        <div className="reveal text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/60" />
            <span className="section-label text-primary">Services</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/60" />
          </div>
          <h2 className="section-title">
            What I <span className="gradient-text">Offer</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Comprehensive design solutions tailored to elevate your brand and
            captivate your audience.
          </p>
        </div>

        {/* Cards — reveal-scale for satisfying pop-in */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`reveal-scale reveal-delay-${i + 1} service-card group`}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${service.color}18`,
                  border: `1px solid ${service.color}40`,
                  boxShadow: `0 0 20px ${service.color}20, inset 0 1px 0 ${service.color}30`,
                }}
              >
                <service.icon size={22} style={{ color: service.color }} />
              </div>

              <div
                className="text-xs font-semibold mb-3"
                style={{ color: service.color, letterSpacing: "0.16em" }}
              >
                {service.tag}
              </div>

              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 hover:gap-2.5"
                style={{ color: service.color }}
              >
                Learn More
                <span className="text-base leading-none">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
