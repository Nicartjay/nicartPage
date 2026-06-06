/**
 * Mobile Navigation — open/close with animations
 */

import gsap from 'gsap';

export function initMobileNav() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');

  if (!mobileMenuBtn || !mobileNav || !mobileNavClose) return;

  const mobileNavLinks = mobileNav.querySelectorAll('a');

  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Animate links in
    gsap.fromTo(mobileNavLinks,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.1,
      }
    );
  });

  const closeNav = () => {
    gsap.to(mobileNavLinks, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      stagger: 0.03,
      onComplete: () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      },
    });
  };

  mobileNavClose.addEventListener('click', closeNav);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeNav);
  });
}
