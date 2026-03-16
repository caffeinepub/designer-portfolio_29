import { Camera, Code, Layers, Palette, Pen, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

const skills = [
  {
    icon: Pen,
    title: "Brand Identity",
    description:
      "Logos, visual identity systems, and brand guidelines that make lasting impressions.",
  },
  {
    icon: Palette,
    title: "Illustration",
    description:
      "Character art, whimsical scenes, and editorial illustration in traditional & digital mediums.",
  },
  {
    icon: Layers,
    title: "Poster Design",
    description:
      "Bold, typographic posters infused with street art energy and modern sensibility.",
  },
  {
    icon: Camera,
    title: "Photography",
    description:
      "Product and fashion photography direction with an eye for mood and storytelling.",
  },
  {
    icon: Sparkles,
    title: "Typography",
    description:
      "Custom lettering, font pairing, and type hierarchy that brings messages to life.",
  },
  {
    icon: Code,
    title: "UI Design",
    description:
      "Clean interface design for digital products with focus on usability and aesthetics.",
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
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
      { threshold: 0.08 },
    );
    for (const item of items) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="reveal text-center mb-14">
          <span className="section-label">Expertise</span>
          <h2 className="section-title mt-2">
            What I <span className="italic text-teal-500">Do</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Comprehensive creative services tailored to bring your vision to
            life.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <div
              key={skill.title}
              data-ocid={`services.item.${i + 1}`}
              className={`reveal-scale reveal-delay-${Math.min(i + 1, 6)} skill-card`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 mb-4">
                <skill.icon size={20} className="text-teal-600" />
              </div>
              <h3 className="font-semibold text-black mb-2">{skill.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
