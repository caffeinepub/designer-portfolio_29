import { useEffect, useRef } from "react";

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Projects" },
  { value: "5+", label: "Happy Clients" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = section.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale",
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
    <section id="about" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="reveal-left relative">
            <div className="relative rounded-2xl overflow-hidden shadow-card max-w-md mx-auto lg:mx-0">
              <img
                src="/assets/uploads/WhatsApp-Image-2026-03-10-at-12.15.23-PM-5--7.jpeg"
                alt="Gopal Krishna — Designer & Illustrator"
                className="w-full h-auto object-cover"
              />
              {/* Teal accent border */}
              <div className="absolute inset-0 ring-1 ring-teal-200/40 rounded-2xl pointer-events-none" />
            </div>
            {/* Floating stat badge */}
            <div className="absolute -bottom-4 -right-4 lg:right-4 bg-white rounded-2xl shadow-card px-6 py-4 border border-gray-100">
              <div className="font-display text-3xl font-bold text-teal-500">
                3+
              </div>
              <div className="text-xs text-gray-500 mt-0.5 uppercase tracking-wider">
                Years of
                <br />
                Excellence
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <div className="reveal">
              <span className="section-label">About Me</span>
              <h2 className="section-title mt-2">Gopal Krishna</h2>
              <p className="text-teal-600 font-medium mt-1">
                Designer &amp; Illustrator
              </p>
            </div>

            <p className="reveal reveal-delay-1 text-gray-600 leading-relaxed">
              I specialize in traditional and digital mediums, telling stories
              through delicate characters, whimsical landscapes, and lettering.
              I love blending street art energy with clean modern design to
              create work that feels both unique and impactful.
            </p>

            <p className="reveal reveal-delay-2 text-gray-600 leading-relaxed">
              Whether it&apos;s a bold brand identity, an intricate
              illustration, or a typographic poster, I bring the same level of
              care and creativity to every project.
            </p>

            {/* Stats */}
            <div className="reveal-scale reveal-delay-3 grid grid-cols-3 gap-4 pt-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-xs"
                >
                  <div className="font-display text-2xl font-bold text-teal-500">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
