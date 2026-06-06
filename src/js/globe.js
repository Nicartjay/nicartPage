/**
 * Photorealistic 3D Earth Globe
 * Matching visual from https://codepen.io/enesser/full/pgWjoW (enesser/earth-webgl)
 * Uses Three.js sphere geometry with NASA textures
 */

import * as THREE from 'three';
import gsap from 'gsap';

export function initGlobe() {
  const container = document.getElementById('globe-container');
  if (!container) return;

  // --- Scene Setup ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.set(0, 0, 2.8);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  // Gamma correction for realistic lighting
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);

  // --- Sun (Directional Light) from the RIGHT side ---
  // In the original screenshot, light comes from front-right/bottom-right
  const sunLight = new THREE.DirectionalLight(0xffffff, 3.0);
  sunLight.position.set(5, 2, 3);
  scene.add(sunLight);

  // Very dim ambient so dark side isn't totally black (faint city glow feel)
  const ambientLight = new THREE.AmbientLight(0x0a0a1a, 0.3);
  scene.add(ambientLight);

  // --- Texture Loader ---
  const textureLoader = new THREE.TextureLoader();

  const EARTH_TEXTURE = '/textures/earth-blue-marble.jpg';
  const EARTH_BUMP = '/textures/earth-topology.png';
  const EARTH_SPECULAR = '/textures/earth-water.png';
  const CLOUDS_TEXTURE = '/textures/earth-clouds.jpg';

  // --- Earth Surface ---
  const terrainGeometry = new THREE.SphereGeometry(1, 64, 64);
  const terrainMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load(EARTH_TEXTURE),
    bumpMap: textureLoader.load(EARTH_BUMP),
    bumpScale: 0.02,
    specularMap: textureLoader.load(EARTH_SPECULAR),
    specular: new THREE.Color(0x333333),
    shininess: 25, // Visible ocean specular like in the original
  });
  const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
  scene.add(terrainMesh);

  // --- Clouds --- (Normal blending, NOT additive — looks natural like the screenshot)
  const cloudsGeometry = new THREE.SphereGeometry(1.005, 64, 64);
  const cloudsMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load(CLOUDS_TEXTURE),
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
    blending: THREE.NormalBlending, // Normal blending for realistic white clouds
    shininess: 0,
  });
  const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
  scene.add(cloudsMesh);

  // --- Atmosphere (thin blue rim glow — Fresnel) ---
  const atmosphereVert = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const atmosphereFrag = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vec3 viewDir = normalize(-vPosition);
      float fresnel = 1.0 - dot(viewDir, vNormal);
      // Tight rim: pow 4 makes it thin, matching the screenshot edge glow
      float rim = pow(fresnel, 4.0) * 1.4;
      // Blue atmosphere color from the screenshot
      vec3 color = vec3(0.3, 0.5, 1.0);
      gl_FragColor = vec4(color, rim);
    }
  `;

  const atmosphereGeometry = new THREE.SphereGeometry(1.025, 64, 64);
  const atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader: atmosphereVert,
    fragmentShader: atmosphereFrag,
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
  });
  const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  scene.add(atmosphereMesh);

  // --- Mouse Interaction ---
  let mouseX = 0,
    mouseY = 0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  container.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
  });

  // --- Resize ---
  function resize() {
    const h = container.clientHeight;
    renderer.setSize(h, h);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // --- Animation Loop ---
  function animate() {
    requestAnimationFrame(animate);

    // Slow rotation
    terrainMesh.rotation.y += 0.001;
    cloudsMesh.rotation.y += 0.0015;

    // Subtle mouse tilt
    const targetRotX = mouseY * 0.05;
    const targetRotY = mouseX * 0.05;
    terrainMesh.rotation.x += (targetRotX - terrainMesh.rotation.x) * 0.02;
    cloudsMesh.rotation.x += (targetRotX - cloudsMesh.rotation.x) * 0.02;
    atmosphereMesh.rotation.x += (targetRotX - atmosphereMesh.rotation.x) * 0.02;

    renderer.render(scene, camera);
  }

  // --- Entry Animation ---
  terrainMesh.scale.set(0, 0, 0);
  cloudsMesh.scale.set(0, 0, 0);
  atmosphereMesh.scale.set(0, 0, 0);

  gsap.to([terrainMesh.scale, cloudsMesh.scale, atmosphereMesh.scale], {
    x: 1,
    y: 1,
    z: 1,
    duration: 2,
    ease: 'elastic.out(1, 0.5)',
    delay: 0.3,
    stagger: 0.05,
  });

  animate();
}
