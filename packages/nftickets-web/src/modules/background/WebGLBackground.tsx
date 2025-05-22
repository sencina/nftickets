import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WebGLBackgroundProps {
  color?: string;
}

const WebGLBackground: React.FC<WebGLBackgroundProps> = ({ 
  color = '#1a88ff'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);
  const connectionsRef = useRef<THREE.Line[]>([]);
  
  // Convert hex color to THREE.Color
  const mainColor = new THREE.Color(color);
  const secondaryColor = mainColor.clone().offsetHSL(0, 0, 0.2);
  
  useEffect(() => {
    // Initialize Three.js scene
    if (!containerRef.current) return;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      45, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 50;
    cameraRef.current = camera;
    
    // Create blockchain node material
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: mainColor,
      transparent: true,
      opacity: 0.7
    });
    
    // Create connection line material
    const lineMaterial = new THREE.LineBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: 0.3
    });
    
    // Create nodes (spheres)
    const nodes: THREE.Mesh[] = [];
    const nodeGeometry = new THREE.IcosahedronGeometry(0.5, 1);
    
    // Create 50 random nodes
    for (let i = 0; i < 50; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      
      // Position nodes randomly
      node.position.set(
        (Math.random() - 0.5) * 60, 
        (Math.random() - 0.5) * 60, 
        (Math.random() - 0.5) * 60
      );
      
      // Store velocity as user data
      node.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05
        ),
        originalScale: 1,
        pulseSpeed: 0.5 + Math.random() * 0.5,
        pulsePhase: Math.random() * Math.PI * 2
      };
      
      nodes.push(node);
      scene.add(node);
    }
    nodesRef.current = nodes;
    
    // Create connections
    const connections: THREE.Line[] = [];
    
    function updateConnections() {
      // Remove old connections
      connections.forEach(line => scene.remove(line));
      connections.length = 0;
      
      // Find nodes that are close to each other and connect them
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = nodes[i].position.distanceTo(nodes[j].position);
          
          if (distance < 15) {
            // Create a line geometry for the connection
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              nodes[i].position,
              nodes[j].position
            ]);
            
            // Create opacity based on distance
            const opacity = 0.3 * (1 - distance / 15);
            const material = lineMaterial.clone();
            material.opacity = opacity;
            
            const line = new THREE.Line(lineGeometry, material);
            connections.push(line);
            scene.add(line);
          }
        }
      }
    }
    connectionsRef.current = connections;
    
    // Animation function
    const animate = () => {
      // Move nodes according to their velocity
      nodes.forEach(node => {
        node.position.add(node.userData.velocity);
        
        // Bounce off invisible boundaries
        if (Math.abs(node.position.x) > 30) {
          node.userData.velocity.x *= -1;
        }
        if (Math.abs(node.position.y) > 30) {
          node.userData.velocity.y *= -1;
        }
        if (Math.abs(node.position.z) > 30) {
          node.userData.velocity.z *= -1;
        }
        
        // Add pulse animation
        const time = Date.now() * 0.001;
        const pulse = 0.2 * Math.sin(time * node.userData.pulseSpeed + node.userData.pulsePhase) + 1;
        node.scale.set(pulse, pulse, pulse);
      });
      
      // Update connections
      updateConnections();
      
      // Rotate the camera slowly
      if (cameraRef.current) {
        const time = Date.now() * 0.0005;
        cameraRef.current.position.x = Math.sin(time) * 50;
        cameraRef.current.position.z = Math.cos(time) * 50;
        cameraRef.current.lookAt(scene.position);
      }
      
      // Render scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (rendererRef.current && cameraRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
    };
  }, [color]);
  
  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden'
      }}
    />
  );
};

export default WebGLBackground; 