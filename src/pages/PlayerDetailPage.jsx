import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PLAYERS } from '../data/players';
import StatRadar from '../components/StatRadar';
import PlayerCard from '../components/PlayerCard';
import { useFavorites } from '../context/FavoritesContext';
import {
  Trophy,
  Heart,
  ArrowLeft,
  GitCompare,
  Medal,
  Calendar,
  Shield,
  Star,
  Quote,
  CheckCircle,
} from 'lucide-react';

export default function PlayerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const player = PLAYERS.find((p) => p.id === id);

  if (!player) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="text-5xl">⚽</div>
        <h2 className="text-2xl font-black text-white">Player Not Found</h2>
        <p className="text-sm text-slate-400">
          The player profile with ID "{id}" could not be located in the database.
        </p>
        <Link
          to="/players"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Players Directory
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(player.id);
  const relatedPlayers = PLAYERS.filter(
    (p) => p.id !== player.id && (p.position === player.position || p.era === player.era)
  ).slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center gap-3">
          <Link
            to={`/compare?p1=${player.id}`}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition"
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Compare H2H</span>
          </Link>
          <button
            onClick={() => toggleFavorite(player.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition ${
              favorited
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-rose-400'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{favorited ? 'Shortlisted' : 'Add to Shortlist'}</span>
          </button>
        </div>
      </div>

      {/* Hero Showcase Banner */}
      <div className="relative rounded-3xl glass-panel border border-slate-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="p-6 sm:p-10 flex flex-col lg:flex-row gap-8 items-center">
          {/* Player Photo Card */}
          <div className="relative w-full lg:w-72 max-w-xs shrink-0 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl bg-slate-900">
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-96 object-cover object-top"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

            {/* Overall Rating badge */}
            <div className="absolute top-4 left-4 w-14 h-14 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-amber-400 flex flex-col items-center justify-center shadow-lg">
              <span className="text-2xl font-black text-amber-300 leading-none">
                {player.overallRating}
              </span>
              <span className="text-[9px] font-extrabold text-slate-400">OVR</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                  Jersey Number
                </span>
                <span className="text-2xl font-black text-white">#{player.jerseyNumber}</span>
              </div>
              <span className="text-3xl">{player.flagEmoji}</span>
            </div>
          </div>

          {/* Player Info Summary */}
          <div className="flex-1 space-y-5">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    player.era === 'legend'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {player.era === 'legend' ? '⭐ Football Legend' : '⚡ Active Super Star'}
                </span>
                <span className="text-xs text-slate-400">
                  {player.flagEmoji} {player.nationality}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-emerald-400 font-bold">
                  {player.position} ({player.positionCode})
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {player.name}
              </h1>

              {player.nickname && (
                <p className="text-sm font-semibold text-slate-400 italic">
                  Known as "{player.nickname}"
                </p>
              )}
            </div>

            {/* Club Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span>{player.clubLogo}</span>
              <span className="font-bold text-white">{player.club}</span>
            </div>

            {/* Biography */}
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {player.biography}
            </p>

            {/* Quote */}
            {player.quote && (
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 max-w-2xl">
                <Quote className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs italic text-slate-300 leading-normal">
                  "{player.quote}"
                </p>
              </div>
            )}

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Matches</span>
                <span className="text-2xl font-black text-white">{player.stats.matches}</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Goals</span>
                <span className="text-2xl font-black text-emerald-400">{player.stats.goals}</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Assists</span>
                <span className="text-2xl font-black text-teal-400">{player.stats.assists}</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Trophies</span>
                <span className="text-2xl font-black text-amber-400 flex items-center gap-1">
                  <Trophy className="w-5 h-5" /> {player.stats.trophies}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats and Attributes Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Attributes Radar Breakdown */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-emerald-400" />
              <span>FIFA Ratings &amp; Attributes</span>
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {player.overallRating} OVR
            </span>
          </div>

          <StatRadar attributes={player.attributes} />

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
            <span className="font-bold text-slate-200 block">Tactical Profile</span>
            <p>
              Excels as a {player.positionCode} with world-class {player.attributes.dribbling >= 90 ? 'dribbling & vision' : player.attributes.defending >= 85 ? 'defensive structure & leadership' : 'finishing and game IQ'}.
            </p>
          </div>
        </div>

        {/* Right: Career Highlights & Clubs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Highlights */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Medal className="w-4 h-4 text-amber-400" />
              <span>Iconic Milestones &amp; Records</span>
            </h3>
            <ul className="space-y-2.5">
              {player.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Club Career Timeline */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Club Career Breakdown</span>
            </h3>
            <div className="space-y-3">
              {player.clubs.map((club, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80"
                >
                  <div>
                    <h4 className="font-bold text-sm text-white">{club.name}</h4>
                    <span className="text-xs text-slate-400">{club.period}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400 block">
                      {club.goals} Goals
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {club.appearances} Appearances
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Major Trophies Cabinet */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Major Trophies Showcase</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xl">🏆</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold block mt-1">World Cup</span>
                <span className="text-sm font-black text-amber-400">{player.stats.worldCups}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xl">⭐</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold block mt-1">UCL Titles</span>
                <span className="text-sm font-black text-amber-400">{player.stats.championsLeagues}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xl">🥇</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold block mt-1">Ballon d'Or</span>
                <span className="text-sm font-black text-amber-400">{player.stats.ballonDors}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xl">👟</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold block mt-1">Golden Boots</span>
                <span className="text-sm font-black text-amber-400">{player.stats.goldenBoots}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Related Players */}
      {relatedPlayers.length > 0 && (
        <div className="pt-6 border-t border-slate-800/80 space-y-6">
          <div>
            <h3 className="text-xl font-black text-white">Similar &amp; Contemporary Icons</h3>
            <p className="text-xs text-slate-400 mt-0.5">Explore players in related positions or eras.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPlayers.map((p) => (
              <PlayerCard key={p.id} player={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
