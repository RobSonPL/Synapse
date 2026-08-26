import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/soundFX';
import { Sparkles, Cpu, Orbit, Layers, RefreshCw, Zap } from 'lucide-react';

export type SceneMode = 'neural' | 'helix' | 'matrix' | 'singularity';

interface Scene3DProps {
  onModeChange?: (mode: SceneMode) => void;
}

export const Scene3D: React.FC<Scene3DProps> = ({ onModeChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [currentMode, setCurrentMode] = useState<SceneMode>('neural');
  const [fps, setFps] = useState<number>(60);
  const [nodeCount, setNodeCount] = useState<number>(384);
  const [synapsePower, setSynapsePower] = useState<number>(99.8);
  const [shockwaveActive, setShockwaveActive] = useState<boolean>(false);

  // Store mutable scene handles
  const sceneContextRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    mainGroup: THREE.Group;
    particles: THREE.Points | null;
    coreMesh: THREE.Mesh | null;
    wireMesh: THREE.Mesh | null;
    rings: THREE.Group | null;
    shockwaves: THREE.Mesh[];
    mode: SceneMode;
    targetRotation: { x: number; y: number };
    currentRotation: { x: number; y: number };
  } | null>(null);

  // Switch 3D mode
  const switchMode = (mode: SceneMode) => {
    setCurrentMode(mode);
    sound.playClick();
    if (onModeChange) onModeChange(mode);
    if (!sceneContextRef.current) return;
    
    sceneContextRef.current.mode = mode;
    buildModeGeometry(sceneContextRef.current.scene, sceneContextRef.current.mainGroup, mode);
  };

  // Trigger shockwave on user click
  const triggerShockwave = (e?: React.MouseEvent) => {
    sound.playQuantum();
    setShockwaveActive(true);
    setTimeout(() => setShockwaveActive(false), 800);

    const ctx = sceneContextRef.current;
    if (!ctx) return;

    // Create expanding shockwave torus
    const ringGeo = new THREE.RingGeometry(0.2, 0.6, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const shockRing = new THREE.Mesh(ringGeo, ringMat);
    shockRing.rotation.x = Math.PI / 2;
    shockRing.userData = { scale: 1, opacity: 0.9 };
    ctx.mainGroup.add(shockRing);
    ctx.shockwaves.push(shockRing);
  };

  // Function to build scene geometry based on mode
  const buildModeGeometry = (scene: THREE.Scene, group: THREE.Group, mode: SceneMode) => {
    // Clean old objects in group
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if ((obj as any).geometry) (obj as any).geometry.dispose();
      if ((obj as any).material) {
        if (Array.isArray((obj as any).material)) {
          (obj as any).material.forEach((m: any) => m.dispose());
        } else {
          (obj as any).material.dispose();
        }
      }
    }

    if (mode === 'neural') {
      setNodeCount(512);
      setSynapsePower(99.9);

      // 1. Central Core: Glowing Icosahedron
      const coreGeo = new THREE.IcosahedronGeometry(2.4, 3);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        emissive: 0x0284c7,
        emissiveIntensity: 0.8,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      // 2. Inner Glowing Energy Sphere
      const innerGeo = new THREE.SphereGeometry(1.4, 32, 32);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: false,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);

      // 3. Orbital Gyro Rings
      const ringGroup = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(3.6 + i * 0.7, 0.025, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({
          color: i === 0 ? 0x00f5ff : i === 1 ? 0xa855f7 : 0x38bdf8,
          transparent: true,
          opacity: 0.75,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = (i * Math.PI) / 3;
        ring.rotation.y = (i * Math.PI) / 4;
        ringGroup.add(ring);
      }
      group.add(ringGroup);

      // 4. Neural Nodes Particle Cloud
      const particleCount = 450;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const color1 = new THREE.Color(0x0ea5e9);
      const color2 = new THREE.Color(0xec4899);
      const color3 = new THREE.Color(0x8b5cf6);

      for (let i = 0; i < particleCount; i++) {
        const radius = 2.8 + Math.random() * 3.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        const chosenColor = Math.random() > 0.6 ? color1 : Math.random() > 0.3 ? color3 : color2;
        colors[i * 3] = chosenColor.r;
        colors[i * 3 + 1] = chosenColor.g;
        colors[i * 3 + 2] = chosenColor.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const pMat = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      const pSystem = new THREE.Points(pGeo, pMat);
      group.add(pSystem);

      // 5. Interconnecting Synaptic Filament Lines
      const linePositions: number[] = [];
      for (let i = 0; i < 60; i++) {
        const idx1 = Math.floor(Math.random() * particleCount);
        const idx2 = Math.floor(Math.random() * particleCount);
        linePositions.push(
          positions[idx1 * 3], positions[idx1 * 3 + 1], positions[idx1 * 3 + 2],
          positions[idx2 * 3], positions[idx2 * 3 + 1], positions[idx2 * 3 + 2]
        );
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      group.add(lines);

    } else if (mode === 'helix') {
      setNodeCount(640);
      setSynapsePower(100);

      // Double Helix Quantum DNA Strand
      const strandPoints = 180;
      const positions: number[] = [];
      const colors: number[] = [];
      const cCyan = new THREE.Color(0x00f5ff);
      const cMagenta = new THREE.Color(0xf43f5e);

      const r = 2.2;
      const heightStep = 0.06;

      for (let i = 0; i < strandPoints; i++) {
        const angle = i * 0.25;
        const y = (i - strandPoints / 2) * heightStep;

        // Strand 1
        const x1 = Math.cos(angle) * r;
        const z1 = Math.sin(angle) * r;
        positions.push(x1, y, z1);
        colors.push(cCyan.r, cCyan.g, cCyan.b);

        // Strand 2 (180 deg offset)
        const x2 = Math.cos(angle + Math.PI) * r;
        const z2 = Math.sin(angle + Math.PI) * r;
        positions.push(x2, y, z2);
        colors.push(cMagenta.r, cMagenta.g, cMagenta.b);
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      pGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      });
      group.add(new THREE.Points(pGeo, pMat));

      // Connecting rungs
      const rungPositions: number[] = [];
      for (let i = 0; i < strandPoints; i += 3) {
        const angle = i * 0.25;
        const y = (i - strandPoints / 2) * heightStep;
        rungPositions.push(
          Math.cos(angle) * r, y, Math.sin(angle) * r,
          Math.cos(angle + Math.PI) * r, y, Math.sin(angle + Math.PI) * r
        );
      }
      const rungGeo = new THREE.BufferGeometry();
      rungGeo.setAttribute('position', new THREE.Float32BufferAttribute(rungPositions, 3));
      const rungMat = new THREE.LineBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      });
      group.add(new THREE.LineSegments(rungGeo, rungMat));

    } else if (mode === 'matrix') {
      setNodeCount(800);
      setSynapsePower(99.4);

      // Cybernetic Spatial Grid with Neon Beacon Cubes
      const gridHelper = new THREE.GridHelper(16, 24, 0x00f5ff, 0x1e293b);
      gridHelper.position.y = -2;
      group.add(gridHelper);

      // Floating holographic data cubes
      for (let i = 0; i < 18; i++) {
        const cubeGeo = new THREE.BoxGeometry(0.5 + Math.random() * 0.6, 0.5 + Math.random() * 1.5, 0.5 + Math.random() * 0.6);
        const cubeMat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0x0ea5e9 : 0x8b5cf6,
          wireframe: true,
          transparent: true,
          opacity: 0.7,
        });
        const cube = new THREE.Mesh(cubeGeo, cubeMat);
        cube.position.set(
          (Math.random() - 0.5) * 10,
          -1.5 + Math.random() * 4,
          (Math.random() - 0.5) * 10
        );
        group.add(cube);
      }

    } else if (mode === 'singularity') {
      setNodeCount(1200);
      setSynapsePower(100);

      // Galactic Vortex Particles
      const pCount = 1200;
      const positions = new Float32Array(pCount * 3);
      const colors = new Float32Array(pCount * 3);
      const c1 = new THREE.Color(0x00f5ff);
      const c2 = new THREE.Color(0xec4899);
      const c3 = new THREE.Color(0x6366f1);

      for (let i = 0; i < pCount; i++) {
        const spiral = i * 0.1;
        const dist = Math.pow(Math.random(), 2) * 6 + 0.5;
        const angle = spiral + dist * 2;

        positions[i * 3] = Math.cos(angle) * dist;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1.2 * (6 - dist) / 6;
        positions[i * 3 + 2] = Math.sin(angle) * dist;

        const mixColor = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
        colors[i * 3] = mixColor.r;
        colors[i * 3 + 1] = mixColor.g;
        colors[i * 3 + 2] = mixColor.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.07,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      group.add(new THREE.Points(pGeo, pMat));
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f5ff, 3, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 3, 50);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // 3. Main group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Build initial geometry
    buildModeGeometry(scene, mainGroup, currentMode);

    const sceneContext = {
      scene,
      camera,
      renderer,
      mainGroup,
      particles: null,
      coreMesh: null,
      wireMesh: null,
      rings: null,
      shockwaves: [] as THREE.Mesh[],
      mode: currentMode,
      targetRotation: { x: 0, y: 0 },
      currentRotation: { x: 0, y: 0 },
    };
    sceneContextRef.current = sceneContext;

    // 4. Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.8;
      mouseY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 5. Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // FPS tracking
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      // Smooth rotation lerp
      sceneContext.targetRotation.x = mouseY * 0.5;
      sceneContext.targetRotation.y = mouseX * 0.8;

      sceneContext.currentRotation.x += (sceneContext.targetRotation.x - sceneContext.currentRotation.x) * 0.05;
      sceneContext.currentRotation.y += (sceneContext.targetRotation.y - sceneContext.currentRotation.y) * 0.05;

      mainGroup.rotation.x = sceneContext.currentRotation.x + Math.sin(elapsedTime * 0.3) * 0.05;
      mainGroup.rotation.y += 0.005 + sceneContext.currentRotation.y * 0.02;

      // Animate shockwaves
      for (let i = sceneContext.shockwaves.length - 1; i >= 0; i--) {
        const sw = sceneContext.shockwaves[i];
        sw.userData.scale += delta * 14;
        sw.userData.opacity -= delta * 1.5;
        sw.scale.set(sw.userData.scale, sw.userData.scale, sw.userData.scale);
        (sw.material as THREE.MeshBasicMaterial).opacity = Math.max(0, sw.userData.opacity);

        if (sw.userData.opacity <= 0) {
          mainGroup.remove(sw);
          sw.geometry.dispose();
          (sw.material as THREE.Material).dispose();
          sceneContext.shockwaves.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full min-h-[480px] md:min-h-[640px] flex items-center justify-center select-none overflow-hidden"
      onClick={triggerShockwave}
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair z-0" />

      {/* Cyber 2030 Hologram Grid & Scanlines Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,8,20,0.7)_100%)] z-1" />
      <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(rgba(14,165,233,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.1)_1px,transparent_1px)] bg-[size:40px_40px] z-1" />

      {/* Top Floating Cyber HUD */}
      <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 pointer-events-auto z-20">
        
        {/* Realtime Telemetry Pill */}
        <div className="flex items-center gap-4 px-4 py-2 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 text-cyan-400 text-xs font-mono shadow-[0_0_25px_rgba(14,165,233,0.2)]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="font-black tracking-widest text-[10px] uppercase text-white">NEURAL ENGINE 2030</span>
          </div>

          <div className="h-3 w-[1px] bg-cyan-500/30 hidden sm:block"></div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] text-cyan-300/80">
            <span>FPS: <strong className="text-white">{fps}</strong></span>
            <span>NODES: <strong className="text-white">{nodeCount}</strong></span>
            <span>SYNAPSE: <strong className="text-emerald-400">{synapsePower}%</strong></span>
          </div>
        </div>

        {/* 3D Mode Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 shadow-2xl">
          {[
            { id: 'neural' as SceneMode, label: 'Neural Core', icon: <Cpu className="w-3.5 h-3.5" /> },
            { id: 'helix' as SceneMode, label: 'Quantum Helix', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { id: 'matrix' as SceneMode, label: 'Cyber Matrix', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'singularity' as SceneMode, label: 'Singularity', icon: <Orbit className="w-3.5 h-3.5" /> },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={(e) => {
                e.stopPropagation();
                switchMode(mode.id);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wider transition-all duration-300 ${
                currentMode === mode.id
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(14,165,233,0.5)] scale-105'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-white/5'
              }`}
            >
              {mode.icon}
              <span className="hidden md:inline">{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Center Interactive Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto z-20">
        <button
          onClick={triggerShockwave}
          onMouseEnter={() => sound.playHover()}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(14,165,233,0.2)]"
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
          <span>Kliknij przestrzeń 3D, by wywołać impuls synaptyczny</span>
        </button>
      </div>

      {/* Floating Holographic Compass Marks */}
      <div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-col gap-2 font-mono text-[9px] text-cyan-500/40 pointer-events-none hidden lg:flex">
        <span>LAT: 52.2297° N</span>
        <span>LON: 21.0122° E</span>
        <span>SYS: ONLINE</span>
        <div className="w-8 h-[1px] bg-cyan-500/30 my-1"></div>
        <span>RENDER: WEBGL_2</span>
      </div>

      <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col items-end gap-2 font-mono text-[9px] text-indigo-400/40 pointer-events-none hidden lg:flex">
        <span>QUANTUM: SYNC</span>
        <span>AI PROTOCOL: v2030</span>
        <span>LATENCY: &lt; 0.8ms</span>
        <div className="w-8 h-[1px] bg-indigo-500/30 my-1"></div>
        <span>SEC: ENCRYPTED</span>
      </div>
    </div>
  );
};
