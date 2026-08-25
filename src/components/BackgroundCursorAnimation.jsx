import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function BackgroundCursorAnimation() {
  const { isDark } = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Simple smooth mouse coordinates
    const mouse = {
      x: width * 0.5,
      y: height * 0.35,
      targetX: width * 0.5,
      targetY: height * 0.35,
      radius: 170,
    };

    // Clean, balanced particle count
    const particleCount = Math.min(Math.floor((width * height) / 10000), 110);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: isDark ? Math.random() * 1.2 + 1.2 : Math.random() * 1.4 + 1.5,
      });
    }

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 1. Soft Cursor Glow Aura (No attached cursor dot)
      const glowRadius = isDark ? 260 : 230;
      const radialGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        glowRadius,
      );

      if (isDark) {
        // Radiant celestial champagne gold aura
        radialGrad.addColorStop(0, "rgba(245, 202, 100, 0.15)");
        radialGrad.addColorStop(0.4, "rgba(218, 172, 70, 0.06)");
        radialGrad.addColorStop(1, "rgba(218, 172, 70, 0)");
      } else {
        // Rich warm amber-gold aura complementary to the warm linen canvas
        radialGrad.addColorStop(0, "rgba(206, 148, 48, 0.17)");
        radialGrad.addColorStop(0.42, "rgba(218, 166, 72, 0.07)");
        radialGrad.addColorStop(1, "rgba(237, 229, 216, 0)");
      }

      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Theme Colors:
      // Dark Theme -> Luminous warm champagne starlight gold (#f6d482 / #ecc066)
      // Light Theme -> Rich, crisp warm amber-bronze (#b87e28 / #c98e32)
      const dotColor = isDark
        ? "rgba(246, 212, 130, 0.85)"
        : "rgba(184, 126, 40, 0.82)";

      const lineR = isDark ? 240 : 196;
      const lineG = isDark ? 200 : 142;
      const lineB = isDark ? 116 : 52;

      // 2. Update & Draw Particles and Connecting Lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Cursor deflection
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 0.55;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        // Draw Dot
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pdx = p.x - p2.x;
          const pdy = p.y - p2.y;
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pDist < 115) {
            const alpha = (1 - pDist / 115) * (isDark ? 0.22 : 0.28);
            ctx.strokeStyle = `rgba(${lineR}, ${lineG}, ${lineB}, ${alpha})`;
            ctx.lineWidth = isDark ? 0.8 : 0.95;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect particle to cursor
        if (dist < 145) {
          const alpha = (1 - dist / 145) * (isDark ? 0.38 : 0.44);
          ctx.strokeStyle = `rgba(${lineR}, ${lineG}, ${lineB}, ${alpha})`;
          ctx.lineWidth = isDark ? 1.05 : 1.2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Background Gradient Base */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 80% 60% at 50% -10%, #17130e 0%, #0c0a08 60%, #080706 100%)"
            : "radial-gradient(ellipse 85% 65% at 50% -10%, #fbf8f3 0%, #f4eee3 50%, #ede5d8 100%)",
        }}
      />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Micro-grid overlay */}
      <div className="absolute inset-0 custom-grid-pattern opacity-20 pointer-events-none z-20" />
    </div>
  );
}
