let cachedTier = null;

export function getPerformanceTier() {
  if (cachedTier) return cachedTier;
  if (typeof window === "undefined") {
    cachedTier = "high";
    return cachedTier;
  }

  const memory = navigator.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobileLike = window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches;

  // Keep desktop/laptop animation experience intact unless user explicitly prefers less motion.
  if (!prefersReducedMotion && !isMobileLike) {
    cachedTier = "high";
    return cachedTier;
  }

  if (prefersReducedMotion || memory <= 4 || cores <= 4) {
    cachedTier = "low";
    return cachedTier;
  }

  if (memory <= 6 || cores <= 6) {
    cachedTier = "medium";
    return cachedTier;
  }

  cachedTier = "high";
  return cachedTier;
}

export function isHighTierDevice() {
  return getPerformanceTier() === "high";
}
