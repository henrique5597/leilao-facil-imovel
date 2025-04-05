
import { useEffect, useRef } from 'react';

interface MapComponentProps {
  latitude: number;
  longitude: number;
  address: string;
}

const MapComponent = ({ latitude, longitude, address }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Esta é uma representação visual do mapa, que seria substituída por uma API real
    // como Google Maps ou Mapbox em uma implementação real
    if (mapRef.current) {
      const mapElement = mapRef.current;
      
      // Adiciona um elemento visual para mostrar a localização
      const locationPin = document.createElement('div');
      locationPin.className = 'w-6 h-6 bg-leilao-primary rounded-full relative';
      
      // Cria um pseudo-pino de localização
      const innerPin = document.createElement('div');
      innerPin.className = 'w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      locationPin.appendChild(innerPin);
      
      // Posiciona o pino no centro do mapa
      locationPin.style.position = 'absolute';
      locationPin.style.top = '50%';
      locationPin.style.left = '50%';
      locationPin.style.transform = 'translate(-50%, -50%)';
      
      // Limpa qualquer conteúdo anterior
      mapElement.innerHTML = '';
      
      // Adiciona a representação do mapa
      const mapBackground = document.createElement('div');
      mapBackground.className = 'w-full h-full bg-gray-200 rounded-lg overflow-hidden relative';
      
      // Adiciona linhas de grade para simular um mapa
      for (let i = 0; i < 5; i++) {
        const horizontalLine = document.createElement('div');
        horizontalLine.className = 'absolute w-full h-px bg-gray-300';
        horizontalLine.style.top = `${(i + 1) * 20}%`;
        
        const verticalLine = document.createElement('div');
        verticalLine.className = 'absolute h-full w-px bg-gray-300';
        verticalLine.style.left = `${(i + 1) * 20}%`;
        
        mapBackground.appendChild(horizontalLine);
        mapBackground.appendChild(verticalLine);
      }
      
      // Adiciona elementos ao mapa
      mapElement.appendChild(mapBackground);
      mapBackground.appendChild(locationPin);
      
      // Adiciona texto de endereço
      const addressText = document.createElement('div');
      addressText.className = 'absolute bottom-2 left-2 right-2 bg-white p-2 text-sm rounded shadow';
      addressText.textContent = address;
      mapBackground.appendChild(addressText);
      
      // Adiciona texto de coordenadas para simulação
      const coordsText = document.createElement('div');
      coordsText.className = 'absolute top-2 right-2 bg-white/80 p-1 text-xs rounded';
      coordsText.textContent = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
      mapBackground.appendChild(coordsText);
    }
  }, [latitude, longitude, address]);
  
  return (
    <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
      <div 
        ref={mapRef} 
        className="w-full h-full bg-gray-100 flex items-center justify-center"
      >
        <div className="text-gray-500">Carregando mapa...</div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-2">
        Nota: Este é um mapa representativo. Em produção, use Google Maps ou outra API de mapas.
      </div>
    </div>
  );
};

export default MapComponent;
