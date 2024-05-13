// useSuggestions.tsx
import { useState, useEffect } from "react";
import { useDebounce } from "react-use";

export function useSuggestions(initialQuery = "", fetchFunction: (query: string) => Promise<any[]>) {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, cancel] = useDebounce(setQuery, 300);

  const fetchSuggestions = async () => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchFunction(query);
      setSuggestions(response ?? []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cancel(); // Clear any pending debounced calls
    fetchSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    setIsLoading,
    fetchSuggestions,
  };
}
