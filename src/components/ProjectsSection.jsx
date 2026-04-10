import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Book, ExternalLink, Palette, Smartphone, Users } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { getPerformanceTier } from "../utils/performanceTier";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: "Nexus HR - Employee Management System",
    description:
      "A full-featured HR management system with admin and employee portals. It includes attendance tracking, leave management, notifications, and role-based access, built to simulate real-world enterprise workflows.",
    icon: Users,
    tags: ["PHP", "MySQL", "TailwindCSS", "JavaScript"],
    color: "from-orange-500 to-orange-600",
    link: "https://github.com/Bakhtawar1910/Nexus-HR-employee-management",
    github: "https://github.com/Bakhtawar1910/Nexus-HR-employee-management",
  },
  {
    id: 2,
    title: "Flutter To-Do App",
    description:
      "A clean and user-friendly task management mobile application built with Flutter. It allows users to create, update, delete, and manage daily tasks with due dates and status tracking. The app uses local storage to ensure fast performance and offline accessibility.",
    icon: Smartphone,
    tags: ["Flutter", "Dart", "SharedPreferences", "UI/UX"],
    color: "from-blue-500 to-blue-600",
    link: "https://github.com/Bakhtawar1910/Flutter_to_do_app",
    github: "https://github.com/Bakhtawar1910/Flutter_to_do_app",
  },
  {
    id: 3,
    title: "Library Management System",
    description:
      "A modern and responsive library management system with secure CRUD operations, live search, and light/dark mode support. Built with PHP and MySQL, it focuses on clean UI, user experience, and real-world functionality.",
    icon: Book,
    tags: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    color: "from-yellow-500 to-yellow-600",
    link: "https://github.com/Bakhtawar1910/Library-management-system",
    github: "https://github.com/Bakhtawar1910/Library-management-system",
  },
];

export function ProjectsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const projectsRef = useRef(null);

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
        // Projects cards animation
        gsap.fromTo(
          projectsRef.current?.children || [],
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 80%",
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
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen bg-zinc-950 pt-28 md:pt-32 pb-20 px-6 md:px-12 lg:px-16 xl:px-20"
    >
      {/* Subtle spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-12" ref={headerRef}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
            <span className="text-orange-500 text-sm tracking-wider uppercase">
              Featured Work
            </span>
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Recent Projects &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Creative Solutions
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            A showcase of my recent work, featuring web applications, mobile apps,
            and full-stack solutions built with modern technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-[background-color,border-color] duration-300 hover:border-orange-500/30"
              >
                {/* Icon with Gradient Background */}
                <div className="mb-6">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${project.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-white text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.link}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-500 text-sm font-medium transition-[transform,background-color,color] duration-300 hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Project</span>
                  </a>
                  <a
                    href={project.github}
                    aria-label={`View ${project.title} source code on GitHub`}
                    className="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/60 hover:text-white transition-[transform,background-color,color] duration-300 hover:scale-105"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
