import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  color: string;
};

type Props = {
  burst: number;
};

const CYAN = "#22d3ee";
const AMBER = "#f5b942";

export function ParticleSplash({ burst }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    if (!burst) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * devicePixelRatio;
    canvas.height = h * devicePixelRatio;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const cx = w / 2;
    const cy = h * 0.42;
    const next: Particle[] = [];
    for (let i = 0; i < 42; i++) {
      const angle = (Math.PI * 2 * i) / 42 + Math.random() * 0.2;
      const speed = 80 + Math.random() * 280;
      next.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        max: 0.55 + Math.random() * 0.45,
        size: 1.5 + Math.random() * 3.5,
        color: i % 3 === 0 ? AMBER : CYAN,
      });
    }
    particlesRef.current = next;
    lastRef.current = performance.now();

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastRef.current) / 1000);
      lastRef.current = now;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const list = particlesRef.current;
      let alive = false;
      for (const p of list) {
        p.life += dt;
        if (p.life >= p.max) continue;
        alive = true;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 40 * dt;
        const t = 1 - p.life / p.max;
        ctx.globalAlpha = t;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.6 + t * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (alive) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [burst]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60]"
      aria-hidden
    />
  );
}
