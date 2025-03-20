
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

interface Hero3DProps {
  className?: string;
}

const Hero3D: React.FC<Hero3DProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameRef = useRef<number>(0);
  const cubesRef = useRef<THREE.Mesh[]>([]);
  const spheresRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 10;
    cameraRef.current = camera;
    
    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Create directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create particle system for the background
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    const posArray = new Float32Array(particleCount * 3);
    const sizeArray = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position particles in a grid-like pattern
      posArray[i] = (Math.random() - 0.5) * 30;  // x
      posArray[i + 1] = (Math.random() - 0.5) * 30;  // y
      posArray[i + 2] = (Math.random() - 0.5) * 10;  // z
      
      sizeArray[i / 3] = Math.random() * 0.2 + 0.05;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x4dB8ff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;
    
    // Create metallic cubes for midground
    const cubes: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      
      // Create metallic material with a gradient
      const material = new THREE.MeshStandardMaterial({
        metalness: 0.8,
        roughness: 0.2,
        color: new THREE.Color(0x3a7bd5).lerp(new THREE.Color(0x00d2ff), i / 5),
        envMapIntensity: 1
      });
      
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        -2 - Math.random() * 3
      );
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(cube);
      cubes.push(cube);
    }
    cubesRef.current = cubes;
    
    // Create metallic spheres for visual interest
    const spheres: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.SphereGeometry(0.6, 32, 32);
      
      // Create metallic material with a gradient
      const material = new THREE.MeshStandardMaterial({
        metalness: 0.9,
        roughness: 0.1,
        color: new THREE.Color(0xc33764).lerp(new THREE.Color(0x1d2671), i / 3),
        envMapIntensity: 1
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        -3 - Math.random() * 2
      );
      scene.add(sphere);
      spheres.push(sphere);
    }
    spheresRef.current = spheres;
    
    // Foreground glass object (AI Mentor icon)
    const glassGeometry = new THREE.IcosahedronGeometry(1.5, 2);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      roughness: 0.1,
      transmission: 0.9, // Glass level of transparency
      thickness: 0.5, // Glass thickness
      envMapIntensity: 1
    });
    
    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    glassMesh.position.set(0, 0, 0);
    scene.add(glassMesh);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (!particlesRef.current || !cubesRef.current || !spheresRef.current) return;
      
      // Scroll-based camera movement
      const scrollY = window.scrollY;
      const scrollFactor = scrollY / window.innerHeight;
      camera.position.y = -scrollFactor * 2;
      
      // Animate particles
      particlesRef.current.rotation.x += 0.0005;
      particlesRef.current.rotation.y += 0.0003;
      
      // Animate cubes
      cubesRef.current.forEach((cube, i) => {
        cube.rotation.x += 0.001 + i * 0.0002;
        cube.rotation.y += 0.002 - i * 0.0001;
      });
      
      // Animate spheres
      spheresRef.current.forEach((sphere, i) => {
        sphere.rotation.x += 0.001 + i * 0.0003;
        sphere.rotation.y += 0.001 - i * 0.0002;
        
        // Add subtle pulsing effect
        const pulseFactor = Math.sin(Date.now() * 0.001 + i) * 0.03 + 1;
        sphere.scale.set(pulseFactor, pulseFactor, pulseFactor);
      });
      
      // Render scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} className={cn("absolute inset-0 z-0", className)} />
  );
};

export default Hero3D;
