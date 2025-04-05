
import { useEffect, useRef } from 'react';
import { Map, Navigation } from 'lucide-react';

interface MapComponentProps {
  latitude: number;
  longitude: number;
  address: string;
}

const MapComponent = ({ latitude, longitude, address }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Implementação aprimorada do mapa usando elementos visuais mais detalhados
    if (mapRef.current) {
      const mapElement = mapRef.current;
      
      // Limpa qualquer conteúdo anterior
      mapElement.innerHTML = '';
      
      // Cria o elemento do mapa com estilo melhorado
      const mapContainer = document.createElement('div');
      mapContainer.className = 'w-full h-full bg-gray-100 relative rounded-lg overflow-hidden';
      
      // Adiciona um grid mais detalhado para simular ruas
      const gridSize = 10;
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          // Cria blocos que representam quadras
          if ((i + j) % 2 === 0) {
            const block = document.createElement('div');
            block.className = 'absolute bg-gray-200';
            block.style.left = `${(i * 100) / gridSize}%`;
            block.style.top = `${(j * 100) / gridSize}%`;
            block.style.width = `${100 / gridSize}%`;
            block.style.height = `${100 / gridSize}%`;
            mapContainer.appendChild(block);
          }
        }
      }
      
      // Adiciona linhas horizontais para ruas principais
      for (let i = 0; i <= gridSize; i++) {
        const horizontalRoad = document.createElement('div');
        horizontalRoad.className = 'absolute bg-white';
        horizontalRoad.style.left = '0';
        horizontalRoad.style.top = `${(i * 100) / gridSize}%`;
        horizontalRoad.style.width = '100%';
        horizontalRoad.style.height = '2px';
        mapContainer.appendChild(horizontalRoad);
      }
      
      // Adiciona linhas verticais para ruas principais
      for (let i = 0; i <= gridSize; i++) {
        const verticalRoad = document.createElement('div');
        verticalRoad.className = 'absolute bg-white';
        verticalRoad.style.left = `${(i * 100) / gridSize}%`;
        verticalRoad.style.top = '0';
        verticalRoad.style.width = '2px';
        verticalRoad.style.height = '100%';
        mapContainer.appendChild(verticalRoad);
      }
      
      // Adiciona uma localização do imóvel (pino)
      const pin = document.createElement('div');
      pin.className = 'absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center';
      pin.style.left = '50%';
      pin.style.top = '50%';
      
      const pinInner = document.createElement('div');
      pinInner.className = 'w-6 h-6 bg-leilao-primary rounded-full relative animate-pulse';
      
      const pinDot = document.createElement('div');
      pinDot.className = 'w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      
      const pinShadow = document.createElement('div');
      pinShadow.className = 'absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black/30 rounded-full';
      
      pin.appendChild(pinInner);
      pinInner.appendChild(pinDot);
      pin.appendChild(pinShadow);
      mapContainer.appendChild(pin);
      
      // Adiciona alguns elementos de estrada
      const centralRoadH = document.createElement('div');
      centralRoadH.className = 'absolute bg-gray-300 left-0 top-1/2 transform -translate-y-1/2 w-full h-[5%]';
      mapContainer.appendChild(centralRoadH);
      
      const centralRoadV = document.createElement('div');
      centralRoadV.className = 'absolute bg-gray-300 top-0 left-1/2 transform -translate-x-1/2 h-full w-[5%]';
      mapContainer.appendChild(centralRoadV);
      
      // Adiciona controles de mapa simulados
      const controls = document.createElement('div');
      controls.className = 'absolute top-3 right-3 bg-white rounded-md shadow-md p-1 flex flex-col';
      
      const zoomIn = document.createElement('button');
      zoomIn.className = 'w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded';
      zoomIn.innerHTML = '+';
      zoomIn.onclick = (e) => { e.preventDefault(); };
      
      const zoomOut = document.createElement('button');
      zoomOut.className = 'w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded';
      zoomOut.innerHTML = '−';
      zoomOut.onclick = (e) => { e.preventDefault(); };
      
      const separator = document.createElement('div');
      separator.className = 'w-6 h-px bg-gray-200 mx-auto my-1';
      
      controls.appendChild(zoomIn);
      controls.appendChild(separator);
      controls.appendChild(zoomOut);
      mapContainer.appendChild(controls);
      
      // Adiciona bússola simulada
      const compass = document.createElement('div');
      compass.className = 'absolute top-3 left-3 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center';
      compass.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`;
      mapContainer.appendChild(compass);
      
      // Adiciona indicador de coordenadas
      const coords = document.createElement('div');
      coords.className = 'absolute bottom-12 right-3 bg-white/90 text-xs p-1 rounded shadow-sm';
      coords.textContent = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
      mapContainer.appendChild(coords);
      
      // Adiciona endereço
      const addressDiv = document.createElement('div');
      addressDiv.className = 'absolute bottom-2 left-2 right-2 bg-white p-2 text-sm rounded shadow';
      addressDiv.textContent = address;
      mapContainer.appendChild(addressDiv);
      
      // Adiciona todos os elementos ao mapa
      mapElement.appendChild(mapContainer);
    }
  }, [latitude, longitude, address]);
  
  return (
    <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
      <div 
        ref={mapRef} 
        className="w-full h-full bg-gray-100 flex items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center text-gray-500 p-4">
          <Map size={32} className="mb-2 text-leilao-primary" />
          <div className="text-center">
            <p>Carregando mapa...</p>
            <p className="text-xs mt-1">Localização: {address}</p>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-2 flex items-center justify-center">
        <Navigation size={14} className="mr-1" />
        <span>Coordenadas: {latitude.toFixed(5)}, {longitude.toFixed(5)}</span>
      </div>
    </div>
  );
};

export default MapComponent;
