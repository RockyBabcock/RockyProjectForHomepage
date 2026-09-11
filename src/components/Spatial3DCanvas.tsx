import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSurfaceMode } from '../context/SurfaceModeContext';

interface Spatial3DCanvasProps {
  className?: string;
  isHovered?: boolean;
}

// Robust WebGL capability check
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export const Spatial3DCanvas: React.FC<Spatial3DCanvasProps> = ({
  className = '',
  isHovered = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanup = () => {};

    // Check WebGL availability first
    const webglSupported = isWebGLAvailable();

    if (webglSupported) {
      try {
        cleanup = initWebGLScene(container, isDark, isHovered);
      } catch (err) {
        console.warn('WebGL initialization failed, falling back to 2D canvas projection:', err);
        cleanup = init2DCanvasScene(container, isDark, isHovered);
      }
    } else {
      cleanup = init2DCanvasScene(container, isDark, isHovered);
    }

    return () => {
      cleanup();
    };
  }, [isDark, isHovered]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};

// =========================================================================
// 1. PRIMARY: WebGL / Three.js Scene
// =========================================================================
function initWebGLScene(container: HTMLDivElement, isDark: boolean, isHovered: boolean): () => void {
  const width = container.clientWidth || 400;
  const height = container.clientHeight || 300;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 4.2;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
    failIfMajorPerformanceCaveat: false,
  });

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  // Geometry 1: Core Polyhedron
  const icoGeo = new THREE.IcosahedronGeometry(1.2, 1);
  const wireMat = new THREE.MeshBasicMaterial({
    color: isDark ? 0x8b5cf6 : 0x6d28d9,
    wireframe: true,
    transparent: true,
    opacity: isDark ? 0.35 : 0.45,
  });
  const icoMesh = new THREE.Mesh(icoGeo, wireMat);
  scene.add(icoMesh);

  // Geometry 2: Outer Orbital Ring
  const torusGeo = new THREE.TorusGeometry(1.9, 0.015, 12, 64);
  const torusMat = new THREE.MeshBasicMaterial({
    color: isDark ? 0xa78bfa : 0x7c3aed,
    transparent: true,
    opacity: isDark ? 0.25 : 0.35,
  });
  const torusMesh = new THREE.Mesh(torusGeo, torusMat);
  torusMesh.rotation.x = Math.PI / 3;
  scene.add(torusMesh);

  // Geometry 3: Secondary Floating Ring
  const ring2Geo = new THREE.TorusGeometry(1.6, 0.01, 8, 48);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: isDark ? 0xc4b5fd : 0x4c1d95,
    transparent: true,
    opacity: isDark ? 0.2 : 0.25,
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.y = Math.PI / 4;
  scene.add(ring2);

  // Coordinates points
  const pointsGeo = new THREE.BufferGeometry();
  const count = 40;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 5;
    positions[i + 1] = (Math.random() - 0.5) * 4;
    positions[i + 2] = (Math.random() - 0.5) * 3;
  }
  pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pointsMat = new THREE.PointsMaterial({
    size: 0.04,
    color: isDark ? 0xddd6fe : 0x5b21b6,
    transparent: true,
    opacity: 0.5,
  });
  const points = new THREE.Points(pointsGeo, pointsMat);
  scene.add(points);

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetX = x * 1.5;
    targetY = y * 1.5;
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  let reqId: number;
  const animate = () => {
    mouseX += (targetX - mouseX) * 0.05;
    mouseY += (targetY - mouseY) * 0.05;

    const speed = isHovered ? 0.012 : 0.005;
    icoMesh.rotation.x += speed * 0.7;
    icoMesh.rotation.y += speed;

    torusMesh.rotation.z += speed * 0.5;
    ring2.rotation.x += speed * 0.8;

    camera.position.x = mouseX * 0.8;
    camera.position.y = -mouseY * 0.8;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
    reqId = requestAnimationFrame(animate);
  };

  animate();

  const handleResize = () => {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w <= 0 || h <= 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(container);

  return () => {
    cancelAnimationFrame(reqId);
    window.removeEventListener('mousemove', handleMouseMove);
    resizeObserver.disconnect();
    try {
      renderer.dispose();
      icoGeo.dispose();
      wireMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    } catch {
      // safe cleanup
    }
  };
}

// =========================================================================
// 2. FALLBACK: 2D Canvas 3D Isometric Projection Engine (Zero WebGL Dependency)
// =========================================================================
function init2DCanvasScene(container: HTMLDivElement, isDark: boolean, isHovered: boolean): () => void {
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let width = (canvas.width = (container.clientWidth || 400) * 2);
  let height = (canvas.height = (container.clientHeight || 300) * 2);

  // Golden ratio icosahedron vertex builder
  const phi = (1 + Math.sqrt(5)) / 2;
  const rawVertices: [number, number, number][] = [
    [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
    [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
    [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
  ];

  // Scale down
  const vertices = rawVertices.map(([x, y, z]) => [x * 0.9, y * 0.9, z * 0.9]);

  // Edges connecting vertices with distance 2
  const edges: [number, number][] = [];
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      const dx = vertices[i][0] - vertices[j][0];
      const dy = vertices[i][1] - vertices[j][1];
      const dz = vertices[i][2] - vertices[j][2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (Math.abs(dist - 2 * 0.9) < 0.1) {
        edges.push([i, j]);
      }
    }
  }

  // Particle cloud
  const particles: [number, number, number][] = Array.from({ length: 36 }, () => [
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 5,
    (Math.random() - 0.5) * 4,
  ]);

  let rotX = 0;
  let rotY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 1.5;
    targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 1.5;
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  const handleResize = () => {
    if (!container) return;
    width = canvas.width = (container.clientWidth || 400) * 2;
    height = canvas.height = (container.clientHeight || 300) * 2;
  };

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(container);

  let reqId: number;

  const render = () => {
    mouseX += (targetX - mouseX) * 0.05;
    mouseY += (targetY - mouseY) * 0.05;

    const speed = isHovered ? 0.014 : 0.006;
    rotX += speed * 0.7;
    rotY += speed;

    ctx.clearRect(0, 0, width, height);

    const cx = width / 2 + mouseX * 60;
    const cy = height / 2 - mouseY * 60;
    const scale = Math.min(width, height) * 0.32;
    const cameraDist = 4.0;

    // Helper 3D rotation & projection
    const project = (x: number, y: number, z: number): [number, number] => {
      // Rotate Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      // Rotate X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const f = scale / (cameraDist + z2);
      return [cx + x1 * f, cy + y2 * f];
    };

    // Draw Particles
    ctx.fillStyle = isDark ? 'rgba(196, 181, 253, 0.4)' : 'rgba(109, 40, 217, 0.35)';
    particles.forEach(([px, py, pz]) => {
      const [sx, sy] = project(px, py, pz);
      ctx.beginPath();
      ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Outer Orbital Rings
    ctx.strokeStyle = isDark ? 'rgba(167, 139, 250, 0.3)' : 'rgba(124, 58, 237, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const ringSegments = 48;
    const ringR = 2.1;
    for (let k = 0; k <= ringSegments; k++) {
      const theta = (k / ringSegments) * Math.PI * 2;
      const rx = Math.cos(theta) * ringR;
      const rz = Math.sin(theta) * ringR;
      const [px, py] = project(rx, Math.sin(theta * 2) * 0.2, rz);
      if (k === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();

    // Draw Polyhedron Wireframe
    const projectedVerts = vertices.map(([vx, vy, vz]) => project(vx, vy, vz));

    ctx.strokeStyle = isDark ? 'rgba(139, 92, 246, 0.65)' : 'rgba(109, 40, 217, 0.55)';
    ctx.lineWidth = 1.8;

    edges.forEach(([i, j]) => {
      const [x1, y1] = projectedVerts[i];
      const [x2, y2] = projectedVerts[j];
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });

    // Draw Node Vertices
    ctx.fillStyle = isDark ? '#A78BFA' : '#7C3AED';
    projectedVerts.forEach(([vx, vy]) => {
      ctx.beginPath();
      ctx.arc(vx, vy, 3.2, 0, Math.PI * 2);
      ctx.fill();
    });

    reqId = requestAnimationFrame(render);
  };

  render();

  return () => {
    cancelAnimationFrame(reqId);
    window.removeEventListener('mousemove', handleMouseMove);
    resizeObserver.disconnect();
    if (container.contains(canvas)) {
      container.removeChild(canvas);
    }
  };
}
