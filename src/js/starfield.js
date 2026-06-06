/**
 * Starfield / Warp Speed Background
 * Inspired by codepen.io/nodws/pen/pejBNb
 * Full-page canvas starfield with warp acceleration on scroll
 */

import gsap from 'gsap';

export function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animId;
  let warpFactor = 0; // 0 = normal drift, 1 = full warp

  const STAR_COUNT = 600;
  const MAX_DEPTH = 1500;
  const stars = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createStar() {
    return {
      x: (Math.random() - 0.5) * width * 3,
      y: (Math.random() - 0.5) * height * 3,
      z: Math.random() * MAX_DEPTH,
      prevX: 0,
      prevY: 0,
    };
  }

  function initStars() {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(createStar());
    }
  }

  function draw() {
    // Slight trail effect for streaking
    ctx.fillStyle = `rgba(11, 16, 32, ${0.3 + (1 - warpFactor) * 0.6})`;
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const speed = 2 + warpFactor * 30;

    for (let i = 0; i < STAR_COUNT; i++) {
      const star = stars[i];

      // Move star toward camera
      star.z -= speed;

      // Reset if behind camera
      if (star.z <= 0) {
        star.x = (Math.random() - 0.5) * width * 3;
        star.y = (Math.random() - 0.5) * height * 3;
        star.z = MAX_DEPTH;
        star.prevX = cx + (star.x / star.z) * 300;
        star.prevY = cy + (star.y / star.z) * 300;
        continue;
      }

      // Project to 2D
      const x = cx + (star.x / star.z) * 300;
      const y = cy + (star.y / star.z) * 300;

      // Size based on depth
      const size = (1 - star.z / MAX_DEPTH) * 2.5;
      const alpha = (1 - star.z / MAX_DEPTH) * 0.9;

      // Draw streak line when warping
      if (warpFactor > 0.1) {
        const streakLength = warpFactor;
        ctx.beginPath();
        ctx.moveTo(star.prevX || x, star.prevY || y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(150, 180, 255, ${alpha * streakLength})`;
        ctx.lineWidth = size * 0.8;
        ctx.stroke();
      }

      // Draw star point
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
      ctx.fill();

      star.prevX = x;
      star.prevY = y;
    }

    animId = requestAnimationFrame(draw);
  }

  // Setup
  resize();
  initStars();
  draw();

  window.addEventListener('resize', () => {
    resize();
    initStars();
  });

  // Warp on scroll — accelerate when user scrolls down
  const scrollThreshold = document.documentElement.scrollHeight - window.innerHeight;

  function updateWarp() {
    const scrollY = window.scrollY || window.pageYOffset;
    const ratio = Math.min(scrollY / (scrollThreshold * 0.3), 1);
    gsap.to({ val: warpFactor }, {
      val: ratio,
      duration: 0.4,
      ease: 'power2.out',
      onUpdate: function () {
        warpFactor = this.targets()[0].val;
      },
    });
  }

  window.addEventListener('scroll', updateWarp, { passive: true });

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
    window.removeEventListener('scroll', updateWarp);
  };
}
