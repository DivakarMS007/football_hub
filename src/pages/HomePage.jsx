import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PLAYERS } from '../data/players';
import PlayerCard from '../components/PlayerCard';
import { Trophy, Flame, Sparkles, Shield, ArrowRight, Star, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const [selectedEra, setSelectedEra] = useState('all');

  const spotlightPlayer = PLAYERS.find((p) => p.id === 'lionel-messi') || PLAYERS[0];
  const topScorers = [...PLAYERS].sort((a, b) => b.stats.goals - a.stats.goals).slice(0, 5);
  const ballonDorLeaders = [...PLAYERS].filter((p) => p.stats.ballonDors > 0).sort((a, b) => b.stats.ballonDors - a.stats.ballonDors);

  const filteredShowcase = PLAYERS.filter((p) => {
    if (selectedEra === 'all') return true;
    return p.era === selectedEra;
  }).slice(0, 6);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900/80 via-slate-950/60 to-slate-950 px-6 sm:px-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REACT SINGLE PAGE APPLICATION • CLIENT-SIDE ROUTING</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            The Ultimate Arena for <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Football Icons &amp; Legends
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Deep dive into comprehensive stats, head-to-head comparisons, tactical attributes, and craft your historic Dream XI squad with seamless instant client routing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/players"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-sm hover:brightness-110 shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-transform hover:-translate-y-0.5"
            >
              <Users className="w-4 h-4" />
              <span>Explore All {PLAYERS.length} Players</span>
            </Link>
            <Link
              to="/compare"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm flex items-center gap-2 transition"
            >
              <span>Head-to-Head Clash</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/squad"
              className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-emerald-400 font-bold text-sm flex items-center gap-2 transition"
            >
              <Shield className="w-4 h-4" />
              <span>Assemble Dream XI</span>
            </Link>
          </div>

          {/* Key Quick Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 max-w-3xl mx-auto">
            <div className="text-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <span className="text-2xl sm:text-3xl font-black text-white block">5,000+</span>
              <span className="text-xs text-slate-400 font-semibold">Total Career Goals</span>
            </div>
            <div className="text-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 block">15</span>
              <span className="text-xs text-slate-400 font-semibold">Ballon d'Ors Featured</span>
            </div>
            <div className="text-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">400+</span>
              <span className="text-xs text-slate-400 font-semibold">Trophies Combined</span>
            </div>
            <div className="text-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <span className="text-2xl sm:text-3xl font-black text-teal-400 block">100%</span>
              <span className="text-xs text-slate-400 font-semibold">Client-Side Routing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight Player of the Day Banner */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/90 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
          <div className="relative w-full lg:w-1/3 max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/30">
            <img
              src={spotlightPlayer.image}
              alt={spotlightPlayer.name}
              className="w-full h-80 object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Featured Icon</span>
                <h3 className="text-xl font-black text-white">{spotlightPlayer.name}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-amber-400 flex flex-col items-center justify-center">
                <span className="text-lg font-black text-amber-300">{spotlightPlayer.overallRating}</span>
                <span className="text-[8px] font-bold text-slate-400">OVR</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" /> Spotlight Player
              </span>
              <span className="text-xs text-slate-400">{spotlightPlayer.flagEmoji} {spotlightPlayer.nationality} • {spotlightPlayer.club}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {spotlightPlayer.name} — <span className="text-slate-400 font-normal italic">"{spotlightPlayer.nickname}"</span>
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              {spotlightPlayer.biography}
            </p>

            <blockquote className="border-l-2 border-emerald-500 pl-4 py-1 text-xs italic text-slate-400">
              "{spotlightPlayer.quote}"
            </blockquote>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Career Goals</span>
                <span className="text-xl font-black text-white">{spotlightPlayer.stats.goals}</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Career Assists</span>
                <span className="text-xl font-black text-white">{spotlightPlayer.stats.assists}</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Ballon d'Ors</span>
                <span className="text-xl font-black text-amber-400">{spotlightPlayer.stats.ballonDors} 🏆</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Trophies</span>
                <span className="text-xl font-black text-emerald-400">{spotlightPlayer.stats.trophies}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Link
                to={`/player/${spotlightPlayer.id}`}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition"
              >
                <span>Full Career Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={`/compare?p1=lionel-messi&p2=cristiano-ronaldo`}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
              >
                Compare Messi vs Ronaldo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Showcase with Era Tabs */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <Flame className="w-6 h-6 text-emerald-400" />
              <span>Player Showcase</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select between current superstars dominating world football and historic legends.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setSelectedEra('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedEra === 'all'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Stars
            </button>
            <button
              onClick={() => setSelectedEra('current')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedEra === 'current'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Active Icons
            </button>
            <button
              onClick={() => setSelectedEra('legend')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedEra === 'legend'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All-Time Legends
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShowcase.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/players"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs transition"
          >
            <span>View All {PLAYERS.length} Football Stars</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Leaderboards Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top All-Time Scorers */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>All-Time Goal Machines</span>
            </h3>
            <span className="text-xs text-slate-400">Goals Leaderboard</span>
          </div>

          <div className="space-y-3">
            {topScorers.map((player, idx) => (
              <Link
                key={player.id}
                to={`/player/${player.id}`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 transition group"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    idx === 0 ? 'bg-amber-400 text-slate-950' : idx === 1 ? 'bg-slate-300 text-slate-950' : idx === 2 ? 'bg-amber-700 text-white' : 'text-slate-500'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {player.name}
                    </h4>
                    <span className="text-xs text-slate-400">{player.flagEmoji} {player.club}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-emerald-400">{player.stats.goals}</span>
                  <span className="text-[10px] text-slate-400 block">in {player.stats.matches} games</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Ballon d'Or Royalty */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Ballon d'Or Royalty</span>
            </h3>
            <span className="text-xs text-slate-400">Most Wins</span>
          </div>

          <div className="space-y-3">
            {ballonDorLeaders.map((player, idx) => (
              <Link
                key={player.id}
                to={`/player/${player.id}`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 transition group"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    idx === 0 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-amber-400'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {player.name}
                    </h4>
                    <span className="text-xs text-slate-400">{player.flagEmoji} {player.position}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black text-amber-400">{player.stats.ballonDors}</span>
                  <span className="text-xs">🏆</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-2xl font-black text-white">Equipped for Deployment Anywhere</h3>
          <p className="text-xs text-slate-400">
            Engineered with modern React SPA architecture, client-side routing, and zero-config deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              ⚡
            </div>
            <h4 className="font-bold text-sm text-white">Client-Side Routing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fast, zero-reload navigation via React Router v6. Clean URLs, state preservation, and instant page transitions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              ▲
            </div>
            <h4 className="font-bold text-sm text-white">Vercel Configured</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Includes pre-configured <code className="text-emerald-400 font-mono text-[11px]">vercel.json</code> rewrite rules preventing 404 errors on direct URL refreshes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              🐙
            </div>
            <h4 className="font-bold text-sm text-white">GitHub Pages Ready</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Relative base paths in Vite and dual-router support make static publishing completely hassle-free.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
