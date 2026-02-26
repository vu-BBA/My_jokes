import { useState, useCallback } from 'react';
import api, { ApiError } from '../services/api';

export function useJokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const fetchJokes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.jokes.getAll();
      setJokes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'جوکس لائن کرنے میں خرابی ہوئی');
      setJokes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createJoke = useCallback(async (jokeData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await api.jokes.create(jokeData);
      setSuccess('🎉 جوک کامیابی سے شامل ہو گیا!');
      setJokes((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err.message || 'جوک شامل کرنے میں خرابی ہوئی');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateJoke = useCallback(async (id, jokeData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await api.jokes.update(id, jokeData);
      setSuccess('🎉 جوک کامیابی سے اپڈیٹ ہو گیا!');
      setJokes((prev) => prev.map((j) => (j.id === id || j._id === id ? data : j)));
      return data;
    } catch (err) {
      setError(err.message || 'جوک اپڈیٹ کرنے میں خرابی ہوئی');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteJoke = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await api.jokes.delete(id);
      setSuccess('🎉 جوک کامیابی سے حذف ہو گیا!');
      setJokes((prev) => prev.filter((j) => j.id !== id && j._id !== id));
    } catch (err) {
      setError(err.message || 'جوک حذف کرنے میں خرابی ہوئی');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    jokes,
    loading,
    error,
    success,
    clearMessages,
    fetchJokes,
    createJoke,
    updateJoke,
    deleteJoke,
  };
}

export function useRandomJoke() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomJoke = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.jokes.getRandom();
      setJoke(data);
    } catch (err) {
      setError(err.message || 'رینڈم جوک لائن کرنے میں خرابی ہوئی');
      setJoke(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearJoke = useCallback(() => {
    setJoke(null);
    setError(null);
  }, []);

  return {
    joke,
    loading,
    error,
    fetchRandomJoke,
    clearJoke,
  };
}

export function useJoke(id) {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.jokes.getById(id);
      setJoke(data);
    } catch (err) {
      setError(err.message || 'جوک لائن کرنے میں خرابی ہوئی');
      setJoke(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  return {
    joke,
    loading,
    error,
    fetchJoke,
  };
}
