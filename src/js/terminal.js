/**
 * Terminal Animation — GSAP-powered typing sequence
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTerminal() {
  const terminalBody = document.getElementById('terminal-lines');
  if (!terminalBody) return;

  const lines = terminalBody.querySelectorAll('.terminal-line');
  if (!lines.length) return;

  // Create ScrollTrigger animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: terminalBody,
      start: 'top 75%',
      toggleActions: 'play none none reset',
    },
  });

  lines.forEach((line, i) => {
    tl.to(line, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, i * 0.5);
  });

  // Add a blinking cursor at the end
  const cursor = document.createElement('span');
  cursor.className = 'terminal-cursor';
  cursor.innerHTML = '&#9608;';
  cursor.style.cssText = 'color: var(--accent); animation: blink 1s step-end infinite;';
  
  tl.call(() => {
    const lastLine = lines[lines.length - 1];
    if (lastLine && !lastLine.querySelector('.terminal-cursor')) {
      lastLine.appendChild(cursor);
    }
  }, null, lines.length * 0.5 + 0.3);
}
