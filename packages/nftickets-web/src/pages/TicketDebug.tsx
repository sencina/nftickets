import { useState } from 'react';
import FloatingTicket from '../modules/animations/FloatingTicket';
import '../App.css';

const TicketDebug = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [color, setColor] = useState('#1a88ff');
  
  // Update position values
  const updatePosition = (axis: 'x' | 'y' | 'z', value: number) => {
    setPosition(prev => ({ ...prev, [axis]: value }));
  };
  
  return (
    <div className="app-container">
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(0,0,0,0.7)', padding: '10px' }}>
        <h2 style={{ color: 'white' }}>Ticket Animation Debug</h2>
        
        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <div>
            <label style={{ color: 'white', marginRight: '5px' }}>X:</label>
            <input 
              type="range" 
              min="-10" 
              max="10" 
              step="0.5" 
              value={position.x} 
              onChange={(e) => updatePosition('x', parseFloat(e.target.value))} 
            />
            <span style={{ color: 'white', marginLeft: '5px' }}>{position.x}</span>
          </div>
          
          <div>
            <label style={{ color: 'white', marginRight: '5px' }}>Y:</label>
            <input 
              type="range" 
              min="-10" 
              max="10" 
              step="0.5" 
              value={position.y} 
              onChange={(e) => updatePosition('y', parseFloat(e.target.value))} 
            />
            <span style={{ color: 'white', marginLeft: '5px' }}>{position.y}</span>
          </div>
          
          <div>
            <label style={{ color: 'white', marginRight: '5px' }}>Z:</label>
            <input 
              type="range" 
              min="-10" 
              max="10" 
              step="0.5" 
              value={position.z} 
              onChange={(e) => updatePosition('z', parseFloat(e.target.value))} 
            />
            <span style={{ color: 'white', marginLeft: '5px' }}>{position.z}</span>
          </div>
          
          <div>
            <label style={{ color: 'white', marginRight: '5px' }}>Color:</label>
            <input 
              type="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)} 
            />
          </div>
        </div>
      </div>
      
      {/* Single ticket in debug mode */}
      <FloatingTicket position={position} color={color} debug={true} />
      
      <div className="centered-auth-container">
        <div className="auth-header">
          <h1>Ticket Animation Test</h1>
          <p>Adjust the controls to position the ticket in the viewport</p>
        </div>
      </div>
    </div>
  );
};

export default TicketDebug; 