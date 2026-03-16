import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "Gopal's work on our brand identity was exceptional. The business cards and poster series came out exactly as envisioned — bold, clean, and instantly recognizable.",
    author: "Arjun Mehta",
    role: "Founder, Tredzilla",
    initials: "AM",
  },
  {
    id: 2,
    quote:
      "Working with Gopal was a breeze. He understood our creative brief immediately and delivered whimsical illustrations that truly captured our brand's character.",
    author: "Priya Sharma",
    role: "Creative Director, Bloom Studio",
    initials: "PS",
  },
  {
    id: 3,
    quote:
      "The poster series Gopal designed for our sale campaigns drove incredible engagement. His typographic skills and eye for composition are top-notch.",
    author: "Ravi Kumar",
    role: "Marketing Manager, StyleCo",
    initials: "RK",
  },
];

const STARS = ["s1", "s2", "s3", "s4", "s5"];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((c) => (c + 1) % testimonials.length),
      5000,
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = section.querySelectorAll<HTMLElement>(".reveal");
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

  const t = testimonials[current];

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="reveal text-center mb-14">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title mt-2">
            Client <span className="italic text-teal-500">Stories</span>
          </h2>
        </div>

        <div className="reveal reveal-delay-1 max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-card">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {STARS.map((key) => (
                <Star
                  key={key}
                  size={14}
                  fill="#14B8A6"
                  className="text-teal-500"
                />
              ))}
            </div>

            <blockquote className="text-lg text-gray-700 leading-relaxed mb-8 font-medium">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {t.initials}
              </div>
              <div>
                <div className="font-semibold text-black text-sm">
                  {t.author}
                </div>
                <div className="text-xs text-gray-500">{t.role}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5 mt-7">
            <button
              type="button"
              data-ocid="testimonials.pagination_prev"
              onClick={prev}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-teal-300 hover:text-teal-600 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((item, idx) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setCurrent(idx)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: idx === current ? "24px" : "8px",
                    height: "8px",
                    backgroundColor: idx === current ? "#14B8A6" : "#d1d5db",
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              data-ocid="testimonials.pagination_next"
              onClick={next}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-teal-300 hover:text-teal-600 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
