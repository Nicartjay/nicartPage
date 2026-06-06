/**
 * Interactive 3D Globe
 * Inspired by enesser/earth-webgl & Gopi-Chakradhar's WebGL globe
 * Renders a dotted sphere with ripple effect on click
 */

import * as THREE from 'three';
import gsap from 'gsap';

export function initGlobe() {
  const container = document.getElementById('globe-container');
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.z = 2.8;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Globe geometry — dot matrix sphere
  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  // Create dots on sphere surface
  const DOT_COUNT = 5000;
  const GLOBE_RADIUS = 1;
  const positions = new Float32Array(DOT_COUNT * 3);
  const sizes = new Float32Array(DOT_COUNT);
  const alphas = new Float32Array(DOT_COUNT);

  for (let i = 0; i < DOT_COUNT; i++) {
    // Fibonacci sphere distribution for even spacing
    const phi = Math.acos(1 - 2 * (i + 0.5) / DOT_COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

    const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
    const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
    const z = GLOBE_RADIUS * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    sizes[i] = 2.0 + Math.random() * 1.5;
    alphas[i] = 0.4 + Math.random() * 0.6;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

  // Custom shader for dots with ripple
  const vertexShader = `
    attribute float size;
    attribute float alpha;
    varying float vAlpha;
    uniform float uTime;
    uniform vec3 uRippleOrigin;
    uniform float uRippleTime;

    void main() {
      vAlpha = alpha;

      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

      // Ripple effect
      float dist = distance(position, uRippleOrigin);
      float rippleWave = sin(dist * 10.0 - uRippleTime * 4.0) * 0.5 + 0.5;
      float rippleStrength = max(0.0, 1.0 - uRippleTime * 0.5) * step(dist, uRippleTime * 2.0);

      float finalSize = size + rippleStrength * rippleWave * 4.0;
      vAlpha = alpha + rippleStrength * rippleWave * 0.5;

      gl_PointSize = finalSize * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying float vAlpha;
    uniform vec3 uColor;

    void main() {
      float d = length(gl_PointCoord - vec2(0.5));
      if (d > 0.5) discard;
      float strength = 1.0 - (d * 2.0);
      gl_FragColor = vec4(uColor, vAlpha * strength);
    }
  `;

  const uniforms = {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(0x60a5fa) },
    uRippleOrigin: { value: new THREE.Vector3(0, 0, 1) },
    uRippleTime: { value: 10 }, // large = no visible ripple initially
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  globeGroup.add(points);

  // Ambient glow ring
  const ringGeo = new THREE.RingGeometry(1.02, 1.06, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x60a5fa,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  globeGroup.add(ring);

  // Mouse interaction
  let mouseX = 0, mouseY = 0;
  let targetRotX = 0, targetRotY = 0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  // Click ripple
  container.addEventListener('click', (e) => {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;

    // Approximate click to sphere surface
    uniforms.uRippleOrigin.value.set(x, y, Math.sqrt(Math.max(0, 1 - x * x - y * y)));
    uniforms.uRippleTime.value = 0;
  });

  // Resize handling
  function resize() {
    const size = Math.min(container.clientWidth, container.clientHeight);
    renderer.setSize(size, size);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener('resize', resize);

  // Animation loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Auto rotation + mouse influence
    targetRotY = time * 0.3 + mouseX * 0.5;
    targetRotX = mouseY * 0.3;

    globeGroup.rotation.y += (targetRotY - globeGroup.rotation.y) * 0.02;
    globeGroup.rotation.x += (targetRotX - globeGroup.rotation.x) * 0.02;

    // Update uniforms
    uniforms.uTime.value = time;
    uniforms.uRippleTime.value += 0.016;

    renderer.render(scene, camera);
  }

  // Entry animation
  gsap.from(globeGroup.scale, {
    x: 0, y: 0, z: 0,
    duration: 1.5,
    ease: 'elastic.out(1, 0.5)',
    delay: 0.5,
  });

  animate();
}
