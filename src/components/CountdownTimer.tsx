
import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  // Estado para armazenar o tempo restante
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 1,
    minutes: 0,
    seconds: 8
  });

  // Efeito para atualizar o timer a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        // Se não houver mais tempo, não atualize
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }
        
        // Decrementa os segundos
        seconds--;
        
        // Ajusta os minutos se necessário
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        
        // Ajusta as horas se necessário
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        
        // Ajusta os dias se necessário
        if (hours < 0) {
          hours = 23;
          days--;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(timer);
  }, []);
  
  // Função para formatar números com dois dígitos (adicionar zero à esquerda se necessário)
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-center text-gray-700 mb-3">Tempo restante na venda online:</h2>
      
      <div className="flex justify-center space-x-2">
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 text-xl font-bold text-gray-800 rounded px-4 py-2 w-14 text-center">
            {formatNumber(timeLeft.days)}
          </div>
          <span className="text-xs mt-1 text-gray-500">DIAS</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 text-xl font-bold text-gray-800 rounded px-4 py-2 w-14 text-center">
            {formatNumber(timeLeft.hours)}
          </div>
          <span className="text-xs mt-1 text-gray-500">HORAS</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 text-xl font-bold text-gray-800 rounded px-4 py-2 w-14 text-center">
            {formatNumber(timeLeft.minutes)}
          </div>
          <span className="text-xs mt-1 text-gray-500">MINUTOS</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 text-xl font-bold text-gray-800 rounded px-4 py-2 w-14 text-center">
            {formatNumber(timeLeft.seconds)}
          </div>
          <span className="text-xs mt-1 text-gray-500">SEGUNDOS</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
