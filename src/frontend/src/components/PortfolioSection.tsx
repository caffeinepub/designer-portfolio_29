import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    image: "/assets/uploads/WhatsApp-Image-2026-03-10-at-12.15.23-PM-4--1.jpeg",
    title: "Tredzilla Business Card Design",
    description: "Brand identity & print design",
    category: "Branding",
    original: false,
  },
  {
    id: 2,
    image: "/assets/uploads/WhatsApp-Image-2026-03-10-at-12.15.21-PM-4--2.jpeg",
    title: "Gopal Krishna — Illustrator Portfolio",
    description: "Personal branding & illustration",
    category: "Illustration",
    original: false,
  },
  {
    id: 3,
    image: "/assets/uploads/WhatsApp-Image-2026-03-10-at-12.15.22-PM-5--3.jpeg",
    title: "Tredzilla Sale Poster Series",
    description: "Poster design & typography",
    category: "Poster Design",
    original: false,
  },
  {
    id: 4,
    image: "/assets/uploads/WhatsApp-Image-2026-03-10-at-12.15.21-PM-3--4.jpeg",
    title: "Welcome Portfolio Illustration",
    description: "Character illustration & lettering",
    category: "Illustration",
    original: false,
  },
  {
    id: 5,
    image: "/assets/uploads/WhatsApp-Image-2026-03-10-at-12.15.23-PM-3--5.jpeg",
    title: "Tredzilla Poster Iterations",
    description: "Concept development & design process",
    category: "Poster Design",
    original: false,
  },
  {
    id: 6,
    image: "/assets/uploads/WhatsApp-Image-2026-03-10-at-12.15.22-PM-3--6.jpeg",
    title: "Tredzilla Research & Moodboard",
    description: "Research, strategy & visual direction",
    category: "Strategy",
    original: false,
  },
];

const originalArtworks = [
  {
    id: 7,
    image: "/assets/generated/artwork-portrait-botanical.dim_800x1000.jpg",
    title: "Portrait in Bloom",
    description:
      "Ink & watercolor — figure study with botanical transformation",
    category: "Original Art",
    medium: "Ink · Watercolour",
  },
  {
    id: 8,
    image: "/assets/generated/artwork-type-poster.dim_800x1000.jpg",
    title: "Create Without Fear",
    description: "Hand-lettered typographic poster with ink and doodles",
    category: "Original Art",
    medium: "Brush Lettering · Ink",
  },
  {
    id: 9,
    image: "/assets/generated/artwork-city-scene.dim_800x600.jpg",
    title: "Dusk on the Street",
    description: "Gouache painting of an Indian street scene at twilight",
    category: "Original Art",
    medium: "Gouache · Hand-painted",
  },
  {
    id: 10,
    image: "/assets/generated/artwork-character-sketches.dim_800x600.jpg",
    title: "Character Sketchbook",
    description: "Raw pencil sketches — character design exploration process",
    category: "Original Art",
    medium: "Pencil · Sketchbook",
  },
  {
    id: 11,
    image: "/assets/generated/artwork-collage.dim_800x600.jpg",
    title: "Mood Fragments",
    description: "Mixed media collage — torn paper, paint, and handwriting",
    category: "Original Art",
    medium: "Collage · Mixed Media",
  },
];

export default function PortfolioSection() {
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
      { threshold: 0.06 },
    );
    for (const item of items) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ---- CLIENT WORK ---- */}
      <section id="work" ref={sectionRef} className="py-20 bg-white">
        <div className="section-container">
          <div className="reveal text-center mb-14">
            <span className="section-label">Portfolio</span>
            <h2 className="section-title mt-2">
              Selected <span className="italic text-teal-500">Work</span>
            </h2>
            <p className="section-subtitle mx-auto">
              A curated selection of projects spanning brand identity,
              illustration, poster design, and visual strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div
                key={project.id}
                data-ocid={`portfolio.item.${i + 1}`}
                className={`reveal-scale reveal-delay-${Math.min(i + 1, 6)} project-card group`}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-teal-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm flex items-center gap-2">
                      View Case Study <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block text-xs font-semibold text-teal-600 bg-teal-50 rounded-full px-3 py-1 mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-semibold text-sm text-black leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- ORIGINAL ARTWORK ---- */}
      <section id="artwork" className="py-24 bg-[#faf9f7]">
        <div className="section-container">
          <div className="reveal text-center mb-14">
            <span className="section-label">Original Artwork</span>
            <h2 className="section-title mt-2">
              Made by <span className="italic text-teal-500">Hand</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Personal works exploring ink, watercolour, gouache, and collage —
              raw process pieces that drive the design thinking.
            </p>
          </div>

          {/* Masonry-style mixed grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {/* Large feature piece spans 2 rows */}
            <div
              data-ocid="artwork.item.1"
              className="reveal-scale group relative rounded-2xl overflow-hidden shadow-card lg:row-span-2 cursor-pointer"
            >
              <img
                src={originalArtworks[0].image}
                alt={originalArtworks[0].title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: "340px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
                <span className="text-teal-300 text-[10px] font-bold uppercase tracking-widest">
                  {originalArtworks[0].medium}
                </span>
                <h3 className="text-white font-semibold text-base mt-1">
                  {originalArtworks[0].title}
                </h3>
                <p className="text-white/70 text-xs mt-0.5">
                  {originalArtworks[0].description}
                </p>
              </div>
              {/* Always-visible label below on mobile */}
              <div className="p-4 bg-white">
                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">
                  {originalArtworks[0].medium}
                </span>
                <h3 className="font-semibold text-sm text-black mt-0.5">
                  {originalArtworks[0].title}
                </h3>
              </div>
            </div>

            {/* Remaining pieces */}
            {originalArtworks.slice(1).map((art, i) => (
              <div
                key={art.id}
                data-ocid={`artwork.item.${i + 2}`}
                className={`reveal-scale reveal-delay-${Math.min(i + 1, 5)} group relative rounded-2xl overflow-hidden shadow-card cursor-pointer`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    loading="lazy"
                    className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
                    <p className="text-white/80 text-xs">{art.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">
                    {art.medium}
                  </span>
                  <h3 className="font-semibold text-sm text-black mt-0.5">
                    {art.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
