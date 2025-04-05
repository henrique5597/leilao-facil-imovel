
import { useEffect, useRef, useState } from 'react';
import { Compass, Map, Navigation, ZoomIn, ZoomOut } from 'lucide-react';

interface MapComponentProps {
  latitude: number;
  longitude: number;
  address: string;
}

const MapComponent = ({ latitude, longitude, address }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  
  const maxZoom = 3;
  const minZoom = 0.5;
  
  useEffect(() => {
    if (mapRef.current) {
      renderMap();
    }
    
    // Add mouse wheel event for zoom
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    };
    
    const mapElement = mapRef.current;
    if (mapElement) {
      mapElement.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (mapElement) {
        mapElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [latitude, longitude, address, zoomLevel, mapOffset]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    setMapOffset(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  const renderMap = () => {
    if (!mapRef.current) return;
    
    const mapElement = mapRef.current;
    
    // Clear any previous content
    mapElement.innerHTML = '';
    
    // Create the main map container
    const mapContainer = document.createElement('div');
    mapContainer.className = 'w-full h-full bg-gray-100 relative rounded-lg overflow-hidden';
    mapContainer.style.cursor = isDragging ? 'grabbing' : 'grab';
    
    // Create the map content container with transform for pan and zoom
    const mapContent = document.createElement('div');
    mapContent.className = 'absolute w-[200%] h-[200%] left-1/2 top-1/2 origin-center';
    mapContent.style.transform = `translate(${mapOffset.x}px, ${mapOffset.y}px) translate(-50%, -50%) scale(${zoomLevel})`;
    
    // Create the map grid (streets and blocks)
    createMapGrid(mapContent);
    
    // Add pin at current location
    createLocationPin(mapContent);
    
    // Add map controls (zoom, compass)
    createMapControls(mapContainer);
    
    // Add coordinates and address display
    createInfoDisplay(mapContainer);
    
    mapContainer.appendChild(mapContent);
    mapElement.appendChild(mapContainer);
  };
  
  const createMapGrid = (container: HTMLDivElement) => {
    // Add map background
    container.style.backgroundColor = '#e5e7eb'; // Light gray background
    
    // Create a more realistic map grid
    const gridSize = 10;
    
    // Create background terrain texture
    const terrainBg = document.createElement('div');
    terrainBg.className = 'absolute inset-0';
    terrainBg.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23d1d5db\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")';
    container.appendChild(terrainBg);
    
    // Create blocks
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const isCommercial = (i === 4 && j >= 4 && j <= 6) || (j === 5 && i >= 3 && i <= 7);
        const isPark = (i === 2 && j === 2) || (i === 7 && j === 7);
        
        const block = document.createElement('div');
        block.className = 'absolute';
        if (isCommercial) {
          block.className += ' bg-blue-100';
        } else if (isPark) {
          block.className += ' bg-green-200';
        } else {
          block.className += ' bg-gray-200';
        }
        block.style.left = `${(i * 100) / gridSize}%`;
        block.style.top = `${(j * 100) / gridSize}%`;
        block.style.width = `${100 / gridSize - 1}%`;
        block.style.height = `${100 / gridSize - 1}%`;
        container.appendChild(block);
      }
    }
    
    // Create roads (horizontal and vertical)
    for (let i = 0; i <= gridSize; i++) {
      const isMainRoad = i === 5;
      
      const horizontalRoad = document.createElement('div');
      horizontalRoad.className = isMainRoad ? 'absolute bg-gray-400' : 'absolute bg-gray-300';
      horizontalRoad.style.left = '0';
      horizontalRoad.style.top = `${(i * 100) / gridSize}%`;
      horizontalRoad.style.width = '100%';
      horizontalRoad.style.height = isMainRoad ? '1.5%' : '1%';
      horizontalRoad.style.transform = 'translateY(-50%)';
      
      const verticalRoad = document.createElement('div');
      verticalRoad.className = isMainRoad ? 'absolute bg-gray-400' : 'absolute bg-gray-300';
      verticalRoad.style.left = `${(i * 100) / gridSize}%`;
      verticalRoad.style.top = '0';
      verticalRoad.style.width = isMainRoad ? '1.5%' : '1%';
      verticalRoad.style.height = '100%';
      verticalRoad.style.transform = 'translateX(-50%)';
      
      container.appendChild(horizontalRoad);
      container.appendChild(verticalRoad);
    }
  };
  
  const createLocationPin = (container: HTMLDivElement) => {
    const pin = document.createElement('div');
    pin.className = 'absolute w-12 h-12 z-50';
    pin.style.left = '50%';
    pin.style.top = '50%';
    pin.style.transform = 'translate(-50%, -50%)';
    
    // Create pin marker
    const pinMarker = document.createElement('div');
    pinMarker.className = 'relative';
    
    // Pin top (circle)
    const pinTop = document.createElement('div');
    pinTop.className = 'w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md relative z-10';
    
    // Pin dot (inside circle)
    const pinDot = document.createElement('div');
    pinDot.className = 'w-2 h-2 bg-white rounded-full';
    
    // Pin shadow
    const pinShadow = document.createElement('div');
    pinShadow.className = 'w-4 h-1 bg-black/30 rounded-full mt-1 mx-auto';
    
    // Google Maps-like pulse effect
    const pulseRing = document.createElement('div');
    pulseRing.className = 'absolute w-12 h-12 rounded-full';
    pulseRing.style.top = '-3px';
    pulseRing.style.left = '-3px';
    pulseRing.style.animation = 'pulse 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite';
    pulseRing.style.background = 'radial-gradient(circle, rgba(255,0,0,0.2) 0%, rgba(255,0,0,0) 70%)';
    
    // Add inline animation style
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(0.1); opacity: 1; }
        70% { transform: scale(2); opacity: 0; }
        100% { transform: scale(2.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    pinTop.appendChild(pinDot);
    pinMarker.appendChild(pulseRing);
    pinMarker.appendChild(pinTop);
    pin.appendChild(pinMarker);
    pin.appendChild(pinShadow);
    container.appendChild(pin);
  };
  
  const createMapControls = (container: HTMLDivElement) => {
    // Zoom controls
    const zoomControls = document.createElement('div');
    zoomControls.className = 'absolute top-3 right-3 bg-white rounded-md shadow-md flex flex-col z-20';
    
    const zoomInBtn = document.createElement('button');
    zoomInBtn.className = 'w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-t-md';
    zoomInBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>';
    zoomInBtn.onclick = handleZoomIn;
    
    const zoomDivider = document.createElement('div');
    zoomDivider.className = 'w-full h-px bg-gray-200';
    
    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.className = 'w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-b-md';
    zoomOutBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>';
    zoomOutBtn.onclick = handleZoomOut;
    
    zoomControls.appendChild(zoomInBtn);
    zoomControls.appendChild(zoomDivider);
    zoomControls.appendChild(zoomOutBtn);
    
    // Compass
    const compass = document.createElement('div');
    compass.className = 'absolute top-16 right-3 w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center z-20';
    compass.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>';
    
    // Reset button (to reset pan and zoom)
    const resetBtn = document.createElement('button');
    resetBtn.className = 'absolute top-28 right-3 w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center z-20 hover:bg-gray-100';
    resetBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>';
    resetBtn.onclick = handleReset;
    
    container.appendChild(zoomControls);
    container.appendChild(compass);
    container.appendChild(resetBtn);
  };
  
  const createInfoDisplay = (container: HTMLDivElement) => {
    // Coordinates display
    const coords = document.createElement('div');
    coords.className = 'absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs shadow-md z-20';
    coords.textContent = `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`;
    
    // Zoom level display
    const zoomDisplay = document.createElement('div');
    zoomDisplay.className = 'absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs shadow-md z-20';
    zoomDisplay.textContent = `Zoom: ${zoomLevel.toFixed(1)}x`;
    
    // Address display (like Google Maps)
    const addressDisplay = document.createElement('div');
    addressDisplay.className = 'absolute top-3 left-3 right-14 bg-white px-3 py-2 rounded shadow-md text-sm truncate z-20';
    addressDisplay.textContent = address;
    
    container.appendChild(coords);
    container.appendChild(zoomDisplay);
    container.appendChild(addressDisplay);
  };
  
  const handleZoomIn = () => {
    if (zoomLevel < maxZoom) {
      setZoomLevel(prev => Math.min(prev + 0.2, maxZoom));
    }
  };
  
  const handleZoomOut = () => {
    if (zoomLevel > minZoom) {
      setZoomLevel(prev => Math.max(prev - 0.2, minZoom));
    }
  };
  
  const handleReset = () => {
    setZoomLevel(1);
    setMapOffset({ x: 0, y: 0 });
  };
  
  return (
    <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md relative">
      <div 
        ref={mapRef} 
        className="w-full h-full bg-gray-100 relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col items-center justify-center text-gray-500 h-full">
          <Map size={32} className="mb-2 text-red-500" />
          <div className="text-center">
            <p>Carregando mapa...</p>
            <p className="text-xs mt-1">Localização: {address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
