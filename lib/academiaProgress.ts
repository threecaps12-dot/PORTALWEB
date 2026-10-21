"use client";

import { useCallback, useEffect, useState } from "react";

// Demo: el progreso y la "sesión" viven en el navegador. En la versión
// real se guardan en Supabase (lesson_progress) con el usuario autenticado.
const PROGRESS_KEY = "three-caps-academia-progress";
const SESSION_KEY = "three-caps-academia-session";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

/** Lecciones completadas por curso: { [courseSlug]: lessonId[] } */
export function useProgress() {
  const [done, setDone] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setDone(read(PROGRESS_KEY, {}));
  }, []);

  const toggle = useCallback((course: string, lesson: string) => {
    setDone((prev) => {
      const list = prev[course] ?? [];
      const next = {
        ...prev,
        [course]: list.includes(lesson) ? list.filter((l) => l !== lesson) : [...list, lesson],
      };
      write(PROGRESS_KEY, next);
      return next;
    });
  }, []);

  return { done, toggle };
}

export function useDemoSession() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setLoggedIn(read(SESSION_KEY, false));
  }, []);

  const login = useCallback(() => {
    write(SESSION_KEY, true);
    setLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    write(SESSION_KEY, false);
    setLoggedIn(false);
  }, []);

  return { loggedIn, login, logout };
}
