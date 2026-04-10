import smoothVideoSrc from "../assets/video.smooth.mp4";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const TYPEWRITER_TEXTS = [
  "Full-Stack Developer",
  "Frontend Specialist",
  "Flutter Developer"
];

const HERO_LEFT_FADE_GRADIENT = `linear-gradient(
  to right,
  rgba(0, 0, 0, 1) 0%,
  rgba(0, 0, 0, 1) 15%,
  rgba(0, 0, 0, 0.96) 18.75%,
  rgba(0, 0, 0, 0.94) 22.5%,
  rgba(0, 0, 0, 0.91) 26.25%,
  rgba(0, 0, 0, 0.87) 30%,
  rgba(0, 0, 0, 0.82) 33.75%,
  rgba(0, 0, 0, 0.76) 37.5%,
  rgba(0, 0, 0, 0.69) 41.25%,
  rgba(0, 0, 0, 0.61) 45%,
  rgba(0, 0, 0, 0.53) 48.75%,
  rgba(0, 0, 0, 0.44) 52.5%,
  rgba(0, 0, 0, 0.36) 56.25%,
  rgba(0, 0, 0, 0.28) 60%,
  rgba(0, 0, 0, 0.21) 63.75%,
  rgba(0, 0, 0, 0.15) 67.5%,
  rgba(0, 0, 0, 0.10) 71.25%,
  rgba(0, 0, 0, 0.07) 75%,
  rgba(0, 0, 0, 0.04) 78.75%,
  rgba(0, 0, 0, 0.02) 82.5%,
  rgba(0, 0, 0, 0.01) 86.25%,
  rgba(0, 0, 0, 0.005) 90%,
  rgba(0, 0, 0, 0.002) 93.75%,
  rgba(0, 0, 0, 0.001) 97.5%,
  transparent 100%
)`;

export function HeroSection() {
  const videoRef = useRef(null);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobileLike =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTextIndex, setActiveTextIndex] = useState(0);

  const activeVideoSrc = smoothVideoSrc;

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedText(TYPEWRITER_TEXTS[0]);
      setIsDeleting(false);
      setActiveTextIndex(0);
      return;
    }

    let timeoutId;
    const currentText = TYPEWRITER_TEXTS[activeTextIndex];
    const typingDelay = isMobileLike ? 110 : 100;
    const erasingDelay = isMobileLike ? 85 : 75;
    const pauseBeforeErase = isMobileLike ? 1700 : 1500;
    const pauseBetweenWords = isMobileLike ? 450 : 350;

    if (!isDeleting && typedText === currentText) {
      timeoutId = setTimeout(() => setIsDeleting(true), pauseBeforeErase);
    } else if (isDeleting && typedText === "") {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setActiveTextIndex((prevIndex) => (prevIndex + 1) % TYPEWRITER_TEXTS.length);
      }, pauseBetweenWords);
    } else {
      timeoutId = setTimeout(() => {
        setTypedText((prev) => {
          const nextLength = isDeleting ? prev.length - 1 : prev.length + 1;
          return currentText.slice(0, nextLength);
        });
      }, isDeleting ? erasingDelay : typingDelay);
    }

    return () => clearTimeout(timeoutId);
  }, [typedText, isDeleting, prefersReducedMotion, activeTextIndex, isMobileLike]);

  useEffect(() => {
    const videoElement = videoRef.current;

    const resumeVideo = () => {
      if (!videoElement || !videoElement.paused) return;
      videoElement.play().catch(() => {
        // Some browsers may block immediate autoplay retries.
      });
    };

    const onVisibilityChange = () => {
      if (!document.hidden) resumeVideo();
    };

    if (videoElement) {
      videoElement.preload = isMobileLike ? "metadata" : "auto";
      videoElement.muted = true;
      videoElement.playsInline = true;
      videoElement.addEventListener("loadeddata", resumeVideo);
      videoElement.addEventListener("canplay", resumeVideo);
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pageshow", resumeVideo);

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadeddata", resumeVideo);
        videoElement.removeEventListener("canplay", resumeVideo);
      }
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pageshow", resumeVideo);
    };
  }, [isMobileLike]);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video - Positioned to show character on right */}
      <div className="absolute inset-0 w-full h-full" style={{ perspective: '1000px' }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload={isMobileLike ? "metadata" : "auto"}
          disablePictureInPicture
          aria-hidden="true"
          role="presentation"
          tabIndex={-1}
          className="hero-video absolute w-full h-full object-cover"
          style={{ 
            transform: 'scale(1.03) translateX(12%) translateY(3%) translateZ(30px)',
            objectPosition: '50% 0%',
            transformOrigin: 'center center',
            transformStyle: 'preserve-3d',
          }}
        >
          <source src={activeVideoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Ultra-smooth 24-step gradient overlay - LEFT to RIGHT fade */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: HERO_LEFT_FADE_GRADIENT,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center pt-24 md:pt-28 pb-14 md:pb-16 box-border">
        <div className="w-full pl-6 sm:pl-8 md:pl-14 lg:pl-20 xl:pl-24 pr-6 max-w-7xl">
          <div className="max-w-2xl">
            {/* Main Heading - Inspired by design */}
            <div className="mb-5 md:mb-7 space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-orange-500/70" aria-hidden="true" />
                <p className="text-white/85 text-[clamp(0.92rem,1.6vw,1.1rem)] leading-tight font-medium uppercase tracking-[0.12em]">
                  Hey, I am
                </p>
              </div>
              <h1 className="text-white text-[clamp(2.2rem,6vw,4.2rem)] leading-[0.95] font-bold tracking-[-0.015em]">
                <span className="text-orange-500">Bakhtawar</span>
              </h1>
              <h2 className="typewriter-line text-white/95 text-[clamp(1.15rem,3vw,2.2rem)] font-semibold whitespace-nowrap leading-tight min-h-[1.15em]">
                <span>
                  {typedText}
                  {!prefersReducedMotion && <span className="typewriter-caret" aria-hidden="true">|</span>}
                </span>
              </h2>
            </div>

            {/* Subheading */}
            <p className="text-white/65 text-[14px] md:text-[15px] mb-4 md:mb-7 lg:mb-8 lg:mt-1 leading-6 md:leading-7 max-w-[34rem] lg:max-w-[36rem] text-left">
              <span className="block whitespace-nowrap">Full-Stack Developer | Building Web & Mobile Experiences</span>
              <span className="block">I build responsive web and mobile applications with</span>
              <span className="block">clean UI and real-world functionality.</span>
            </p>

            {/* CTA Buttons - Inspired by design */}
            <div className="flex items-center gap-3">
              <button className="btn-orange-shine px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold text-sm transition-[transform,background-color,box-shadow] duration-300 shadow-md shadow-orange-500/15 hover:shadow-orange-500/25 hover:scale-105">
                Hire me
              </button>
              <a
                href="mailto:biakhan2005@gmail.com"
                aria-label="Send email to Bakhtawar Khan"
                className="w-12 h-12 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-[transform,background-color,border-color] duration-300"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Lightweight 2D Social Icons - Right Center */}
        <div className="hidden lg:flex absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 flex-col gap-4 z-20">
          <a
            href="https://www.linkedin.com/in/bakhtawar-khan-b59615213/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="w-5 h-5" />
          </a>

          <a
            href="https://github.com/Bakhtawar1910"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors duration-300"
            aria-label="GitHub"
          >
            <FaGithub className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="flex flex-col items-center gap-2 animate-scroll-hint">
          <span className="text-white/60 text-sm">Scroll to explore</span>
          <svg
            className="w-6 h-6 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
