import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getPerformanceTier } from "../utils/performanceTier";
import {
  Code2,
  Palette,
  Database,
  Server,
  Terminal,
  Globe,
  Cpu,
  Layout,
  GitBranch,
  Boxes,
  Box,
  Brush,
  FileCode,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Skills data with icons
const skills = [
  { name: "HTML", category: "FRONTEND", icon: FileCode, color: "#E34C26" },
  { name: "CSS", category: "FRONTEND", icon: Palette, color: "#1572B6" },
  { name: "JAVASCRIPT", category: "FRONTEND", icon: Terminal, color: "#F7DF1E" },
  { name: "REACT", category: "FRONTEND", icon: Code2, color: "#61DAFB" },
  { name: "TAILWIND", category: "FRONTEND", icon: Brush, color: "#38BDF8" },
  { name: "BOOTSTRAP", category: "FRONTEND", icon: Layout, color: "#7952B3" },
  { name: "FLUTTER", category: "MOBILE", icon: Box, color: "#02569B" },
];

// Tools data with icons
const tools = [
  { name: "PHP", category: "BACKEND", icon: FileCode, color: "#777BB4" },
  { name: "LARAVEL", category: "BACKEND", icon: Server, color: "#FF2D20" },
  { name: "REST API", category: "BACKEND", icon: Globe, color: "#00A8E8" },
  { name: "MYSQL", category: "DATABASE", icon: Database, color: "#00758F" },
  { name: "C++", category: "PROGRAMMING", icon: Code2, color: "#00599C" },
  { name: "POSTMAN", category: "TESTING", icon: Globe, color: "#FF6C37" },
  { name: "JUNIT", category: "TESTING", icon: Code2, color: "#25A162" },
  { name: "KATALON", category: "TESTING", icon: Boxes, color: "#00BFA5" },
  { name: "BROWSERSTACK", category: "TESTING", icon: Globe, color: "#FF6C37" },
  { name: "GIT", category: "TOOLS", icon: GitBranch, color: "#F05032" },
  { name: "GITHUB", category: "TOOLS", icon: GitBranch, color: "#F3F4F6" },
  { name: "VS CODE", category: "TOOLS", icon: Code2, color: "#007ACC" },
  { name: "ANDROID STUDIO", category: "TOOLS", icon: Code2, color: "#3DDC84" },
  { name: "UNITY", category: "GAME DEV", icon: Cpu, color: "#FFFFFF" },
];

export function SkillsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const marqueeWrap1Ref = useRef(null);
  const marqueeWrap2Ref = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);

  useEffect(() => {
    const tier = getPerformanceTier();
    if (tier !== "high") {
      return undefined;
    }

    const ctx = gsap.context(() => {
      // Header animation only - marquees are now handled by CSS
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const wrappers = [marqueeWrap1Ref.current, marqueeWrap2Ref.current].filter(Boolean);
    const cleanupFns = [];

    wrappers.forEach((wrapper) => {
      let isPointerDown = false;
      let startX = 0;
      let startScrollLeft = 0;
      let resumeTimerId = 0;

      const getLoopSegment = () => wrapper.scrollWidth / 2;
      const normalizeLoopPosition = () => {
        const segment = getLoopSegment();
        if (!segment) return;

        if (wrapper.scrollLeft <= 0) {
          wrapper.scrollLeft += segment;
        } else if (wrapper.scrollLeft >= segment) {
          wrapper.scrollLeft -= segment;
        }
      };

      // Start from the middle copy so users can drag both directions seamlessly.
      wrapper.scrollLeft = getLoopSegment() / 2;

      const pauseTrack = () => wrapper.classList.add("is-interacting");
      const resumeTrack = () => wrapper.classList.remove("is-interacting");

      const onPointerDown = (event) => {
        isPointerDown = true;
        startX = event.clientX;
        startScrollLeft = wrapper.scrollLeft;
        pauseTrack();
      };

      const onPointerMove = (event) => {
        if (!isPointerDown) return;
        const delta = event.clientX - startX;
        wrapper.scrollLeft = startScrollLeft - delta;
        normalizeLoopPosition();
      };

      const onPointerEnd = () => {
        if (!isPointerDown) return;
        isPointerDown = false;
        setTimeout(resumeTrack, 150);
      };

      const onWheel = (event) => {
        // Preserve normal page scrolling; only map wheel to horizontal when user intentionally holds Shift.
        if (!event.shiftKey) return;
        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
        event.preventDefault();
        pauseTrack();
        wrapper.scrollLeft += event.deltaY;
        normalizeLoopPosition();
        clearTimeout(resumeTimerId);
        resumeTimerId = setTimeout(resumeTrack, 180);
      };

      const onScroll = () => {
        normalizeLoopPosition();
      };

      const onResize = () => {
        normalizeLoopPosition();
      };

      wrapper.addEventListener("pointerdown", onPointerDown);
      wrapper.addEventListener("pointermove", onPointerMove);
      wrapper.addEventListener("pointerup", onPointerEnd);
      wrapper.addEventListener("pointercancel", onPointerEnd);
      wrapper.addEventListener("pointerleave", onPointerEnd);
      wrapper.addEventListener("wheel", onWheel, { passive: false });
      wrapper.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);

      cleanupFns.push(() => {
        wrapper.removeEventListener("pointerdown", onPointerDown);
        wrapper.removeEventListener("pointermove", onPointerMove);
        wrapper.removeEventListener("pointerup", onPointerEnd);
        wrapper.removeEventListener("pointercancel", onPointerEnd);
        wrapper.removeEventListener("pointerleave", onPointerEnd);
        wrapper.removeEventListener("wheel", onWheel);
        wrapper.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        clearTimeout(resumeTimerId);
      });
    });

    return () => cleanupFns.forEach((cleanup) => cleanup());
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen bg-zinc-950 flex items-center justify-center pt-28 md:pt-32 pb-20 px-6 md:px-12 lg:px-16 xl:px-20 overflow-hidden"
    >
      {/* Radial gradient overlay for subtle glow */}
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-12" ref={headerRef}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
            <span className="text-orange-500 text-sm tracking-wider uppercase">
              My Skills
            </span>
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Technologies &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Tools I Work With
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            I use modern technologies and development tools to build scalable and user-focused applications. From frontend design to backend functionality and testing, I aim to create efficient and reliable solutions.
          </p>
        </div>

        {/* Marquees Section */}
        <div className="space-y-8">
          {/* Marquee 1 - Skills (Left to Right) */}
          <div ref={marqueeWrap1Ref} className="marquee-wrap relative overflow-x-auto overflow-y-hidden py-4 cursor-grab active:cursor-grabbing">
            <div ref={marquee1Ref} className="marquee-track flex gap-8 marquee-ltr">
              {[...skills, ...skills].map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={`skill-${index}`}
                    className="flex-shrink-0 flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 hover:bg-white/10 hover:border-orange-500/30 transition-[background-color,border-color] duration-300 group"
                  >
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${skill.color}33 0%, rgba(255, 255, 255, 0.04) 100%)`,
                        borderColor: `${skill.color}66`,
                        boxShadow: `0 10px 24px -16px ${skill.color}`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
                        style={{ color: skill.color }}
                        strokeWidth={2.2}
                      />
                    </div>
                    {/* Text */}
                    <div>
                      <div className="text-white font-bold text-sm tracking-wide whitespace-nowrap">
                        {skill.name}
                      </div>
                      <div className="text-white/40 text-xs tracking-wider uppercase">
                        {skill.category}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Marquee 2 - Tools (Right to Left) */}
          <div ref={marqueeWrap2Ref} className="marquee-wrap relative overflow-x-auto overflow-y-hidden py-4 cursor-grab active:cursor-grabbing">
            <div ref={marquee2Ref} className="marquee-track flex gap-8 marquee-rtl">
              {[...tools, ...tools].map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={`tool-${index}`}
                    className="flex-shrink-0 flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 hover:bg-white/10 hover:border-orange-500/30 transition-[background-color,border-color] duration-300 group"
                  >
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${tool.color}33 0%, rgba(255, 255, 255, 0.04) 100%)`,
                        borderColor: `${tool.color}66`,
                        boxShadow: `0 10px 24px -16px ${tool.color}`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
                        style={{ color: tool.color }}
                        strokeWidth={2.2}
                      />
                    </div>
                    {/* Text */}
                    <div>
                      <div className="text-white font-bold text-sm tracking-wide whitespace-nowrap">
                        {tool.name}
                      </div>
                      <div className="text-white/40 text-xs tracking-wider uppercase">
                        {tool.category}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
