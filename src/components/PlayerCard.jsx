import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trophy, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function PlayerCard({ player }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(player.id);

  return (
    <div className="group relative rounded-2xl glass-card overflow-hidden hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-950/40 transition-all duration-300 flex flex-col">
      {/* Top Banner & Badges */}
      <div className="relative h-48 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
        <img
          src={player.image}
          alt={player.name}
          className="w-full h-full object-cover object-top opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-transform duration-500"
          onError={(e) => {
            // Fallback image if unsplash link fails
            e.target.src = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(player.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            favorited
              ? 'bg-rose-500/90 text-white shadow-lg shadow-rose-500/40'
              : 'bg-slate-900/60 text-slate-300 hover:text-rose-400 hover:bg-slate-900/90'
          }`}
          title={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
        </button>

        {/* Era Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider uppercase backdrop-blur-md border ${
              player.era === 'legend'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}
          >
            {player.era === 'legend' ? '⭐ Legend' : '⚡ Modern Star'}
          </span>
        </div>

        {/* FIFA Style Rating Box */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 flex flex-col items-center justify-center shadow-lg">
            <span className="text-xl font-black text-white leading-none">
              {player.overallRating}
            </span>
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-tighter">
              OVR
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
              <span>{player.flagEmoji}</span>
              <span>{player.countryCode}</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400">{player.positionCode}</span>
            </span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>{player.clubLogo}</span> {player.club}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-extrabold text-base text-white group-hover:text-emerald-400 transition-colors">
                {player.name}
              </h3>
              {player.nickname && (
                <p className="text-xs text-slate-400 italic">"{player.nickname}"</p>
              )}
            </div>
            <span className="text-xs font-black text-slate-400 px-2 py-1 rounded bg-slate-800/80">
              #{player.jerseyNumber}
            </span>
          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-slate-800/80 text-center">
            <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Goals</span>
              <span className="text-sm font-extrabold text-white">{player.stats.goals}</span>
            </div>
            <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Assists</span>
              <span className="text-sm font-extrabold text-white">{player.stats.assists}</span>
            </div>
            <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Trophies</span>
              <span className="text-sm font-extrabold text-amber-400 flex items-center justify-center gap-0.5">
                <Trophy className="w-3 h-3" /> {player.stats.trophies}
              </span>
            </div>
          </div>

          {/* Attribute Snippet */}
          <div className="mt-3 grid grid-cols-6 gap-1 text-center font-mono text-[10px]">
            <div className="bg-slate-800/40 rounded py-1">
              <span className="text-slate-400 block text-[8px]">PAC</span>
              <span className="font-bold text-emerald-400">{player.attributes.pace}</span>
            </div>
            <div className="bg-slate-800/40 rounded py-1">
              <span className="text-slate-400 block text-[8px]">SHO</span>
              <span className="font-bold text-emerald-400">{player.attributes.shooting}</span>
            </div>
            <div className="bg-slate-800/40 rounded py-1">
              <span className="text-slate-400 block text-[8px]">PAS</span>
              <span className="font-bold text-emerald-400">{player.attributes.passing}</span>
            </div>
            <div className="bg-slate-800/40 rounded py-1">
              <span className="text-slate-400 block text-[8px]">DRI</span>
              <span className="font-bold text-emerald-400">{player.attributes.dribbling}</span>
            </div>
            <div className="bg-slate-800/40 rounded py-1">
              <span className="text-slate-400 block text-[8px]">DEF</span>
              <span className="font-bold text-emerald-400">{player.attributes.defending}</span>
            </div>
            <div className="bg-slate-800/40 rounded py-1">
              <span className="text-slate-400 block text-[8px]">PHY</span>
              <span className="font-bold text-emerald-400">{player.attributes.physical}</span>
            </div>
          </div>
        </div>

        {/* Action Link */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            to={`/player/${player.id}`}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-slate-950 font-bold text-xs text-center text-slate-200 transition-all flex items-center justify-center gap-1.5 group/btn"
          >
            <span>View Full Stats</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          <Link
            to={`/compare?p1=${player.id}`}
            className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
            title="Compare with another player"
          >
            VS
          </Link>
        </div>
      </div>
    </div>
  );
}
