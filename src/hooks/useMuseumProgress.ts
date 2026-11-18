import { useState, useEffect, useCallback } from 'react';

export interface StoryProgressEntry {
  lastSceneIndex: number;
  completed: boolean;
  quizScore?: number;
  updatedAt: string;
}

interface MuseumStorageState {
  bookmarks: string[];
  progress: Record<string, StoryProgressEntry>;
}

const STORAGE_KEY = 'athar_al_muslimeen_progress_v1';

const DEFAULT_STATE: MuseumStorageState = {
  bookmarks: [],
  progress: {},
};

export function useMuseumProgress() {
  const [state, setState] = useState<MuseumStorageState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_STATE;
      const parsed = JSON.parse(raw) as Partial<MuseumStorageState>;
      return {
        bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
        progress: parsed.progress && typeof parsed.progress === 'object' ? parsed.progress : {},
      };
    } catch {
      return DEFAULT_STATE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [state]);

  const toggleBookmark = useCallback((storyId: string) => {
    setState((prev) => {
      const exists = prev.bookmarks.includes(storyId);
      return {
        ...prev,
        bookmarks: exists
          ? prev.bookmarks.filter((id) => id !== storyId)
          : [...prev.bookmarks, storyId],
      };
    });
  }, []);

  const isBookmarked = useCallback(
    (storyId: string) => state.bookmarks.includes(storyId),
    [state.bookmarks]
  );

  const updateStoryProgress = useCallback(
    (storyId: string, sceneIndex: number, totalScenes: number, quizScore?: number) => {
      setState((prev) => {
        const existing = prev.progress[storyId];
        const completed = existing?.completed || sceneIndex >= totalScenes - 1;
        return {
          ...prev,
          progress: {
            ...prev.progress,
            [storyId]: {
              lastSceneIndex: sceneIndex,
              completed,
              quizScore: quizScore !== undefined ? quizScore : existing?.quizScore,
              updatedAt: new Date().toISOString(),
            },
          },
        };
      });
    },
    []
  );

  return {
    bookmarks: state.bookmarks,
    progress: state.progress,
    toggleBookmark,
    isBookmarked,
    updateStoryProgress,
  };
}
