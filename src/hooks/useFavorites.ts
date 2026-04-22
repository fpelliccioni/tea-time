import { useCallback, useEffect, useState } from "react";
import {
  FAVORITES_EVENT,
  getFavorites,
  toggleFavorite as toggleInStorage,
} from "../lib/storage";

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>(() => getFavorites());

  useEffect(() => {
    const sync = () => setFavs(getFavorites());
    window.addEventListener(FAVORITES_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(FAVORITES_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    toggleInStorage(id);
  }, []);

  const isFav = useCallback((id: string) => favs.includes(id), [favs]);

  return { favs, toggle, isFav };
}
