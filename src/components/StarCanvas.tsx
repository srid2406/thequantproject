"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  twinkle: number;
}

interface Planet {
  x: number;
  y: number;
  r: number;
  c1: string;
  c2: string;
  ring: boolean;
}

interface Constellation {
  a: Star;
  b: Star;
  alpha: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function StarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let starsW = 0;
    let starsH = 0;
    let stars: Star[] = [];
    let planets: Planet[] = [];
    let constellations: Constellation[] = [];
    let shootingStars: ShootingStar[] = [];
    let moonPhaseValue = 0;
    let animationId: number;
    let starFrame = 0;

    function getMoonPhase(date: Date) {
      const synodicMonth = 29.53058867;
      const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14));
      const diff = date.getTime() - knownNewMoon.getTime();
      const days = diff / 86400000;
      let phase = days % synodicMonth;
      if (phase < 0) phase += synodicMonth;
      return phase / synodicMonth;
    }

    function resizeCanvas() {
      if (!canvas || !ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const parent = canvas.parentElement;

      if (!parent) return;

      // Get parent dimensions and ensure full coverage including scroll height
      starsW = window.innerWidth;
      starsH = Math.max(
        parent.scrollHeight,
        parent.clientHeight,
        window.innerHeight,
      );

      canvas.width = starsW * dpr;
      canvas.height = starsH * dpr;
      canvas.style.width = starsW + "px";
      canvas.style.height = starsH + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initStars() {
      stars = [];
      planets = [];
      constellations = [];
      shootingStars = [];

      // Responsive star count
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 70 : 110;

      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * starsW,
          y: Math.random() * starsH,
          r: Math.random() * 1.9 + 0.5,
          alpha: 0.4 + Math.random() * 0.6,
          twinkle: 0.004 + Math.random() * 0.006,
        });
      }

      // Responsive constellation count
      const constellationCount = isMobile ? 4 : 8;
      for (let i = 0; i < constellationCount; i++) {
        const a = stars[Math.floor(Math.random() * stars.length)];
        const b = stars[Math.floor(Math.random() * stars.length)];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < starsW / 2) {
          constellations.push({ a, b, alpha: 0.28 + Math.random() * 0.2 });
        }
      }

      const palette: [string, string][] = [
        ["rgba(120,180,255,0.95)", "rgba(50,70,130,0.9)"],
        ["rgba(255,190,140,0.95)", "rgba(150,90,60,0.9)"],
        ["rgba(200,160,255,0.95)", "rgba(110,80,150,0.9)"],
      ];

      // Responsive planet count and size
      const planetCount = isMobile ? 2 : 3;
      for (let i = 0; i < planetCount; i++) {
        const [c1, c2] = palette[i % palette.length];
        planets.push({
          x: Math.random() * starsW * 0.6 + starsW * 0.1,
          y:
            i === 0
              ? starsH * 0.25
              : Math.random() * starsH * 0.6 + starsH * 0.2,
          r: (isMobile ? 10 : 14) + Math.random() * 18,
          c1,
          c2,
          ring: Math.random() > 0.5,
        });
      }

      moonPhaseValue = getMoonPhase(new Date());
    }

    function spawnShootingStar() {
      shootingStars.push({
        x: Math.random() * starsW,
        y: Math.random() * starsH * 0.4,
        vx: -(5 + Math.random() * 4),
        vy: (5 + Math.random() * 4) * 0.6,
        life: 0,
        maxLife: 80 + Math.random() * 60,
      });
    }

    function updateStars() {
      stars.forEach((s) => {
        s.alpha += s.twinkle * (Math.random() > 0.5 ? 1 : -1);
        if (s.alpha < 0.3) s.alpha = 0.3;
        if (s.alpha > 1) s.alpha = 1;
      });

      shootingStars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
      });

      shootingStars = shootingStars.filter(
        (s) =>
          s.life < s.maxLife &&
          s.x > -150 &&
          s.x < starsW + 150 &&
          s.y < starsH + 150,
      );

      if (Math.random() < 0.03 && shootingStars.length < 2) {
        spawnShootingStar();
      }
    }

    function drawMilkyWay() {
      if (!ctx) return;

      ctx.save();
      ctx.translate(starsW / 2, starsH / 2);
      ctx.rotate(-0.4);

      const width = starsW * 1.6;
      const height = window.innerWidth < 768 ? 100 : 140;
      const mg = ctx.createLinearGradient(-width / 2, 0, width / 2, 0);
      mg.addColorStop(0, "rgba(40,40,80,0)");
      mg.addColorStop(0.5, "rgba(120,140,220,0.18)");
      mg.addColorStop(1, "rgba(40,40,80,0)");

      ctx.globalAlpha = 0.8;
      ctx.fillStyle = mg;
      ctx.fillRect(-width / 2, -height / 2, width, height);
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    function drawPlanets() {
      if (!ctx) return;

      planets.forEach((p) => {
        const glow = ctx.createRadialGradient(
          p.x,
          p.y,
          p.r * 0.2,
          p.x,
          p.y,
          p.r * 2.2,
        );
        glow.addColorStop(0, "rgba(255,255,255,0.18)");
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
        ctx.fill();

        const g = ctx.createRadialGradient(
          p.x - p.r * 0.3,
          p.y - p.r * 0.4,
          p.r * 0.2,
          p.x,
          p.y,
          p.r,
        );
        g.addColorStop(0, p.c1);
        g.addColorStop(1, p.c2);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (p.ring) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(-0.7);
          ctx.strokeStyle = "rgba(210,220,255,0.5)";
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r * 1.6, p.r * 0.5, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      });
    }

    function drawMoon() {
      if (!ctx) return;

      const isMobile = window.innerWidth < 768;
      const padding = isMobile ? 40 : 60;
      const radius = isMobile ? 24 : 32;
      const x = starsW - padding;
      const y = padding + 10;

      const glowGrad = ctx.createRadialGradient(
        x,
        y,
        radius * 0.3,
        x,
        y,
        radius * 2.4,
      );
      glowGrad.addColorStop(0, "rgba(220,230,255,0.45)");
      glowGrad.addColorStop(1, "rgba(5,5,15,0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(x, y, radius * 2.4, 0, Math.PI * 2);
      ctx.fill();

      const moonGrad = ctx.createRadialGradient(
        x - radius * 0.3,
        y - radius * 0.4,
        radius * 0.2,
        x,
        y,
        radius,
      );
      moonGrad.addColorStop(0, "rgba(255,255,255,0.98)");
      moonGrad.addColorStop(1, "rgba(210,220,250,0.92)");
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      const phase = moonPhaseValue;
      const phaseAngle = phase <= 0.5 ? phase * 2 : (1 - phase) * 2;
      const offset = (1 - phaseAngle) * radius;

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x + offset * (phase < 0.5 ? 1 : -1), y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = "rgba(90,100,140,0.45)";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawStars() {
      if (!ctx) return;

      ctx.clearRect(0, 0, starsW, starsH);

      const bgGrad = ctx.createLinearGradient(0, 0, 0, starsH);
      bgGrad.addColorStop(0, "rgba(10,10,25,0.9)");
      bgGrad.addColorStop(1, "rgba(5,5,15,0.99)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, starsW, starsH);

      drawMilkyWay();
      drawPlanets();

      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      });

      constellations.forEach((c) => {
        ctx.beginPath();
        ctx.moveTo(c.a.x, c.a.y);
        ctx.lineTo(c.b.x, c.b.y);
        ctx.strokeStyle = `rgba(140,170,255,${c.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      shootingStars.forEach((s) => {
        const trailLength = window.innerWidth < 768 ? 50 : 70;
        const trailX = s.x - s.vx * (trailLength / 10);
        const trailY = s.y - s.vy * (trailLength / 10);
        const grad = ctx.createLinearGradient(trailX, trailY, s.x, s.y);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(1, "rgba(230,240,255,1)");

        ctx.beginPath();
        ctx.moveTo(trailX, trailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = window.innerWidth < 768 ? 2 : 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, window.innerWidth < 768 ? 2 : 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fill();
      });

      drawMoon();
    }

    function animate() {
      starFrame++;
      if (starFrame % 2 === 0) {
        updateStars();
        drawStars();
      }
      animationId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    initStars();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="starsCanvas"
      className="absolute inset-0 z-0 opacity-55 pointer-events-none"
    />
  );
}
