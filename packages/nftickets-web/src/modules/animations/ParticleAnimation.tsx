import { useEffect, useRef } from 'react';

interface ParticleProps {
  count?: number;
  color?: string;
  speed?: number;
  maxSize?: number;
  minSize?: number;
}

const ParticleAnimation: React.FC<ParticleProps> = ({
  count = 50,
  color = 'rgba(26, 136, 255, 0.7)',
  speed = 1,
  maxSize = 8,
  minSize = 2
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match window
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      
      constructor() {
        // Ensure canvas exists before using its dimensions
        const width = canvas?.width ?? window.innerWidth;
        const height = canvas?.height ?? window.innerHeight;
        
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = minSize + Math.random() * (maxSize - minSize);
        this.speedX = (Math.random() - 0.5) * speed;
        this.speedY = (Math.random() - 0.5) * speed;
        this.opacity = 0.1 + Math.random() * 0.5;
        this.fadeSpeed = 0.01 * Math.random();
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Get current canvas dimensions or fallback to window dimensions
        const width = canvas?.width ?? window.innerWidth;
        const height = canvas?.height ?? window.innerHeight;
        
        // Bounce off edges
        if (this.x > width || this.x < 0) this.speedX *= -1;
        if (this.y > height || this.y < 0) this.speedY *= -1;
        
        // Fade in and out
        this.opacity += Math.random() > 0.5 ? this.fadeSpeed : -this.fadeSpeed;
        if (this.opacity <= 0.1) this.fadeSpeed = Math.abs(this.fadeSpeed);
        if (this.opacity >= 0.8) this.fadeSpeed = -Math.abs(this.fadeSpeed);
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(/[^,]+(?=\))/, this.opacity.toString());
        ctx.fill();
      }
    }
    
    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Connect particles with lines if they're close enough
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = color.replace(/[^,]+(?=\))/, (0.1 * (1 - distance / 100)).toString());
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [count, color, speed, maxSize, minSize]);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.6
      }}
    />
  );
};

export default ParticleAnimation; 