import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Briefcase, Code2, Users, Building2, Calendar, ChevronRight } from "lucide-react";
import { getPerformanceTier } from "../utils/performanceTier";

gsap.registerPlugin(ScrollTrigger);

const journeyData = [
  {
    id: 4,
    type: "experience",
    icon: Users,
    title: "Intern",
    organization: "CUSIT IT and Robotics Society",
    period: "March 2026 - Present",
    description: [
      "Working on real-world web and mobile application projects",
      "Building and improving frontend interfaces and application features",
      "Collaborating with team members on practical development tasks",
      "Gaining hands-on experience in real-world development workflows"
    ],
    color: "orange",
  },
  {
    id: 3,
    type: "experience",
    icon: Code2,
    title: "Web Development Intern",
    organization: "DevSpire Solutions",
    period: "November 2025 - January 2026",
    description: [
      "Built responsive web applications with HTML, CSS, JavaScript, PHP, MySQL",
      "Developed database-driven web solutions for real-world projects",
      "Collaborated on frontend and backend implementation",
      "Gained practical experience in full-stack web development"
    ],
    color: "orange",
  },
  {
    id: 2,
    type: "education",
    icon: GraduationCap,
    title: "Bachelor's Degree",
    organization: "City University of Science & IT (CUSIT)",
    period: "October 2023 - June 2027",
    description: [
      "Computer Software Engineering degree program",
      "Strong focus on software development and engineering principles",
      "Coursework in databases, networking, OOP, and C++",
      "Active participation in technical societies and development activities"
    ],
    color: "orange",
  },
  {
    id: 1,
    type: "education",
    icon: GraduationCap,
    title: "FSC Pre-Engineering",
    organization: "Islamia College Peshawar (Chartered University)",
    period: "November 2021 - July 2023",
    description: [
      "Strong foundation in mathematics, physics, and analytical thinking",
      "Developed problem-solving and logical reasoning skills",
      "Built academic discipline and consistency",
      "Prepared for higher studies in engineering and technology"
    ],
    color: "orange",
  },
];

export function JourneySection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

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
        // Timeline items animation (single trigger for better performance)
        gsap.fromTo(
          timelineRef.current?.querySelectorAll(".timeline-item") || [],
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );

        // Animate timeline line
        const timelineLine = timelineRef.current?.querySelector(".timeline-line");
        if (timelineLine) {
          gsap.fromTo(
            timelineLine,
            {
              scaleY: 0,
            },
            {
              scaleY: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative bg-black pt-28 md:pt-32 pb-20 px-6 md:px-12 lg:px-16 xl:px-20"
    >
      {/* Subtle background pattern for differentiation */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/30 to-black pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-12" ref={headerRef}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
            <span className="text-orange-500 text-sm tracking-wider uppercase">
              My Journey
            </span>
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Professional Path &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Educational Background
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            A timeline of experiences, learning, and growth in software development
            and technology innovation.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="timeline-line absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500/50 via-orange-500/30 to-orange-500/10 transform origin-top" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {journeyData.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className="timeline-item relative"
                >
                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-start gap-8">
                    {/* Left Side Content or Empty Space */}
                    <div className={`flex-1 ${isLeft ? '' : 'flex justify-end items-start'}`}>
                      {/* Date Badge - On Left Side for Right Cards */}
                      {!isLeft && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-500 text-sm font-medium mt-2">
                          <Calendar className="w-4 h-4" />
                          <span>{item.period}</span>
                        </div>
                      )}
                      {isLeft && (
                        <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-[background-color,border-color,box-shadow] duration-300 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/10 max-w-lg">
                          {/* Title */}
                          <h3 className="text-white text-xl font-bold mb-3">
                            {item.title}
                          </h3>

                          {/* Organization with Icon */}
                          <div className="flex items-center gap-2 text-orange-500 text-sm font-medium mb-4">
                            <Building2 className="w-4 h-4" />
                            <span>{item.organization}</span>
                          </div>

                          {/* Description List */}
                          <div className="space-y-2">
                            {item.description.map((desc, i) => (
                              <div key={i} className="flex items-start gap-2 text-white/60 text-sm group/item hover:text-white transition-colors duration-300">
                                <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-500" />
                                <span>{desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Center Timeline Dot */}
                    <div className="relative flex flex-col items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 hover:scale-110 transition-transform duration-300 z-10">
                        <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Right Side Content or Empty Space */}
                    <div className={`flex-1 ${!isLeft ? '' : 'flex justify-start'}`}>
                      {!isLeft && (
                        <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-[background-color,border-color,box-shadow] duration-300 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/10 max-w-lg">
                          {/* Title */}
                          <h3 className="text-white text-xl font-bold mb-3">
                            {item.title}
                          </h3>

                          {/* Organization with Icon */}
                          <div className="flex items-center gap-2 text-orange-500 text-sm font-medium mb-4">
                            <Building2 className="w-4 h-4" />
                            <span>{item.organization}</span>
                          </div>

                          {/* Description List */}
                          <div className="space-y-2">
                            {item.description.map((desc, i) => (
                              <div key={i} className="flex items-start gap-2 text-white/60 text-sm group/item hover:text-white transition-colors duration-300">
                                <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-500" />
                                <span>{desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Date Badge - Always on Right Side for Left Cards */}
                      {isLeft && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-500 text-sm font-medium">
                          <Calendar className="w-4 h-4" />
                          <span>{item.period}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden pl-16">
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                        <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Card */}
                    <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-[background-color,border-color,box-shadow] duration-300 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/10">
                      {/* Title */}
                      <h3 className="text-white text-xl font-bold mb-3">
                        {item.title}
                      </h3>

                      {/* Organization with Icon */}
                      <div className="flex items-center gap-2 text-orange-500 text-sm font-medium mb-3">
                        <Building2 className="w-4 h-4" />
                        <span>{item.organization}</span>
                      </div>

                      {/* Date Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-500 text-xs font-medium mb-4">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.period}</span>
                      </div>

                      {/* Description List */}
                      <div className="space-y-2">
                        {item.description.map((desc, i) => (
                          <div key={i} className="flex items-start gap-2 text-white/60 text-sm group/item hover:text-white transition-colors duration-300">
                            <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-500" />
                            <span>{desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
