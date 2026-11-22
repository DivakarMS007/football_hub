import React from 'react';
import { Link } from 'react-router-dom';
import { PLAYERS } from '../data/players';
import PlayerCard from '../components/PlayerCard';
import { useFavorites } from '../context/FavoritesContext';
import { Bookmark, Trash2, ArrowRight, Users, Sparkles } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  const favoritePlayers = PLAYERS.filter((p) => favorites.includes(p.id));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Bookmark className="w-4 h-4" />
            <span>Personal Shortlist</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Saved Favorite Players
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Keep track of your top football icons, compare their numbers, or slot them into your Dream XI.
          </p>
        </div>

        {favoritePlayers.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              <strong className="text-white">{favoritePlayers.length}</strong> players shortlisted
            </span>
            <Link
              to="/compare"
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition"
            >
              Compare Shortlist
            </Link>
          </div>
        )}
      </div>

      {favoritePlayers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritePlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 space-y-4">
          <div className="text-5xl">⭐</div>
          <h3 className="text-xl font-black text-white">Your Shortlist is Empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Click the heart icon on any player card across the catalog to save them to your personal favorites list.
          </p>
          <div className="pt-2">
            <Link
              to="/players"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition"
            >
              <Users className="w-4 h-4" />
              <span>Browse All Players</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
