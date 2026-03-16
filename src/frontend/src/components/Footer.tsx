import { ExternalLink, Heart } from "lucide-react";

const services = [
  "Brand Identity",
  "Illustration",
  "Poster Design",
  "UI Design",
];
const links = ["Work", "About", "Services", "Contact"];
const social = [
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Dribbble", href: "#" },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id.toLowerCase());
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="section-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-xl font-bold text-black mb-3">
              DesignStudio
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Creative freelance services by Gopal Krishna — Designer &amp;
              Illustrator.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <span className="text-sm text-gray-600 hover:text-teal-600 cursor-default transition-colors">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Links
            </h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l}>
                  <button
                    type="button"
                    data-ocid={"footer.link"}
                    onClick={() => scrollTo(l)}
                    className="text-sm text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Social
            </h4>
            <ul className="space-y-2">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-sm text-gray-600 hover:text-teal-600 transition-colors flex items-center gap-1"
                  >
                    {s.label} <ExternalLink size={11} className="opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            &copy; {year} DesignStudio &bull; Let&apos;s create something
            amazing together.
          </p>
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            Built with{" "}
            <Heart size={11} className="text-teal-500 fill-current" /> using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 hover:text-teal-600 transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
