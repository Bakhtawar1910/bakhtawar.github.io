import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { getPerformanceTier } from "./utils/performanceTier";

const AboutSection = lazy(() => import("./components/AboutSection").then((module) => ({ default: module.AboutSection })));
const SkillsSection = lazy(() => import("./components/SkillsSection").then((module) => ({ default: module.SkillsSection })));
const JourneySection = lazy(() => import("./components/JourneySection").then((module) => ({ default: module.JourneySection })));
const ProjectsSection = lazy(() => import("./components/ProjectsSection").then((module) => ({ default: module.ProjectsSection })));
const ConnectSection = lazy(() => import("./components/ConnectSection").then((module) => ({ default: module.ConnectSection })));
const FooterSection = lazy(() => import("./components/FooterSection").then((module) => ({ default: module.FooterSection })));

export default function App() {
  const rafIdRef = useRef(0);
  const [showBelowFold, setShowBelowFold] = useState(false);

  // Initialize smooth scroll
  useEffect(() => {
    const tier = getPerformanceTier();
    document.documentElement.dataset.perfTier = tier;

    if (tier !== "high") {
      return undefined;
    }

    let lenis;
    let cancelled = false;

    const initLenis = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: true,
        syncTouch: true,
        touchMultiplier: 1.4,
        infinite: false,
      });

      function raf(time) {
        lenis.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }

      rafIdRef.current = requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafIdRef.current);
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      setShowBelowFold(true);
      return undefined;
    }

    const isMobileLike = window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches;

    if (!isMobileLike) {
      setShowBelowFold(true);
      return undefined;
    }

    const timerId = window.setTimeout(() => setShowBelowFold(true), 900);
    return () => window.clearTimeout(timerId);
  }, []);

  return (
    <div className="size-full">
      <Navbar />
      <HeroSection />
      {showBelowFold ? (
        <Suspense fallback={null}>
          <AboutSection />
          <SkillsSection />
          <JourneySection />
          <ProjectsSection />
          <ConnectSection />
          <FooterSection />
        </Suspense>
      ) : null}
    </div>
  );
}
