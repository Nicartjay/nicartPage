/**
 * Photorealistic 3D Earth Globe
 * Matching settings from https://codepen.io/enesser/full/pgWjoW (enesser/earth-webgl)
 * Uses Three.js sphere geometry with NASA textures
 */

import * as THREE from 'three';
import gsap from 'gsap';

export function initGlobe() {
  const container = document.getElementById('globe-container');
  if (!container) return;

  // --- Settings (matched from enesser/earth-webgl settings.js) ---
  const settings = {
    sunColor: '#ffeedd',
    sunIntensity: 3.4,
    ambientLight: '#555555',
    atmosphereColor: '#001ea3',
    atmosphereOpacity: 0.22,
    cloudsOpacity: 0.9,
    cloudsVelocity: 0.002,
    terrainBumpScale: 0.04,
    terrainVelocity: 0.001,
  };

  // --- Scene Setup ---
  const scene = new THREE.Scene();
  // Camera at 5.25 distance (same as enesser main.js)
  const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
  camera.position.set(5.25, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // --- Sun (Directional Light) — position (-1, 1, -10) from enesser ---
  const directionalLightColor = new THREE.Color(settings.sunColor);
  const directionalLight = new THREE.DirectionalLight(
    directionalLightColor,
    settings.sunIntensity
  );
  directionalLight.position.set(-1, 1, -10);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // --- Ambient Light ---
  const ambientLightColor = new THREE.Color(settings.ambientLight);
  const ambientLight = new THREE.AmbientLight(ambientLightColor);
  scene.add(ambientLight);

  // --- Texture Loader ---
  const textureLoader = new THREE.TextureLoader();

  // Local textures (NASA public domain)
  const EARTH_TEXTURE = '/textures/earth-blue-marble.jpg';
  const EARTH_BUMP = '/textures/earth-topology.png';
  const EARTH_SPECULAR = '/textures/earth-water.png';
  const CLOUDS_TEXTURE = '/textures/earth-clouds.jpg';

  // --- Terrain Sphere (Earth surface) ---
  const terrainGeometry = new THREE.SphereGeometry(1, 64, 64);
  const terrainMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load(EARTH_TEXTURE),
    bumpMap: textureLoader.load(EARTH_BUMP),
    bumpScale: settings.terrainBumpScale,
    specularMap: textureLoader.load(EARTH_SPECULAR),
    specular: new THREE.Color('#111111'),
    // shininess 0 — from enesser: "make sure the model isn't shiny"
    shininess: 0,
  });
  terrainMaterial.receiveShadow = true;
  const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
  scene.add(terrainMesh);

  // --- Clouds Sphere ---
  const cloudsGeometry = new THREE.SphereGeometry(1.003, 64, 64);
  const cloudsMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load(CLOUDS_TEXTURE),
    transparent: true,
    opacity: settings.cloudsOpacity,
    depthWrite: false,
    // Additive blending — from enesser: "cloudsMaterial.blending = THREE.AdditiveBlending"
    blending: THREE.AdditiveBlending,
    shininess: 0,
  });
  cloudsMaterial.castShadow = true;
  const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
  scene.add(cloudsMesh);

  // --- Atmosphere Sphere ---
  // enesser uses a separate mesh with atmosphereColor #001ea3 and opacity 0.22
  const atmosphereGeometry = new THREE.SphereGeometry(1.015, 64, 64);
  const atmosphereMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color(settings.atmosphereColor),
    transparent: true,
    opacity: settings.atmosphereOpacity,
    depthWrite: false,
    shininess: 0,
    side: THREE.FrontSide,
  });
  const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  scene.add(atmosphereMesh);

  // --- Outer Glow (Fresnel rim — additional enhancement) ---
  const glowVertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const glowFragmentShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform vec3 uColor;
    uniform float uIntensity;
    void main() {
      vec3 viewDir = normalize(-vPosition);
      float fresnel = 1.0 - dot(viewDir, vNormal);
      fresnel = pow(fresnel, 3.5) * uIntensity;
      gl_FragColor = vec4(uColor, fresnel);
    }
  `;

  const outerGlowGeometry = new THREE.SphereGeometry(1.06, 64, 64);
  const outerGlowMaterial = new THREE.ShaderMaterial({
    vertexShader: glowVertexShader,
    fragmentShader: glowFragmentShader,
    uniforms: {
      uColor: { value: new THREE.Color('#4488ff') },
      uIntensity: { value: 1.2 },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
  });
  const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
  scene.add(outerGlow);

  // --- Mouse Interaction (from enesser main.js) ---
  let mouseX = 0,
    mouseY = 0;
  const windowHalfX = container.clientWidth / 2;
  const windowHalfY = container.clientHeight / 2;

  container.addEventListener('mousemove', (e) => {
    if (e.buttons) {
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - windowHalfX) / 2;
      mouseY = (e.clientY - rect.top - windowHalfY) / 2;
    }
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

  // --- Animation Loop (from enesser main.js render function) ---
  function animate() {
    requestAnimationFrame(animate);

    // Camera with mouse influence (from enesser):
    // camera.position.set(5.25, 0, 0);
    // camera.position.x += (mouseX - camera.position.x) * 0.005;
    // camera.position.y += (-mouseY - camera.position.y) * 0.005;
    camera.position.x += (5.25 + mouseX * 0.005 - camera.position.x) * 0.01;
    camera.position.y += (-mouseY * 0.005 - camera.position.y) * 0.01;
    camera.lookAt(scene.position);

    // Rotate clouds (from enesser settings: cloudsVelocity 0.002)
    cloudsMesh.rotation.y += settings.cloudsVelocity;

    // Rotate terrain (from enesser settings: terrainVelocity 0.001)
    terrainMesh.rotation.y += settings.terrainVelocity;

    // Atmosphere rotates with terrain
    atmosphereMesh.rotation.y += settings.terrainVelocity;

    renderer.render(scene, camera);
  }

  // --- Entry Animation ---
  terrainMesh.scale.set(0, 0, 0);
  cloudsMesh.scale.set(0, 0, 0);
  atmosphereMesh.scale.set(0, 0, 0);
  outerGlow.scale.set(0, 0, 0);

  gsap.to([terrainMesh.scale, cloudsMesh.scale, atmosphereMesh.scale, outerGlow.scale], {
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
