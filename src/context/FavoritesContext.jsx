import React, { createContext, useContext, useState, useEffect } from 'react';
import { PLAYERS } from '../data/players';
import confetti from 'canvas-confetti';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('pitchpulse_favorites');
      return saved ? JSON.parse(saved) : ['lionel-messi', 'cristiano-ronaldo', 'zinedine-zidane'];
    } catch {
      return ['lionel-messi', 'cristiano-ronaldo'];
    }
  });

  const [squad, setSquad] = useState(() => {
    try {
      const saved = localStorage.getItem('pitchpulse_squad');
      return saved ? JSON.parse(saved) : {
        GK: 'gianluigi-buffon',
        LB: 'paolo-maldini',
        CB1: 'virgil-van-dijk',
        CB2: 'paolo-maldini',
        RB: 'jude-bellingham',
        CM1: 'andres-iniesta',
        CAM: 'diego-maradona',
        CM2: 'zinedine-zidane',
        LW: 'ronaldinho',
        ST: 'cristiano-ronaldo',
        RW: 'lionel-messi',
      };
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pitchpulse_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('pitchpulse_squad', JSON.stringify(squad));
    } catch (e) {
      console.error(e);
    }
  }, [squad]);

  const toggleFavorite = (playerId) => {
    setFavorites((prev) => {
      const exists = prev.includes(playerId);
      if (exists) {
        return prev.filter((id) => id !== playerId);
      } else {
        return [...prev, playerId];
      }
    });
  };

  const isFavorite = (playerId) => favorites.includes(playerId);

  const assignPlayerToSquad = (slotId, playerId) => {
    setSquad((prev) => {
      const updated = { ...prev, [slotId]: playerId };
      
      // If squad has reached 11 players, fire confetti!
      const filledCount = Object.keys(updated).length;
      if (filledCount === 11) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
      return updated;
    });
  };

  const removePlayerFromSquad = (slotId) => {
    setSquad((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  const clearSquad = () => {
    setSquad({});
  };

  const autoFillSquad = () => {
    const defaultFormation = {
      GK: 'gianluigi-buffon',
      LB: 'paolo-maldini',
      CB1: 'virgil-van-dijk',
      CB2: 'paolo-maldini',
      RB: 'jude-bellingham',
      CM1: 'andres-iniesta',
      CAM: 'diego-maradona',
      CM2: 'zinedine-zidane',
      LW: 'ronaldinho',
      ST: 'cristiano-ronaldo',
      RW: 'lionel-messi',
    };
    setSquad(defaultFormation);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        squad,
        assignPlayerToSquad,
        removePlayerFromSquad,
        clearSquad,
        autoFillSquad,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
