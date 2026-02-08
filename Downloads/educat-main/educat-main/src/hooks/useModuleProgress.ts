
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export type ModuleStatus = 'locked' | 'unlocked' | 'in_progress' | 'completed';

export interface ModuleProgress {
    progress: number; // 0 to 100
    status: ModuleStatus;
    lastIndex: number;
}

export interface UserProgress {
    [moduleId: string]: ModuleProgress;
}

export const useModuleProgress = () => {
    const { profile } = useAuth();
    const userId = profile?.id || 'guest';
    const storageKey = `module_progress_${userId}`;

    const [progressData, setProgressData] = useState<UserProgress>({});

    // Load progress from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                try {
                    setProgressData(JSON.parse(saved));
                } catch (e) {
                    console.error("Error parsing module progress", e);
                }
            }
        }
    }, [storageKey]);

    const updateProgress = (moduleId: string, progress: number, status: ModuleStatus, lastIndex: number = 0) => {
        setProgressData(prev => {
            const newProgress = {
                ...prev,
                [moduleId]: {
                    progress,
                    status,
                    lastIndex
                }
            };

            // Save to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem(storageKey, JSON.stringify(newProgress));
            }

            return newProgress;
        });
    };

    const getModuleProgress = (moduleId: string): ModuleProgress => {
        return progressData[moduleId] || { progress: 0, status: 'locked', lastIndex: 0 }; // Default
    };

    return {
        progressData,
        updateProgress,
        getModuleProgress
    };
};
