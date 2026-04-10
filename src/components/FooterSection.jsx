import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Heart, ArrowUp } from "lucide-react";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { isHighTierDevice } from "../utils/performanceTier";

gsap.registerPlugin(ScrollTrigger);

export function FooterSection() {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Journey", href: "#journey" },
    { name: "Projects", href: "#projects" },
    { name: "Connect", href: "#connect" },
  ];

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/Bakhtawar1910", label: "GitHub" },
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/bakhtawar-khan-b59615213/", label: "LinkedIn" },
    { icon: FaEnvelope, href: "mailto:biakhan2005@gmail.com", label: "Email" },
  ];

  const contactInfo = [
    { icon: Mail, text: "biakhan2005@gmail.com" },
    { icon: MapPin, text: "Nowshera, Khyber Pakhtunkhwa, Pakistan" },
  ];

  useEffect(() => {
    if (!isHighTierDevice()) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      // Footer content animation
      gsap.fromTo(
        contentRef.current?.children || [],
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="relative bg-zinc-950 pt-28 md:pt-32 pb-20 px-6 md:px-12 lg:px-16 xl:px-20">
      {/* Subtle top border effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-zinc-950 to-zinc-950 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div ref={contentRef} className="space-y-12">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <h3 className="text-white text-2xl font-bold mb-2">
                  Bakhtawar<span className="text-orange-500">.</span>
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Crafting innovative digital experiences with passion and precision.
                </p>
              </div>
              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="group w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-[transform,background-color,border-color,color] duration-300 hover:-translate-y-1"
                    >
                      <Icon className="w-4 h-4 text-white/60 group-hover:text-orange-500 transition-colors duration-300" strokeWidth={2} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/50 hover:text-orange-500 transition-colors duration-300 text-sm inline-block hover:translate-x-1 transform"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Get In Touch</h4>
              <ul className="space-y-3">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <Icon className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <span className="text-white/50 text-sm">{info.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-white/50 text-sm mb-4">
                Subscribe to get latest updates and news about my work.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  const email = (formData.get("newsletterEmail") || "").toString().trim();

                  const emailSubject = encodeURIComponent("Newsletter Subscription Request");
                  const emailBody = encodeURIComponent(
                    `Please add this email to the newsletter list:\n${email}`
                  );

                  window.location.href = `mailto:biakhan2005@gmail.com?subject=${emailSubject}&body=${emailBody}`;
                  form.reset();
                }}
                className="space-y-3"
              >
                <input
                  type="email"
                  name="newsletterEmail"
                  aria-label="Newsletter email"
                  placeholder="Your email"
                  required
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-[background-color,border-color] duration-300"
                />
                <button
                  type="submit"
                  className="btn-orange-shine w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-transform duration-300 hover:scale-[1.02]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-white/50 text-sm flex items-center gap-2">
              © {new Date().getFullYear()} Made with{" "}
              <Heart className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
              by <span className="text-orange-500 font-medium">Bakhtawar</span>
            </p>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-white/50 hover:text-orange-500 transition-colors duration-300 text-sm"
            >
              <span>Back to Top</span>
              <div className="w-8 h-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-[transform,background-color,border-color] duration-300 group-hover:-translate-y-1">
                <ArrowUp className="w-4 h-4" strokeWidth={2} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
