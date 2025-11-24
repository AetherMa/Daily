import { useMemo } from 'react';
import anniversaries from '../constants/anniversaries.js';
import useLocalStorage from './useLocalStorage.js';
import { getMonthDayParts, getNextAnniversary } from '../utils/dateUtils.js';

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const seedMemories = anniversaries.map((item, index) => ({
  id: `seed-${index}-${item.date}`,
  date: item.date,
  title: item.title,
  note: item.note ?? item.description ?? ''
}));

const normalizeMemory = (memory) => ({
  id: memory.id ?? createId(),
  date: memory.date ?? '',
  title: memory.title ?? '',
  note: memory.note ?? memory.description ?? ''
});

const getSortWeight = (date) => {
  const parts = getMonthDayParts(date);
  if (!parts) return Number.MAX_SAFE_INTEGER;
  return parts.month * 100 + parts.day;
};

const sortMemories = (list = []) =>
  list
    .map((memory) => normalizeMemory(memory))
    .sort((a, b) => {
      const diff = getSortWeight(a.date) - getSortWeight(b.date);
      if (diff !== 0) return diff;
      return (a.title || '').localeCompare(b.title || '', 'zh-CN');
    });

export default function useMemories() {
  const [memories, setMemories] = useLocalStorage('daily_memories', seedMemories);

  const sortedMemories = useMemo(() => sortMemories(memories), [memories]);

  const addMemory = (payload) => {
    setMemories((prev) => sortMemories([...(prev || []), normalizeMemory(payload)]));
  };

  const updateMemory = (id, updates) => {
    setMemories((prev) =>
      sortMemories((prev || []).map((item) => (item.id === id ? { ...item, ...updates } : item)))
    );
  };

const deleteMemory = (id) => {
    setMemories((prev) => sortMemories((prev || []).filter((item) => item.id !== id)));
  };

  const nextMemory = useMemo(() => getNextAnniversary(sortedMemories), [sortedMemories]);

  return { memories: sortedMemories, addMemory, updateMemory, deleteMemory, nextMemory };
}
