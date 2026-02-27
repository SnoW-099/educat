import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Volume2,
  VolumeX,
  Gauge
} from 'lucide-react';

interface AdvancedDictationControlsProps {
  text: string;
  onPlaybackComplete?: () => void;
  className?: string;
}

export const AdvancedDictationControls = ({
  text,
  onPlaybackComplete,
  className = ''
}: AdvancedDictationControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(0.8);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const estimateDuration = (text: string, rate: number) => {
    // Rough estimation: average 150 words per minute at normal rate
    const words = text.split(' ').length;
    const baseWPM = 120; // Slower for dictation
    const adjustedWPM = baseWPM * rate;
    return (words / adjustedWPM) * 60; // Convert to seconds
  };

  const play = () => {
    if (!('speechSynthesis' in window)) {
      console.error('Speech synthesis not supported');
      return;
    }

    // Cancel any existing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ca-ES';
    utterance.rate = playbackRate;
    utterance.volume = isMuted ? 0 : volume / 100;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      const estimatedDuration = estimateDuration(text, playbackRate);
      setDuration(estimatedDuration);

      // Start progress tracking
      intervalRef.current = setInterval(() => {
        setCurrentPosition(prev => {
          const newPosition = prev + 0.1;
          if (newPosition >= estimatedDuration) {
            clearInterval(intervalRef.current!);
            return estimatedDuration;
          }
          return newPosition;
        });
      }, 100);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentPosition(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      onPlaybackComplete?.();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentPosition(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const resume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);

      // Resume progress tracking
      intervalRef.current = setInterval(() => {
        setCurrentPosition(prev => {
          const newPosition = prev + 0.1;
          if (newPosition >= duration) {
            clearInterval(intervalRef.current!);
            return duration;
          }
          return newPosition;
        });
      }, 100);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentPosition(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const restart = () => {
    stop();
    setTimeout(() => play(), 100);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (utteranceRef.current) {
      utteranceRef.current.volume = !isMuted ? 0 : volume / 100;
    }
  };

  const handlePlaybackRateChange = (value: number[]) => {
    const newRate = value[0];
    setPlaybackRate(newRate);

    // If currently playing, restart with new rate
    if (isPlaying && !isPaused) {
      restart();
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (utteranceRef.current && !isMuted) {
      utteranceRef.current.volume = newVolume / 100;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentPosition / duration) * 100 : 0;

  return (
    <div className={`space-y-4 p-4 border rounded-lg bg-gradient-surface ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm">Controls Avançats d'Àudio</h4>
        <Badge variant="outline" className="text-xs">
          Dictàt Catalán
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentPosition)}</span>
          <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={restart}
          disabled={!isPlaying && !isPaused && currentPosition === 0}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        {!isPlaying ? (
          <Button
            size="sm"
            onClick={isPaused ? resume : play}
            className="bg-accent hover:bg-accent/90"
          >
            <Play className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={pause}
          >
            <Pause className="h-4 w-4" />
          </Button>
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={stop}
          disabled={!isPlaying && !isPaused}
        >
          <Square className="h-4 w-4" />
        </Button>
      </div>

      {/* Advanced Controls */}
      <div className="grid grid-cols-2 gap-4 pt-2 border-t">
        {/* Playback Speed */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Gauge className="h-3 w-3" />
            <label className="text-xs font-medium">Velocitat: {playbackRate}x</label>
          </div>
          <Slider
            value={[playbackRate]}
            onValueChange={handlePlaybackRateChange}
            min={0.5}
            max={2.0}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0.5x</span>
            <span>2.0x</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleMute}
              className="p-0 h-auto"
            >
              {isMuted ? (
                <VolumeX className="h-3 w-3" />
              ) : (
                <Volume2 className="h-3 w-3" />
              )}
            </Button>
            <label className="text-xs font-medium">Volum: {isMuted ? 0 : volume}%</label>
          </div>
          <Slider
            value={[isMuted ? 0 : volume]}
            onValueChange={handleVolumeChange}
            min={0}
            max={100}
            step={5}
            disabled={isMuted}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Utilitza els controls per ajustar la velocitat i el volum segons les teves necessitats
      </p>
    </div>
  );
};