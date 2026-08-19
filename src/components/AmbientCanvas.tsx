import React, { useEffect, useRef } from 'react';

interface AmbientCanvasProps {
  atmosphere?: 'normal' | 'warm' | 'cold' | 'rain' | 'celebration';
}

export const AmbientCanvas: React.FC<AmbientCanvasProps> = ({ atmosphere = 'normal' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Stars
    const stars: { x: number; y: number; size: number; alpha: number; speed: number; phase: number }[] = [];
    for (let i = 0; i < 160; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.75,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Floating Petals / Particles
    const particles: {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      rotation: number;
      vRot: number;
      color: string;
      isHeart?: boolean;
    }[] = [];

    const getColors = () => {
      if (atmosphere === 'warm') return ['#fb7185', '#f43f5e', '#fbbf24', '#f97316'];
      if (atmosphere === 'cold') return ['#93c5fd', '#60a5fa', '#c7d2fe', '#e0e7ff'];
      if (atmosphere === 'rain') return ['#38bdf8', '#0284c7', '#94a3b8', '#64748b'];
      if (atmosphere === 'celebration') return ['#f43f5e', '#fbbf24', '#ec4899', '#a855f7', '#34d399'];
      return ['#fda4af', '#f43f5e', '#fbbf24', '#e0e7ff', '#fbcfe8'];
    };

    for (let i = 0; i < (atmosphere === 'rain' ? 120 : 45); i++) {
      const colors = getColors();
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3.5 + 1.5,
        vx: atmosphere === 'rain' ? (Math.random() - 0.5) * 1.5 : (Math.random() - 0.5) * 0.4,
        vy: atmosphere === 'rain' ? Math.random() * 7 + 8 : Math.random() * 0.6 + 0.25,
        alpha: Math.random() * 0.6 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        isHeart: Math.random() > 0.6,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw Twinkling Stars (unless heavy rain)
      if (atmosphere !== 'rain') {
        for (const star of stars) {
          const currentAlpha = star.alpha * (0.6 + 0.4 * Math.sin(time * star.speed * 60 + star.phase));
          ctx.fillStyle = `rgba(240, 244, 255, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          // Subtle diamond sparkle for larger stars
          if (star.size > 1.4 && currentAlpha > 0.6) {
            ctx.strokeStyle = `rgba(251, 191, 36, ${currentAlpha * 0.4})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(star.x - star.size * 2, star.y);
            ctx.lineTo(star.x + star.size * 2, star.y);
            ctx.moveTo(star.x, star.y - star.size * 2);
            ctx.lineTo(star.x, star.y + star.size * 2);
            ctx.stroke();
          }
        }
      }

      // Draw Floating Petals / Raindrops / Hearts
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;

        if (atmosphere === 'rain') {
          // Rain streaks
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(p.vx * 3, p.vy * 2);
          ctx.stroke();
        } else if (p.isHeart) {
          // Subtle glowing floating heart
          ctx.fillStyle = p.color;
          const s = p.size * 0.8;
          ctx.beginPath();
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s, -s * 0.6, -s * 1.2, s * 0.4, 0, s * 1.2);
          ctx.bezierCurveTo(s * 1.2, s * 0.4, s, -s * 0.6, 0, s * 0.3);
          ctx.fill();
        } else {
          // Soft petal / particle
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.3, p.size * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [atmosphere]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: atmosphere === 'rain' ? 0.9 : 0.75 }}
    />
  );
};
