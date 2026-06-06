/**
 * Photorealistic 3D Earth Globe
 * Inspired by https://codepen.io/enesser/full/pgWjoW (enesser/earth-webgl)
 * Uses Three.js with sphere geometry + NASA public domain textures
 * Features: terrain, clouds, atmosphere glow, directional sun, auto-rotation, mouse orbit
 */

import * as THREE from 'three';
import gsap from 'gsap';

export function initGlobe() {
  const container = document.getElementById('globe-container');
  if (!container) return;

  // --- Scene Setup ---
  const scene = new THREE.Scene();
  // Use aspect 1 so the sphere renders as a perfect circle
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  // Position camera to the right so we see the left edge of the globe (showing right half to user)
  camera.position.set(1.0, 0, 2.2);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // --- Lighting (emulates the Sun) ---
  const sunColor = new THREE.Color('#ffeedd');
  const directionalLight = new THREE.DirectionalLight(sunColor, 3.4);
  directionalLight.position.set(-5, 3, -10);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(new THREE.Color('#333344'), 0.8);
  scene.add(ambientLight);

  // --- Earth Group ---
  const earthGroup = new THREE.Group();
  scene.add(earthGroup);

  // --- Texture Loader ---
  const textureLoader = new THREE.TextureLoader();

  // NASA Blue Marble textures (public domain, served from reliable CDN)
  const EARTH_TEXTURE =
    'https://unpkg.com/three-globe@2.41.12/example/img/earth-blue-marble.jpg';
  const EARTH_BUMP =
    'https://unpkg.com/three-globe@2.41.12/example/img/earth-topology.png';
  const EARTH_SPECULAR =
    'https://unpkg.com/three-globe@2.41.12/example/img/earth-water.png';
  const CLOUDS_TEXTURE =
    'https://unpkg.com/three-globe@2.41.12/example/img/earth-clouds.png';

  // --- Terrain Sphere ---
  const terrainGeometry = new THREE.SphereGeometry(1, 64, 64);
  const terrainMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load(EARTH_TEXTURE),
    bumpMap: textureLoader.load(EARTH_BUMP),
    bumpScale: 0.04,
    specularMap: textureLoader.load(EARTH_SPECULAR),
    specular: new THREE.Color('#334466'),
    shininess: 15,
  });
  const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
  earthGroup.add(terrainMesh);

  // --- Clouds Sphere ---
  const cloudsGeometry = new THREE.SphereGeometry(1.01, 64, 64);
  const cloudsMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load(CLOUDS_TEXTURE),
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });
  const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
  earthGroup.add(cloudsMesh);

  // --- Atmosphere Glow (Fresnel rim shader) ---
  const atmosphereVertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const atmosphereFragmentShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform vec3 uAtmosphereColor;
    uniform float uAtmosphereIntensity;

    void main() {
      // Fresnel effect — stronger glow at edges
      vec3 viewDir = normalize(-vPosition);
      float fresnel = 1.0 - dot(viewDir, vNormal);
      fresnel = pow(fresnel, 3.0) * uAtmosphereIntensity;

      gl_FragColor = vec4(uAtmosphereColor, fresnel * 0.8);
    }
  `;

  const atmosphereGeometry = new THREE.SphereGeometry(1.08, 64, 64);
  const atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    uniforms: {
      uAtmosphereColor: { value: new THREE.Color('#4488ff') },
      uAtmosphereIntensity: { value: 1.5 },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
  });
  const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  earthGroup.add(atmosphereMesh);

  // --- Outer glow (larger, subtler) ---
  const outerGlowGeometry = new THREE.SphereGeometry(1.18, 32, 32);
  const outerGlowMaterial = new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    uniforms: {
      uAtmosphereColor: { value: new THREE.Color('#1a4488') },
      uAtmosphereIntensity: { value: 0.8 },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
  earthGroup.add(outerGlow);

  // --- Mouse Interaction ---
  let mouseX = 0,
    mouseY = 0;
  let isDragging = false;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  container.addEventListener('mousedown', () => {
    isDragging = true;
  });
  container.addEventListener('mouseup', () => {
    isDragging = false;
  });
  container.addEventListener('mouseleave', () => {
    isDragging = false;
    mouseX = 0;
    mouseY = 0;
  });

  // --- Resize ---
  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    // Use the larger dimension so the globe fills/overflows the container
    const size = Math.max(w, h);
    renderer.setSize(size, size);
    // Keep aspect 1:1 so sphere is always a perfect circle
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // --- Animation Loop ---
  const TERRAIN_VELOCITY = 0.001;
  const CLOUDS_VELOCITY = 0.0015;

  function animate() {
    requestAnimationFrame(animate);

    // Auto-rotation
    terrainMesh.rotation.y += TERRAIN_VELOCITY;
    cloudsMesh.rotation.y += CLOUDS_VELOCITY;

    // Subtle mouse influence on camera (keep it mostly showing right half)
    const targetX = 1.0 + mouseX * 0.15;
    const targetY = mouseY * 0.2;

    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (-targetY - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  // --- Entry Animation ---
  earthGroup.scale.set(0, 0, 0);
  gsap.to(earthGroup.scale, {
    x: 1,
    y: 1,
    z: 1,
    duration: 2,
    ease: 'elastic.out(1, 0.5)',
    delay: 0.3,
  });

  animate();
}
