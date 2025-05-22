import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FloatingTicketProps {
  color?: string;
  position?: { x: number; y: number; z: number };
  debug?: boolean;
}

const FloatingTicket: React.FC<FloatingTicketProps> = ({
  color = '#1a88ff',
  position = { x: 0, y: 0, z: -5 },
  debug = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Add debug-related state
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  
  useEffect(() => {
    // Initialize animation tracking
    let frameCount = 0;
    let lastInfoUpdate = 0;
    
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera with optimal settings for ticket visibility
    const camera = new THREE.PerspectiveCamera(
      75, // balanced field of view
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4; // Optimal distance
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create ticket geometry (rounded rectangle)
    const ticketWidth = 3;
    const ticketHeight = 1.8;
    const cornerRadius = 0.2;
    
    // Create the ticket shape
    const shape = new THREE.Shape();
    
    // Start at the top left
    shape.moveTo(-ticketWidth / 2 + cornerRadius, ticketHeight / 2);
    
    // Top edge
    shape.lineTo(ticketWidth / 2 - cornerRadius, ticketHeight / 2);
    
    // Top right corner
    shape.quadraticCurveTo(
      ticketWidth / 2, ticketHeight / 2,
      ticketWidth / 2, ticketHeight / 2 - cornerRadius
    );
    
    // Right edge
    shape.lineTo(ticketWidth / 2, -ticketHeight / 2 + cornerRadius);
    
    // Bottom right corner
    shape.quadraticCurveTo(
      ticketWidth / 2, -ticketHeight / 2,
      ticketWidth / 2 - cornerRadius, -ticketHeight / 2
    );
    
    // Bottom edge
    shape.lineTo(-ticketWidth / 2 + cornerRadius, -ticketHeight / 2);
    
    // Bottom left corner
    shape.quadraticCurveTo(
      -ticketWidth / 2, -ticketHeight / 2,
      -ticketWidth / 2, -ticketHeight / 2 + cornerRadius
    );
    
    // Left edge
    shape.lineTo(-ticketWidth / 2, ticketHeight / 2 - cornerRadius);
    
    // Top left corner
    shape.quadraticCurveTo(
      -ticketWidth / 2, ticketHeight / 2,
      -ticketWidth / 2 + cornerRadius, ticketHeight / 2
    );
    
    // Create perforation line (dashed hole in ticket)
    const holePath = new THREE.Path();
    const holeY = 0;
    const holeRadius = 0.05;
    const holeCount = 15;
    const holeSpacing = ticketWidth / holeCount;
    
    for (let i = 0; i < holeCount; i++) {
      const holeX = -ticketWidth / 2 + holeSpacing * (i + 0.5);
      holePath.absarc(holeX, holeY, holeRadius, 0, Math.PI * 2, false);
    }
    
    shape.holes.push(holePath);
    
    // Create extruded geometry
    const extrudeSettings = {
      steps: 1,
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3
    };
    
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    
    // Create materials with more shiny appearance
    const mainColor = new THREE.Color(color);
    const frontMaterial = new THREE.MeshPhysicalMaterial({
      color: mainColor,
      metalness: 0.7,
      roughness: 0.2,
      reflectivity: 1.0,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide
    });
    
    const backMaterial = new THREE.MeshPhysicalMaterial({
      color: mainColor.clone().offsetHSL(0, 0, -0.1),
      metalness: 0.7,
      roughness: 0.2,
      reflectivity: 1.0,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide
    });
    
    const materials = [frontMaterial, backMaterial];
    
    // Create mesh with geometry and material
    const ticket = new THREE.Mesh(geometry, frontMaterial);
    scene.add(ticket);
    
    // After ticket is created, define the updateDebugInfo function
    const updateDebugInfo = (time: number) => {
      frameCount++;
      if (time - lastInfoUpdate > 1000) {
        setDebugInfo(`
Frames: ${frameCount}/s
Position: x=${ticket.position.x.toFixed(2)}, y=${ticket.position.y.toFixed(2)}, z=${ticket.position.z.toFixed(2)}
Rotation: y=${ticket.rotation.y.toFixed(2)}
Time: ${Math.floor(time)}ms
        `);
        frameCount = 0;
        lastInfoUpdate = time;
      }
    };
    
    // Add text to ticket
    const loader = new THREE.TextureLoader();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (context) {
      canvas.width = 512;
      canvas.height = 256;
      
      // Create a gradient background
      const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add a glow effect
      context.shadowBlur = 15;
      context.shadowColor = color;
      
      // Draw ticket title with gradient
      const titleGradient = context.createLinearGradient(0, 60, 0, 120);
      titleGradient.addColorStop(0, color);
      titleGradient.addColorStop(1, new THREE.Color(color).offsetHSL(0, 0, 0.2).getStyle());
      
      context.font = 'bold 70px Arial';
      context.textAlign = 'center';
      context.fillStyle = titleGradient;
      context.fillText('NFTickets', canvas.width / 2, 100);
      
      // Draw subtitle
      context.font = 'bold 30px Arial';
      context.fillStyle = '#FFFFFF';
      context.fillText('Web3 Authentication', canvas.width / 2, 150);
      
      // Add decorative line
      context.beginPath();
      context.moveTo(canvas.width * 0.2, 180);
      context.lineTo(canvas.width * 0.8, 180);
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.stroke();
      
      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      
      // Create plane for the text
      const textGeometry = new THREE.PlaneGeometry(ticketWidth * 0.9, ticketHeight * 0.8);
      const textMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
      });
      
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.z = 0.06;
      textMesh.rotation.x = Math.PI;
      textMesh.rotation.z = Math.PI;
      ticket.add(textMesh);
    }
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Brighter ambient light
    scene.add(ambientLight);
    
    // Add directional lights from multiple angles for better visibility
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight2.position.set(-5, -5, 5);
    scene.add(directionalLight2);
    
    // Add a point light to create a glow effect
    const pointLight = new THREE.PointLight(new THREE.Color(color), 1, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);
    
    // Position the ticket
    ticket.position.set(position.x, position.y, position.z);
    
    // Animation variables
    let lastTime = 0;
    const rotationSpeed = 0.03;
    
    // Animation function
    const animate = (currentTime: number = 0) => {
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = lastTime ? (currentTime - lastTime) / 1000 : 0.016;
      lastTime = currentTime;
      
      // Log animation is running (remove in production)
      if (Math.floor(currentTime) % 1000 === 0) {
        console.log('Ticket animation running:', currentTime);
      }
      
      try {
        // Directly modify rotation without relying on calculated values
        ticket.rotation.y += rotationSpeed;
        
        // Simple oscillation for position
        const oscY = Math.sin(currentTime * 0.001) * 0.5;
        const oscX = Math.cos(currentTime * 0.0005) * 0.3;
        
        // Apply movements
        ticket.position.set(
          position.x + oscX,
          position.y + oscY,
          position.z
        );
        
        // Directly control scale
        const scale = 1 + Math.sin(currentTime * 0.002) * 0.1;
        ticket.scale.set(scale, scale, scale);
        
        // Ensure point light follows ticket if it exists
        if (typeof pointLight !== 'undefined') {
          pointLight.position.copy(ticket.position);
          pointLight.position.z += 1;
          pointLight.intensity = 1 + Math.sin(currentTime * 0.001) * 0.5;
        }
        
        // Render scene
        renderer.render(scene, camera);
        
        // Update debug info
        updateDebugInfo(currentTime);
      } catch (error) {
        console.error('Animation error:', error);
      }
      
      // Continue animation loop - store reference for cancellation
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation with the proper API call pattern
    console.log('Starting ticket animation');
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      window.removeEventListener('resize', handleResize);
    };
  }, [color, position]);
  
  return (
    <>
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      
      {debug && debugInfo && (
        <div 
          style={{
            position: 'fixed',
            bottom: 10,
            right: 10,
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            padding: 10,
            borderRadius: 5,
            fontFamily: 'monospace',
            fontSize: 12,
            whiteSpace: 'pre',
            zIndex: 1000
          }}
        >
          <div>{debugInfo}</div>
        </div>
      )}
    </>
  );
};

export default FloatingTicket; 