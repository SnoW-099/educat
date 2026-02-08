import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle } from "lucide-react";

interface ExerciseTimerProps {
  timeLimit: number; // en minutos
  onTimeUp: () => void;
  isActive: boolean;
}

export const ExerciseTimer = ({ timeLimit, onTimeUp, isActive }: ExerciseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // convertir a segundos
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        
        // Activar warning en los últimos 2 minutos
        if (prev <= 120) {
          setIsWarning(true);
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isActive) return null;

  return (
    <Badge 
      variant={isWarning ? "destructive" : "outline"} 
      className="flex items-center gap-2 font-mono"
    >
      {isWarning ? <AlertTriangle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
      {formatTime(timeLeft)}
    </Badge>
  );
};