import { Code2, Palette, Rocket, GraduationCap } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getPerformanceTier } from "../utils/performanceTier";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const skillsRef = useRef(null);
  const statsRef = useRef(null);

  const skills = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "Frontend & Backend Web Applications"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Clean, Responsive & User-Friendly Interfaces"
    },
    {
      icon: Rocket,
      title: "Mobile Development",
      description: "Flutter UI, State Management & Local Storage"
    },
    {
      icon: GraduationCap,
      title: "Software Testing",
      description: "Postman, JUnit, Katalon & BrowserStack"
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
        // Skills cards animation
        gsap.fromTo(
          skillsRef.current?.children || [],
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
              trigger: skillsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // Stats animation
        gsap.fromTo(
          statsRef.current?.children || [],
          {
            opacity: 0,
            scale: 0.5,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
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
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen bg-black flex items-center justify-center pt-28 md:pt-32 pb-20 px-6 md:px-12 lg:px-16 xl:px-20 overflow-hidden"
    >
      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-black to-black pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-12" ref={headerRef}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
            <span className="text-orange-500 text-sm tracking-wider uppercase">About Me</span>
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Building Modern<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Web & Mobile Applications
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            I’m a Software Engineering student and Full-Stack Developer with a strong focus on building responsive web and mobile applications. I enjoy creating clean, user-friendly interfaces and turning ideas into practical, real-world solutions. Alongside development, I have experience working with modern tools and technologies to build efficient and scalable applications. I’m continuously learning and improving my skills to grow as a developer and deliver better results.
          </p>
        </div>

        {/* Skills Grid - Compact & Clean */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" ref={skillsRef}>
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-orange-500/30"
              >
                {/* Icon */}
                <div className="mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-orange-500" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-white text-sm font-semibold mb-1">
                  {skill.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8" ref={statsRef}>
          <div className="text-center">
            <div className="text-orange-500 text-4xl md:text-5xl font-bold mb-2">10+</div>
            <div className="text-white/60 text-sm md:text-base">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-orange-500 text-4xl md:text-5xl font-bold mb-2">5+</div>
            <div className="text-white/60 text-sm md:text-base">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-orange-500 text-4xl md:text-5xl font-bold mb-2">100%</div>
            <div className="text-white/60 text-sm md:text-base">Dedication</div>
          </div>
          <div className="text-center">
            <div className="text-orange-500 text-4xl md:text-5xl font-bold mb-2">24/7</div>
            <div className="text-white/60 text-sm md:text-base">Availability</div>
          </div>
        </div>
      </div>
    </section>
  );
}
