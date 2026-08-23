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

      // 1. Soft Cursor Glow
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
        radialGrad.addColorStop(0, "rgba(212, 168, 67, 0.12)");
        radialGrad.addColorStop(1, "rgba(212, 168, 67, 0)");
      } else {
        // Warm sand/camel spotlight aura complementing the ivory-linen background
        radialGrad.addColorStop(0, "rgba(182, 142, 92, 0.16)");
        radialGrad.addColorStop(0.5, "rgba(198, 162, 118, 0.06)");
        radialGrad.addColorStop(1, "rgba(237, 229, 216, 0)");
      }

      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Theme Colors:
      // Dark Theme -> Radiant warm gold dots & lines (#ebc373 / #d4a843)
      // Light Theme -> Rich warm camel/taupe sand tones (#9e7547 / #b38856) harmonious with the #fbf8f3 background
      const dotColor = isDark
        ? "rgba(235, 195, 115, 0.75)"
        : "rgba(158, 117, 71, 0.75)";

      const lineR = isDark ? 225 : 172;
      const lineG = isDark ? 185 : 132;
      const lineB = isDark ? 100 : 86;

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
            const alpha = (1 - pDist / 115) * (isDark ? 0.2 : 0.28);
            ctx.strokeStyle = `rgba(${lineR}, ${lineG}, ${lineB}, ${alpha})`;
            ctx.lineWidth = isDark ? 0.8 : 1.0;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect particle to cursor
        if (dist < 145) {
          const alpha = (1 - dist / 145) * (isDark ? 0.35 : 0.45);
          ctx.strokeStyle = `rgba(${lineR}, ${lineG}, ${lineB}, ${alpha})`;
          ctx.lineWidth = isDark ? 1.0 : 1.25;
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
