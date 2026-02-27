import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useEasterEgg = (userRole: string) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [multipleAnswers, setMultipleAnswers] = useState<string[]>([]);
  const { toast } = useToast();

  // Generate multiple valid answers to prevent students from using the same response
  const generateAlternativeAnswers = (originalAnswer: string): string[] => {
    const alternatives = [];
    const base = originalAnswer.toLowerCase().trim();

    // Add the original answer
    alternatives.push(originalAnswer);

    // Generate variations to prevent copy-paste
    if (base.includes('és')) {
      alternatives.push(base.replace('és', 'esta'));
    }
    if (base.includes('el ')) {
      alternatives.push(base.replace('el ', 'un '));
    }
    if (base.includes('la ')) {
      alternatives.push(base.replace('la ', 'una '));
    }
    if (base.includes('casa')) {
      alternatives.push(base.replace('casa', 'llar'));
    }
    if (base.includes('gat')) {
      alternatives.push(base.replace('gat', 'felí'));
    }
    if (base.includes('dorm')) {
      alternatives.push(base.replace('dorm', 'descansa'));
    }

    // Add some synonym variations
    const synonyms: Record<string, string[]> = {
      'gran': ['gros', 'ampli', 'vast'],
      'petit': ['menú', 'reduït', 'minúscul'],
      'bon': ['excel·lent', 'fantàstic', 'perfecte'],
      'malalt': ['indisposat', 'dolent', 'pacient'],
      'content': ['feliç', 'alegre', 'satisfet'],
      'trist': ['melancòlic', 'deprimit', 'abatut']
    };

    Object.entries(synonyms).forEach(([word, syns]) => {
      if (base.includes(word)) {
        syns.forEach(syn => {
          alternatives.push(base.replace(word, syn));
        });
      }
    });

    // Remove duplicates and limit to 5 alternatives
    return [...new Set(alternatives)].slice(0, 5);
  };

  useEffect(() => {
    if (userRole !== 'student') return;

    const toggleSnowDevIndicator = (active: boolean) => {
      const indicatorId = 'snowdev-indicator';
      const existingIndicator = document.getElementById(indicatorId);

      if (active) {
        if (!existingIndicator) {
          const indicator = document.createElement('div');
          indicator.id = indicatorId;
          indicator.innerHTML = '❄️';
          indicator.style.position = 'fixed';
          indicator.style.top = '10px';
          indicator.style.left = '50%';
          indicator.style.transform = 'translateX(-50%)';
          indicator.style.zIndex = '9999';
          indicator.style.fontSize = '2rem';
          indicator.style.pointerEvents = 'none';
          document.body.appendChild(indicator);
        }
      } else {
        existingIndicator?.remove();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // SnowDev Mode: Ctrl + Shift + K
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const newState = !showAnswers;
        setShowAnswers(newState);

        if (newState) {
          setMultipleAnswers([]);
        }

        toggleSnowDevIndicator(newState);
      }
      // Student Mode: Ctrl + K (backwards compatibility)
      else if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const newState = !showAnswers;
        setShowAnswers(newState);

        if (newState) {
          setMultipleAnswers([]);
        }

        toggleSnowDevIndicator(newState);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Cleanup indicator on unmount if needed, but since we want it persistent per session logic, 
      // we might let it be managed by the active hook. 
      // However, to prevent ghosting if the component unmounts while active, we SHOULD NOT remove it blindly 
      // because other components might rely on the same "global" state mentally.
      // BUT structurally, the state is local. If this component unmounts, 'showAnswers' is lost for THIS component.
      // So ensuring the UI reflects the component's state is tricky if multiple exist.
      // For now, let's keep it simple: manual toggle.
    };
  }, [userRole, showAnswers]);

  return {
    showAnswers: userRole === 'student' ? showAnswers : false,
    multipleAnswers,
    generateAlternativeAnswers,
    resetEasterEgg: () => {
      setShowAnswers(false);
      setMultipleAnswers([]);
    }
  };
};