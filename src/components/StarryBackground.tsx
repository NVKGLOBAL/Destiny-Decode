'use client';

import { useEffect, useRef } from 'react';

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance

    const resize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      // Only resize if dimensions actually changed significantly (e.g. not just keyboard)
      if (Math.abs(newWidth - width) > 50 || Math.abs(newHeight - height) > 50) {
        width = newWidth;
        height = newHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }
    };

    window.addEventListener('resize', resize);
    
    // Initial setup
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // --- Particle Systems ---
    
    const isMobile = width < 768;
    const starCount = isMobile ? 120 : 500;
    const galaxyCount = isMobile ? 80 : 350;
    const energySpawnRate = isMobile ? 0.15 : 0.3;
    const nebulaCount = isMobile ? 2 : 3;

    interface Star {
      x: number;
      y: number;
      z: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
      color: string;
    }

    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
    }

    interface EnergyParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
      maxLife: number;
      type: 'spark' | 'glow';
    }

    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.5 + 0.5,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.8 ? '#a78bfa' : (Math.random() > 0.9 ? '#67e8f9' : '#ffffff'),
      });
    }

    const shootingStars: ShootingStar[] = [];
    const spawnShootingStar = () => {
      const angle = Math.random() * Math.PI * 0.25 + Math.PI * 0.125;
      const speed = Math.random() * 15 + 10;
      shootingStars.push({
        x: Math.random() * width * 0.5,
        y: Math.random() * height * 0.3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2 + 1,
        life: 0,
        maxLife: Math.random() * 40 + 20,
      });
    };

    const createGalaxy = (x: number, y: number, color: string, count: number, arms: number) => {
      return {
        x, y,
        rotation: 0,
        color,
        particles: Array.from({ length: count }, (_, i) => {
          const arm = i % arms;
          const distance = Math.pow(Math.random(), 1.5) * 250 + 20;
          const angle = (distance / 40) + (arm * (Math.PI * 2 / arms)) + (Math.random() - 0.5) * 0.6;
          return {
            angle,
            distance,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.8 + 0.1,
            color,
            speed: (1 / (distance + 50)) * 0.5,
            offset: Math.random() * 10,
            z: Math.random() * 20 - 10,
          };
        }),
      };
    };

    const galaxies = [
      createGalaxy(width * 0.15, height * 0.2, '#3b82f6', galaxyCount, 3),
      createGalaxy(width * 0.85, height * 0.75, '#f43f5e', Math.floor(galaxyCount * 1.25), 4),
    ];

    const energyParticles: EnergyParticle[] = [];
    const spawnEnergyParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.max(width, height) * 0.7;
      const x = width / 2 + Math.cos(angle) * dist;
      const y = height / 2 + Math.sin(angle) * dist;
      const targetX = width / 2;
      const targetY = height / 2;
      const dx = targetX - x;
      const dy = targetY - y;
      const mag = Math.sqrt(dx * dx + dy * dy);
      const speed = Math.random() * 3 + 2;
      
      energyParticles.push({
        x, y,
        vx: (dx / mag) * speed,
        vy: (dy / mag) * speed,
        size: Math.random() * 4 + 1,
        color: Math.random() > 0.5 ? '#a78bfa' : '#67e8f9',
        life: 0,
        maxLife: mag / speed,
        type: Math.random() > 0.8 ? 'spark' : 'glow',
      });
    };

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMove = (x: number, y: number) => {
      targetMouseX = x;
      targetMouseY = y;
    };

    const mouseMoveHandler = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const touchMoveHandler = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('touchmove', touchMoveHandler, { passive: true });

    // --- Animation Loop ---

    let frame = 0;
    let animId: number;
    const animate = () => {
      frame += 0.6; // Scale down time
      
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      // Deep space base
      ctx.fillStyle = '#02020a';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const parallaxX = (mouseX - centerX) * 0.02;
      const parallaxY = (mouseY - centerY) * 0.02;

      // Deep radial gradient
      const deepGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width);
      deepGrad.addColorStop(0, '#0a0a2a');
      deepGrad.addColorStop(1, '#02020a');
      ctx.fillStyle = deepGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'screen';

      // Draw Volumetric Nebulae
      const drawNebula = (x: number, y: number, r: number, color: string, pulse: number, alpha: number) => {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r * pulse);
        grad.addColorStop(0, color.replace('opacity', alpha.toString()));
        grad.addColorStop(0.5, color.replace('opacity', (alpha * 0.4).toString()));
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(x - r * 2, y - r * 2, r * 4, r * 4);
      };

      if (nebulaCount >= 2) {
        drawNebula(width * 0.3 + parallaxX * 0.5, height * 0.4 + parallaxY * 0.5, 400, 'rgba(49, 46, 129, opacity)', 1 + Math.sin(frame * 0.005) * 0.1, 0.2);
      }
      if (nebulaCount >= 3) {
        drawNebula(width * 0.7 + parallaxX * 0.8, height * 0.6 + parallaxY * 0.8, 500, 'rgba(112, 26, 117, opacity)', 1 + Math.cos(frame * 0.007) * 0.15, 0.15);
      }
      drawNebula(mouseX, mouseY, 300, 'rgba(88, 28, 135, opacity)', 1.2, 0.1);

      // Draw Stars with Parallax
      stars.forEach(star => {
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
        const sx = star.x + parallaxX * star.z;
        const sy = star.y + parallaxY * star.z;
        
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity * twinkle;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Draw Shooting Stars
      if (Math.random() < 0.015) spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life++;
        
        if (ss.life > ss.maxLife) {
          shootingStars.splice(i, 1);
          continue;
        }

        const alpha = 1 - (ss.life / ss.maxLife);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = ss.size;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * 3, ss.y - ss.vy * 3);
        ctx.stroke();
      }

      // Draw Galaxies
      galaxies.forEach(g => {
        g.rotation += 0.0004;
        ctx.save();
        ctx.translate(g.x + parallaxX * 1.5, g.y + parallaxY * 1.5);
        ctx.rotate(g.rotation);
        ctx.scale(1, 0.7); // Perspective tilt

        // Core glow
        const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 60);
        coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        coreGrad.addColorStop(0.3, g.color + '44');
        coreGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 60, 0, Math.PI * 2);
        ctx.fill();

        g.particles.forEach(p => {
          p.angle += p.speed;
          const x = Math.cos(p.angle) * p.distance;
          const y = Math.sin(p.angle) * p.distance;
          
          const twinkle = Math.sin(frame * 0.05 + p.offset) * 0.3 + 0.7;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * twinkle;
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      });
      ctx.globalAlpha = 1;

      // Draw Energy Particles
      if (Math.random() < energySpawnRate) spawnEnergyParticle();
      for (let i = energyParticles.length - 1; i >= 0; i--) {
        const p = energyParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life > p.maxLife) {
          energyParticles.splice(i, 1);
          continue;
        }

        const lifeRatio = p.life / p.maxLife;
        const opacity = Math.sin(lifeRatio * Math.PI) * 0.8;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity;
        
        if (p.type === 'spark') {
          ctx.fillRect(p.x, p.y, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // Draw Supernova Portal
      const portalPulse = 1 + Math.sin(frame * 0.015) * 0.06;
      
      // Intense God Rays
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(frame * 0.002);
      for (let i = 0; i < 24; i++) {
        const rayAngle = (i / 24) * Math.PI * 2;
        const rayLength = 600 + Math.sin(frame * 0.02 + i) * 120;
        const rayGrad = ctx.createLinearGradient(0, 0, Math.cos(rayAngle) * rayLength, Math.sin(rayAngle) * rayLength);
        rayGrad.addColorStop(0, 'rgba(212, 122, 122, 0.7)');
        rayGrad.addColorStop(0.2, 'rgba(167, 139, 250, 0.3)');
        rayGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.1)');
        rayGrad.addColorStop(1, 'transparent');
        ctx.strokeStyle = rayGrad;
        ctx.lineWidth = 20 * portalPulse;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(rayAngle) * rayLength, Math.sin(rayAngle) * rayLength);
        ctx.stroke();
      }
      ctx.restore();

      // Energy Tendrils
      ctx.save();
      ctx.translate(centerX, centerY);
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + frame * 0.001;
        const length = 200 + Math.sin(frame * 0.015 + i) * 40;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const cp1x = Math.cos(angle + 0.5) * length * 0.5;
        const cp1y = Math.sin(angle + 0.5) * length * 0.5;
        const cp2x = Math.cos(angle - 0.5) * length * 0.8;
        const cp2y = Math.sin(angle - 0.5) * length * 0.8;
        const endX = Math.cos(angle) * length;
        const endY = Math.sin(angle) * length;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        const tendrilGrad = ctx.createLinearGradient(0, 0, endX, endY);
        tendrilGrad.addColorStop(0, 'rgba(244, 196, 196, 0.6)');
        tendrilGrad.addColorStop(1, 'transparent');
        ctx.strokeStyle = tendrilGrad;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      ctx.restore();

      // Expanding Shockwaves
      const waveCount = 4;
      for (let i = 0; i < waveCount; i++) {
        const waveOffset = (frame * 1.5 + i * 150) % 800;
        const waveAlpha = 1 - (waveOffset / 800);
        ctx.strokeStyle = `rgba(212, 122, 122, ${waveAlpha * 0.3})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(centerX, centerY, waveOffset, 0, Math.PI * 2);
        ctx.stroke();
        
        // Secondary glow wave
        ctx.strokeStyle = `rgba(167, 139, 250, ${waveAlpha * 0.15})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.max(0, waveOffset - 20), 0, Math.PI * 2);
        ctx.stroke();
      }

      // Portal Core
      const portalGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 160 * portalPulse);
      portalGrad.addColorStop(0, '#ffffff');
      portalGrad.addColorStop(0.1, '#f4c4c4');
      portalGrad.addColorStop(0.2, '#d47a7a');
      portalGrad.addColorStop(0.4, '#a78bfa');
      portalGrad.addColorStop(0.7, 'rgba(139, 92, 246, 0.4)');
      portalGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = portalGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 160 * portalPulse, 0, Math.PI * 2);
      ctx.fill();

      // Lens Flare / Horizontal Streak
      const streakGrad = ctx.createLinearGradient(centerX - 800, centerY, centerX + 800, centerY);
      streakGrad.addColorStop(0, 'transparent');
      streakGrad.addColorStop(0.5, 'rgba(244, 196, 196, 0.5)');
      streakGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = streakGrad;
      ctx.fillRect(centerX - 800, centerY - 3, 1600, 6);

      // Swirling Energy Rings
      for (let i = 0; i < 8; i++) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(frame * 0.005 * (i + 1));
        ctx.scale(1, 0.15 + i * 0.08);
        ctx.strokeStyle = `rgba(212, 122, 122, ${0.1 + i * 0.03})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 120 + i * 60, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      ctx.globalCompositeOperation = 'source-over';
      
      // Cinematic Vignette
      const vigGrad = ctx.createRadialGradient(centerX, centerY, width * 0.1, centerX, centerY, width * 0.9);
      vigGrad.addColorStop(0, 'transparent');
      vigGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.4)');
      vigGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('touchmove', touchMoveHandler);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
      style={{ background: '#02020a' }}
    />
  );
}
