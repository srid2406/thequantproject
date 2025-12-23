"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let chartW = window.innerWidth;
    let chartH = window.innerHeight;
    let animationId: number;

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      chartW = window.innerWidth;
      chartH = window.innerHeight;

      canvas!.width = chartW * dpr;
      canvas!.height = chartH * dpr;
      canvas!.style.width = chartW + "px";
      canvas!.style.height = chartH + "px";

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    class ChartLine {
      points: { x: number; y: number }[] = [];
      numPoints = 50;
      y: number;
      speed: number;
      amplitude: number;
      frequency: number;
      offset: number;

      constructor() {
        this.y = Math.random() * chartH;
        this.speed = 0.5 + Math.random() * 1;
        this.amplitude = 50 + Math.random() * 100;
        this.frequency = 0.01 + Math.random() * 0.02;
        this.offset = Math.random() * Math.PI * 2;

        for (let i = 0; i < this.numPoints; i++) {
          this.points.push({ x: (chartW / this.numPoints) * i, y: this.y });
        }
      }

      update() {
        this.offset += this.speed * 0.02;
        for (let i = 0; i < this.points.length; i++) {
          this.points[i].y =
            this.y +
            Math.sin(i * this.frequency + this.offset) * this.amplitude;
        }
      }

      draw() {
        ctx!.beginPath();
        ctx!.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
          ctx!.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx!.strokeStyle = "rgba(255,255,255,0.28)";
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
      }
    }

    let lines: ChartLine[] = [];

    function initLines() {
      lines = [];
      for (let i = 0; i < 3; i++) {
        lines.push(new ChartLine());
      }
    }

    resizeCanvas();
    initLines();

    function animate() {
      ctx!.clearRect(0, 0, chartW, chartH);
      lines.forEach((l) => {
        l.update();
        l.draw();
      });
      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      resizeCanvas();
      initLines();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <header className="hero">
      <div className="gradient-bg" aria-hidden="true">
        <div className="gradient-orb orb1"></div>
        <div className="gradient-orb orb2"></div>
        <div className="gradient-orb orb3"></div>
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[2] pointer-events-none opacity-90"
      />

      <div className="hero-content px-4">
        <Image
          src="/logo.png"
          alt="The Quant Project logo"
          width={80}
          height={80}
          className="block mx-auto rounded-full mb-7"
        />

        <h1 className="hero-title">THE QUANT PROJECT</h1>
        <p className="tagline mt-3">
          Quantitative Trading. Algorithmic Precision.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="#about"
            className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow hover:translate-y-[-2px] transition-transform"
          >
            Get Started
          </Link>
          <Link
            href="/strategies"
            className="bg-transparent border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:border-white/60 transition-colors"
          >
            View Strategies
          </Link>
        </div>
      </div>
    </header>
  );
}
