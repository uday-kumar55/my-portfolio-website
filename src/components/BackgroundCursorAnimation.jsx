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

    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let reduceMotion = reduceMotionQuery.matches;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let lastInputTime = performance.now();
    const IDLE_DELAY = 2600; // ms before ambient autonomous drift starts

    // Color definitions
    // Dark: Luminous champagne & starlight gold (#f6d482 / #d4a843)
    // Light: Rich warm amber & desert bronze (#b87e28 / #c98e32)
    const themeColors = isDark
      ? {
          lineR: 238,
          lineG: 198,
          lineB: 118,
          dotR: 246,
          dotG: 212,
          dotB: 130,
          glowA: "rgba(245, 214, 150, 0.16)",
          glowB: "rgba(212, 168, 67, 0.08)",
          glowC: "rgba(212, 168, 67, 0)",
        }
      : {
          lineR: 184,
          lineG: 136,
          lineB: 48,
          dotR: 184,
          dotG: 126,
          dotB: 40,
          glowA: "rgba(206, 148, 48, 0.17)",
          glowB: "rgba(218, 166, 72, 0.07)",
          glowC: "rgba(237, 229, 216, 0)",
        };

    const dotColor = (alpha) =>
      `rgba(${themeColors.dotR}, ${themeColors.dotG}, ${themeColors.dotB}, ${alpha})`;

    const particles = [];
    const ripples = [];

    const mouse = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.35,
      targetX: window.innerWidth * 0.5,
      targetY: window.innerHeight * 0.35,
      prevX: window.innerWidth * 0.5,
      prevY: window.innerHeight * 0.35,
      speed: 0,
      smoothedSpeed: 0,
      radius: 175,
    };

    const initParticles = (newWidth, newHeight) => {
      const targetCount = Math.min(
        Math.floor((newWidth * newHeight) / 11500),
        95,
      );

      // Adjust particle count smoothly on resize
      while (particles.length < targetCount) {
        const z = Math.random();
        particles.push({
          x: Math.random() * newWidth,
          y: Math.random() * newHeight,
          z,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: (Math.random() - 0.5) * 0.012,
          speed: 0.12 + z * 0.32,
          radius: (isDark ? 0.95 : 1.15) + z * (isDark ? 1.35 : 1.65),
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.008 + Math.random() * 0.014,
          bokeh: z > 0.85,
          links: 0,
        });
      }

      if (particles.length > targetCount) {
        particles.length = targetCount;
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(width, height);
    };
    resize();

    const onPointerMove = (clientX, clientY) => {
      mouse.targetX = clientX;
      mouse.targetY = clientY;
      lastInputTime = performance.now();
    };

    const handleMouseMove = (e) => onPointerMove(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const spawnRipple = (clientX, clientY) => {
      if (ripples.length < 8) {
        ripples.push({ x: clientX, y: clientY, radius: 0, alpha: 0.5 });
      }
      lastInputTime = performance.now();
    };

    const handleMouseDown = (e) => spawnRipple(e.clientX, e.clientY);
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        spawnRipple(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseLeave = () => {
      // Trigger idle mode earlier when mouse leaves viewport
      lastInputTime = performance.now() - IDLE_DELAY - 100;
    };

    const handleMotionChange = (e) => {
      reduceMotion = e.matches;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    reduceMotionQuery.addEventListener?.("change", handleMotionChange);

    // Deterministic organic curve seed per particle pair
    const curveSeed = (i, j) => Math.sin(i * 12.9898 + j * 78.233) * 10;
    const MAX_LINKS_PER_PARTICLE = 3;
    const MAX_CURSOR_LINKS = 9;
    const LINK_DIST_SQ = 115 * 115;
    const CURSOR_DIST_SQ = 145 * 145;
    const MOUSE_RADIUS_SQ = mouse.radius * mouse.radius;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      // Ambient autonomous drift when user is idle
      const isIdle =
        !reduceMotion && performance.now() - lastInputTime > IDLE_DELAY;
      if (isIdle) {
        const t = time * 0.006;
        mouse.targetX = width * 0.5 + Math.sin(t) * width * 0.22;
        mouse.targetY = height * 0.45 + Math.sin(t * 2) * height * 0.16;
      }

      // Responsive easing - quick, fluid, and organic without dragging lag
      const ease = reduceMotion ? 0.22 : 0.14;
      mouse.x += (mouse.targetX - mouse.x) * ease;
      mouse.y += (mouse.targetY - mouse.y) * ease;

      // Track cursor velocity for dynamic light bloom
      const moveDx = mouse.x - mouse.prevX;
      const moveDy = mouse.y - mouse.prevY;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      const instantSpeed = Math.sqrt(moveDx * moveDx + moveDy * moveDy);
      mouse.smoothedSpeed += (instantSpeed - mouse.smoothedSpeed) * 0.12;
      const speedBoost = Math.min(mouse.smoothedSpeed / 6, 1.0); // 0 (still) to 1.0 (moving)

      // 1. Dynamic Cursor Ambient Light Glow (Fluid motion bloom & breathing atmosphere)
      const baseRadius = isDark ? 280 : 250;
      const breath = reduceMotion ? 0 : Math.sin(time * 0.03) * 12;
      const glowRadius = baseRadius + speedBoost * 70 + breath;

      // Atmospheric outer glow halo
      const radialGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        glowRadius,
      );

      if (isDark) {
        // Celestial champagne gold layered bloom
        const alphaCenter = 0.16 + speedBoost * 0.12;
        const alphaMid = 0.07 + speedBoost * 0.06;
        radialGrad.addColorStop(0, `rgba(250, 218, 142, ${alphaCenter})`);
        radialGrad.addColorStop(0.3, `rgba(224, 180, 85, ${alphaMid})`);
        radialGrad.addColorStop(0.65, `rgba(185, 142, 55, 0.02)`);
        radialGrad.addColorStop(1, "rgba(12, 10, 8, 0)");
      } else {
        // Warm radiant amber-gold layered bloom
        const alphaCenter = 0.17 + speedBoost * 0.14;
        const alphaMid = 0.08 + speedBoost * 0.07;
        radialGrad.addColorStop(0, `rgba(215, 160, 52, ${alphaCenter})`);
        radialGrad.addColorStop(0.32, `rgba(198, 142, 45, ${alphaMid})`);
        radialGrad.addColorStop(0.68, `rgba(180, 130, 40, 0.025)`);
        radialGrad.addColorStop(1, "rgba(244, 238, 227, 0)");
      }

      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Interactive Ripple Waves on click/tap
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rp = ripples[r];
        rp.radius += 3.2;
        rp.alpha *= 0.965;
        if (rp.alpha < 0.02) {
          ripples.splice(r, 1);
          continue;
        }
        ctx.strokeStyle = dotColor(rp.alpha * 0.6);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 4. Update & Draw Particles and Organic Constellation Links
      for (let i = 0; i < particles.length; i++) {
        particles[i].links = 0;
      }
      let cursorLinks = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reduceMotion) {
          p.angle += p.angleSpeed;
          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed;

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;

          // Repulsion from cursor
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_RADIUS_SQ && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / mouse.radius) * 0.52 * (0.4 + p.z * 0.6);
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }

        // Particle twinkle & depth brightness
        const twinkle = reduceMotion
          ? 1
          : 0.8 + 0.2 * Math.sin(time * p.phaseSpeed + p.phase);
        let alpha = (0.35 + p.z * 0.55) * twinkle;

        // Catch ambient cursor light illumination
        const cdx = mouse.x - p.x;
        const cdy = mouse.y - p.y;
        const cDistSq = cdx * cdx + cdy * cdy;
        if (cDistSq < glowRadius * glowRadius * 0.5) {
          const lightProximity = 1 - Math.sqrt(cDistSq) / (glowRadius * 0.7);
          if (lightProximity > 0) {
            alpha += lightProximity * (0.24 + speedBoost * 0.22);
          }
        }

        // Illumination when passing ripple wave
        for (let r = 0; r < ripples.length; r++) {
          const rp = ripples[r];
          const rdx = p.x - rp.x;
          const rdy = p.y - rp.y;
          const rDistSq = rdx * rdx + rdy * rdy;
          const rDist = Math.sqrt(rDistSq);
          const band = Math.abs(rDist - rp.radius);
          if (band < 20) {
            alpha += (1 - band / 20) * rp.alpha * 0.75;
          }
        }
        alpha = Math.min(alpha, 1);

        // Render Particle (Bokeh or Standard Disc)
        if (p.bokeh) {
          const bokehR = p.radius * 3.2;
          const bokehGrad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            bokehR,
          );
          bokehGrad.addColorStop(0, dotColor(alpha * 0.5));
          bokehGrad.addColorStop(1, dotColor(0));
          ctx.fillStyle = bokehGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, bokehR, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = dotColor(alpha);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Connect nearby particles with gentle bowed threads
        for (let j = i + 1; j < particles.length; j++) {
          if (p.links >= MAX_LINKS_PER_PARTICLE) break;
          const p2 = particles[j];
          if (p2.links >= MAX_LINKS_PER_PARTICLE) continue;

          const pdx = p.x - p2.x;
          const pdy = p.y - p2.y;
          const pDistSq = pdx * pdx + pdy * pdy;

          if (pDistSq < LINK_DIST_SQ) {
            const pDist = Math.sqrt(pDistSq);
            const depthAvg = (p.z + p2.z) * 0.5;
            const lAlpha =
              (1 - pDist / 115) *
              (isDark ? 0.2 : 0.26) *
              (0.5 + depthAvg * 0.5);

            const mx = (p.x + p2.x) * 0.5;
            const my = (p.y + p2.y) * 0.5;
            const nx = -(p2.y - p.y);
            const ny = p2.x - p.x;
            const nLen = Math.sqrt(nx * nx + ny * ny) || 1;
            const bow = curveSeed(i, j);
            const cx = mx + (nx / nLen) * bow;
            const cy = my + (ny / nLen) * bow;

            ctx.strokeStyle = `rgba(${themeColors.lineR}, ${themeColors.lineG}, ${themeColors.lineB}, ${lAlpha})`;
            ctx.lineWidth = isDark ? 0.75 : 0.9;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.quadraticCurveTo(cx, cy, p2.x, p2.y);
            ctx.stroke();

            p.links += 1;
            p2.links += 1;
          }
        }

        // Connect cursor to nearby particles
        if (cDistSq < CURSOR_DIST_SQ && cursorLinks < MAX_CURSOR_LINKS) {
          const cDist = Math.sqrt(cDistSq);
          const cAlpha =
            (1 - cDist / 145) *
            (isDark ? 0.36 : 0.44) *
            (0.5 + p.z * 0.5) *
            (1 + speedBoost * 0.35);

          ctx.strokeStyle = `rgba(${themeColors.lineR}, ${themeColors.lineG}, ${themeColors.lineB}, ${cAlpha})`;
          ctx.lineWidth = (isDark ? 0.95 : 1.15) + speedBoost * 0.4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          cursorLinks += 1;
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
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mouseleave", handleMouseLeave);
      reduceMotionQuery.removeEventListener?.("change", handleMotionChange);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Background Gradient Canvas */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 80% 60% at 50% -10%, #17130e 0%, #0c0a08 60%, #080706 100%)"
            : "radial-gradient(ellipse 85% 65% at 50% -10%, #fbf8f3 0%, #f4eee3 50%, #ede5d8 100%)",
        }}
      />

      {/* Ambient Aurora Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`aurora aurora-a ${isDark ? "aurora-dark" : "aurora-light"}`}
        />
        <div
          className={`aurora aurora-b ${isDark ? "aurora-dark" : "aurora-light"}`}
        />
      </div>

      {/* Interactive Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Micro-grid overlay */}
      <div className="absolute inset-0 custom-grid-pattern opacity-20 pointer-events-none z-20" />

      {/* Film grain texture */}
      <div className="absolute inset-0 pointer-events-none z-20 grain" />

      {/* Depth vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 90% 80% at 50% 45%, transparent 55%, rgba(0,0,0,0.35) 100%)"
            : "radial-gradient(ellipse 90% 80% at 50% 45%, transparent 60%, rgba(120,95,65,0.10) 100%)",
        }}
      />

      <style>{`
        .aurora {
          position: absolute;
          width: 60vw;
          height: 60vw;
          border-radius: 9999px;
          filter: blur(90px);
          opacity: 0.35;
          will-change: transform;
        }
        .aurora-dark.aurora-a { background: radial-gradient(circle, rgba(212,168,67,0.35), transparent 70%); }
        .aurora-dark.aurora-b { background: radial-gradient(circle, rgba(235,195,115,0.22), transparent 70%); }
        .aurora-light.aurora-a { background: radial-gradient(circle, rgba(182,142,92,0.30), transparent 70%); }
        .aurora-light.aurora-b { background: radial-gradient(circle, rgba(198,162,118,0.22), transparent 70%); }
        .aurora-a { top: -15%; left: -10%; animation: drift-a 34s ease-in-out infinite; }
        .aurora-b { bottom: -20%; right: -10%; animation: drift-b 42s ease-in-out infinite; }
        @keyframes drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(6vw, 8vh) scale(1.12); }
        }
        @keyframes drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-7vw, -6vh) scale(1.08); }
        }
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.035;
          mix-blend-mode: overlay;
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora { animation: none; }
        }
      `}</style>
    </div>
  );
}
