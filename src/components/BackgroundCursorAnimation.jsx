import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function BackgroundCursorAnimation() {
  const { isDark } = useTheme();

  const glowPrimaryRef = useRef(null);
  const glowSecondaryRef = useRef(null);
  const glowCoreRef = useRef(null);

  const mouse = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 500,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 500,
    targetX: typeof window !== "undefined" ? window.innerWidth / 2 : 500,
    targetY: typeof window !== "undefined" ? window.innerHeight / 2 : 500,
    // Interpolated normalized position for silky smooth color transitions (0 to 1)
    normX: 0.5,
    normY: 0.5,
  });

  useEffect(() => {
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    mouse.current.x = width / 2;
    mouse.current.y = height / 2;
    mouse.current.targetX = width / 2;
    mouse.current.targetY = height / 2;

    const handleMouseMove = (e) => {
      mouse.current.targetX = e.clientX;
      mouse.current.targetY = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.current.targetX = e.touches[0].clientX;
        mouse.current.targetY = e.touches[0].clientY;
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // Color interpolator helper: blends RGB channels smoothly
    const interpolateColor = (c1, c2, factor) => {
      const f = Math.max(0, Math.min(1, factor));
      const r = Math.round(c1.r + (c2.r - c1.r) * f);
      const g = Math.round(c1.g + (c2.g - c1.g) * f);
      const b = Math.round(c1.b + (c2.b - c1.b) * f);
      return { r, g, b };
    };

    // Refined warm champagne & honey gold palette for cursor glow
    const darkPalette = {
      topLeft: { r: 232, g: 198, b: 122 }, // Soft Warm Champagne Gold
      topRight: { r: 224, g: 168, b: 88 }, // Gentle Honey Amber
      bottomLeft: { r: 218, g: 172, b: 142 }, // Subtle Rose Gold
      bottomRight: { r: 220, g: 200, b: 145 }, // Soft Platinum Sand
    };

    const lightPalette = {
      topLeft: { r: 216, g: 176, b: 98 }, // Gentle Golden Honey
      topRight: { r: 210, g: 152, b: 78 }, // Soft Amber
      bottomLeft: { r: 208, g: 158, b: 128 }, // Warm Muted Sand
      bottomRight: { r: 200, g: 172, b: 110 }, // Soft Antique Linen
    };

    const animate = () => {
      const m = mouse.current;

      // Smooth cursor position interpolation (LERP)
      m.x += (m.targetX - m.x) * 0.09;
      m.y += (m.targetY - m.y) * 0.09;

      // Smooth normalized coordinate interpolation for color transitions
      const targetNormX = Math.max(0, Math.min(1, m.targetX / width));
      const targetNormY = Math.max(0, Math.min(1, m.targetY / height));
      m.normX += (targetNormX - m.normX) * 0.04;
      m.normY += (targetNormY - m.normY) * 0.04;

      const palette = isDark ? darkPalette : lightPalette;

      // 2D Bilinear color interpolation based on cursor X & Y coordinates
      const topColor = interpolateColor(
        palette.topLeft,
        palette.topRight,
        m.normX,
      );
      const bottomColor = interpolateColor(
        palette.bottomLeft,
        palette.bottomRight,
        m.normX,
      );
      const currentColor = interpolateColor(topColor, bottomColor, m.normY);

      // 1. Soft Core Center (140px)
      if (glowCoreRef.current) {
        glowCoreRef.current.style.transform = `translate3d(${m.x - 70}px, ${m.y - 70}px, 0)`;

        const coreAlpha = isDark ? 0.24 : 0.28;
        glowCoreRef.current.style.background = `radial-gradient(
          circle,
          rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${coreAlpha}) 0%,
          rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${coreAlpha * 0.5}) 45%,
          transparent 75%
        )`;
      }

      // 2. Primary Soft Radial Spotlight (360px)
      if (glowPrimaryRef.current) {
        glowPrimaryRef.current.style.transform = `translate3d(${m.x - 180}px, ${m.y - 180}px, 0)`;

        const alphaCenter = isDark ? 0.2 : 0.24;
        const alphaMid = isDark ? 0.1 : 0.12;
        const alphaOuter = isDark ? 0.02 : 0.03;

        glowPrimaryRef.current.style.background = `radial-gradient(
          circle,
          rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${alphaCenter}) 0%,
          rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${alphaMid}) 40%,
          rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${alphaOuter}) 70%,
          transparent 100%
        )`;
      }

      // 3. Ambient Dispersion (520px)
      if (glowSecondaryRef.current) {
        glowSecondaryRef.current.style.transform = `translate3d(${m.x - 260}px, ${m.y - 260}px, 0)`;

        const alphaOuterAtmosphere = isDark ? 0.08 : 0.1;
        glowSecondaryRef.current.style.background = `radial-gradient(
          circle,
          rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${alphaOuterAtmosphere}) 0%,
          rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${alphaOuterAtmosphere * 0.3}) 50%,
          transparent 75%
        )`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. RICH LUXURY TEXTURED BACKGROUND (WARM LINEN ALABASTER / OBSIDIAN ESPRESSO) */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 80% 60% at 50% -10%, #17130e 0%, #0c0a09 60%, #080706 100%)"
            : "radial-gradient(ellipse 85% 65% at 50% -10%, #f9f5ed 0%, #f3ece0 50%, #eae1d1 100%)",
        }}
      />

      {/* 2. AMBIENT FEATHERED HALO (520px) */}
      <div
        ref={glowSecondaryRef}
        className="absolute top-0 left-0 w-[520px] h-[520px] rounded-full blur-[90px] pointer-events-none will-change-transform z-10"
      />

      {/* 3. PRIMARY RADIAL GLOW (360px) */}
      <div
        ref={glowPrimaryRef}
        className="absolute top-0 left-0 w-[360px] h-[360px] rounded-full blur-[55px] pointer-events-none will-change-transform z-20"
      />

      {/* 4. SOFT CORE BLOOM (140px) */}
      <div
        ref={glowCoreRef}
        className="absolute top-0 left-0 w-[140px] h-[140px] rounded-full blur-[25px] pointer-events-none will-change-transform z-30"
      />

      {/* 5. SUBTLE ARCHITECTURAL LUXURY MICRO-GRID */}
      <div className="absolute inset-0 custom-grid-pattern opacity-30 pointer-events-none z-40" />
    </div>
  );
}
