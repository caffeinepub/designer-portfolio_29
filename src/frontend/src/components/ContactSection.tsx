import { Loader2, Mail, MapPin, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiBehance, SiDribbble, SiInstagram } from "react-icons/si";
import { toast } from "sonner";

const socialLinks = [
  { icon: SiInstagram, label: "Instagram", href: "#" },
  { icon: SiBehance, label: "Behance", href: "#" },
  { icon: SiDribbble, label: "Dribbble", href: "#" },
];

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = section.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-left, .reveal-right",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setSubmitted(true);
    toast.success("Message sent! I'll be in touch soon.");
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="section-container">
        {/* Header */}
        <div className="reveal text-center mb-14">
          <span className="section-label">Contact</span>
          <h2 className="section-title mt-2">Let&apos;s Work Together</h2>
          <p className="section-subtitle mx-auto">
            Have a project in mind? I&apos;d love to hear about it.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left info */}
          <div className="reveal-left space-y-8">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-teal-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    Email
                  </div>
                  <a
                    href="mailto:gopal@designstudio.in"
                    className="text-sm font-medium text-black hover:text-teal-600 transition-colors"
                  >
                    gopal@designstudio.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-teal-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    Location
                  </div>
                  <span className="text-sm font-medium text-black">India</span>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-4">
                Find Me Online
              </div>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-teal-300 hover:text-teal-600 transition-colors shadow-xs"
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Available card */}
            <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-xs">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse-dot" />
                <span className="font-semibold text-sm text-black">
                  Currently Available
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Open to new projects and collaborations. Response within 24
                hours.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="reveal-right">
            {submitted ? (
              <div
                data-ocid="contact.success_state"
                className="bg-white rounded-3xl p-10 border border-gray-100 shadow-card text-center flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                  <Send size={24} className="text-teal-500" />
                </div>
                <h3 className="font-display text-2xl font-bold text-black mb-3">
                  Message Sent!
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Thanks for reaching out. I&apos;ll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card space-y-5"
              >
                <div>
                  <label
                    htmlFor="c-name"
                    className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider"
                  >
                    Your Name
                  </label>
                  <input
                    id="c-name"
                    data-ocid="contact.input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Johnson"
                    className="field-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="c-email"
                    className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  <input
                    id="c-email"
                    data-ocid="contact.input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="field-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="c-message"
                    className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider"
                  >
                    Message
                  </label>
                  <textarea
                    id="c-message"
                    data-ocid="contact.textarea"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project..."
                    className="field-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm bg-teal-600 hover:bg-teal-500 text-white disabled:opacity-60 transition-colors"
                >
                  {sending ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} /> Send Message
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
