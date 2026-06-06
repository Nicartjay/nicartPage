/**
 * Starfield / Warp Speed Background
 * Full-page canvas starfield with warp acceleration on scroll
 */

export function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let warpFactor = 0;

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
    ctx.fillStyle = `rgba(11, 16, 32, ${0.3 + (1 - warpFactor) * 0.6})`;
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const speed = 2 + warpFactor * 30;

    for (let i = 0; i < STAR_COUNT; i++) {
      const star = stars[i];
      star.z -= speed;

      if (star.z <= 0) {
        star.x = (Math.random() - 0.5) * width * 3;
        star.y = (Math.random() - 0.5) * height * 3;
        star.z = MAX_DEPTH;
        star.prevX = cx + (star.x / star.z) * 300;
        star.prevY = cy + (star.y / star.z) * 300;
        continue;
      }

      const x = cx + (star.x / star.z) * 300;
      const y = cy + (star.y / star.z) * 300;
      const size = (1 - star.z / MAX_DEPTH) * 2.5;
      const alpha = (1 - star.z / MAX_DEPTH) * 0.9;

      // Streak line when warping
      if (warpFactor > 0.1) {
        ctx.beginPath();
        ctx.moveTo(star.prevX || x, star.prevY || y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(150, 180, 255, ${alpha * warpFactor})`;
        ctx.lineWidth = size * 0.8;
        ctx.stroke();
      }

      // Star dot
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
      ctx.fill();

      star.prevX = x;
      star.prevY = y;
    }

    requestAnimationFrame(draw);
  }

  // Warp on scroll
  function updateWarp() {
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const target = Math.min((window.scrollY || 0) / (scrollMax * 0.3), 1);
    warpFactor += (target - warpFactor) * 0.05;
  }

  resize();
  initStars();
  draw();

  window.addEventListener('resize', () => { resize(); initStars(); });
  window.addEventListener('scroll', updateWarp, { passive: true });
}
