import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Send, Briefcase } from "lucide-react";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { getPerformanceTier } from "../utils/performanceTier";

gsap.registerPlugin(ScrollTrigger);

export function ConnectSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contactInfoRef = useRef(null);
  const socialLinksRef = useRef(null);
  const formRef = useRef(null);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "biakhan2005@gmail.com",
      href: "mailto:biakhan2005@gmail.com"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Nowshera, Khyber Pakhtunkhwa, Pakistan",
      href: null
    },
    {
      icon: Briefcase,
      title: "Currently",
      value: "Intern at CUSIT IT and Robotics Society",
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      name: "GitHub",
      href: "https://github.com/Bakhtawar1910",
      color: "hover:text-white"
    },
    {
      icon: FaLinkedinIn,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/bakhtawar-khan-b59615213/",
      color: "hover:text-blue-400"
    },
    {
      icon: FaEnvelope,
      name: "Email",
      href: "mailto:biakhan2005@gmail.com",
      color: "hover:text-orange-400"
    }
  ];

  useEffect(() => {
    const tier = getPerformanceTier();
    if (tier !== "high") {
      return undefined;
    }

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current?.children || [],
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 30%",
            toggleActions: "play none none none",
          },
        }
      );

      if (tier === "high") {
        // Contact info cards animation
        gsap.fromTo(
          contactInfoRef.current?.children || [],
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactInfoRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // Social links animation
        gsap.fromTo(
          socialLinksRef.current?.children || [],
          {
            opacity: 0,
            scale: 0.85,
            y: 16,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: socialLinksRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // Form animation
        gsap.fromTo(
          formRef.current,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="connect"
      ref={sectionRef}
      className="relative min-h-screen bg-black pt-28 md:pt-32 pb-20 px-6 md:px-12 lg:px-16 xl:px-20"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-12" ref={headerRef}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
            <span className="text-orange-500 text-sm tracking-wider uppercase">
              Get In Touch
            </span>
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Let's Connect &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Build Something Amazing
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            I'm open to internship opportunities, collaborations, and real-world projects. Feel free to reach out if you'd like to work together or discuss ideas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Contact Info & Social Links */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <div className="space-y-4" ref={contactInfoRef}>
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const cardClassName = "group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-[transform,background-color,border-color,box-shadow] duration-300 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/10 flex items-center gap-4 block";

                if (info.href) {
                  return (
                    <a
                      key={index}
                      href={info.href}
                      className={cardClassName}
                    >
                      {/* Icon */}
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-orange-500" strokeWidth={2} />
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-white/60 text-xs uppercase tracking-wider mb-1">
                          {info.title}
                        </h3>
                        <p className="text-white text-sm md:text-base font-medium">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  );
                }

                return (
                  <div key={index} className={cardClassName}>
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-orange-500" strokeWidth={2} />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-white/60 text-xs uppercase tracking-wider mb-1">
                        {info.title}
                      </h3>
                      <p className="text-white text-sm md:text-base font-medium">
                        {info.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Connect on Social Media</h3>
              <div className="flex gap-4" ref={socialLinksRef}>
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-[transform,background-color,border-color,color] duration-300 hover:border-orange-500/30 hover:-translate-y-1 ${social.color}`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5 text-white/60 group-hover:text-orange-500 transition-colors duration-300" strokeWidth={2} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form
            ref={formRef}
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              const name = (formData.get("name") || "").toString().trim();
              const email = (formData.get("email") || "").toString().trim();
              const subject = (formData.get("subject") || "").toString().trim();
              const message = (formData.get("message") || "").toString().trim();

              const emailSubject = encodeURIComponent(subject || "Portfolio Inquiry");
              const emailBody = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
              );

              window.location.href = `mailto:biakhan2005@gmail.com?subject=${emailSubject}&body=${emailBody}`;
              form.reset();
            }}
          >
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-white/60 text-sm mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-[background-color,border-color] duration-300"
                placeholder="John Doe"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-white/60 text-sm mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-[background-color,border-color] duration-300"
                placeholder="john@example.com"
              />
            </div>

            {/* Subject Input */}
            <div>
              <label htmlFor="subject" className="block text-white/60 text-sm mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-[background-color,border-color] duration-300"
                placeholder="Project Inquiry"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label htmlFor="message" className="block text-white/60 text-sm mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-[background-color,border-color] duration-300 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-orange-shine group w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-medium transition-transform duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Send Message</span>
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
