import React, { useState } from 'react';
import { PLAYERS, FORMATIONS } from '../data/players';
import { useFavorites } from '../context/FavoritesContext';
import { Shield, Sparkles, Trash2, Wand2, Copy, Check, Plus, X, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SquadBuilderPage() {
  const { squad, assignPlayerToSquad, removePlayerFromSquad, clearSquad, autoFillSquad } = useFavorites();
  const [activeSlot, setActiveSlot] = useState(null); // position id being edited
  const [copied, setCopied] = useState(false);

  const formation = FORMATIONS[0]; // 4-3-3 Attack

  // Calculate squad stats
  const filledSlots = Object.keys(squad);
  const squadPlayers = filledSlots.map((slotId) => PLAYERS.find((p) => p.id === squad[slotId])).filter(Boolean);

  const avgRating = squadPlayers.length
    ? Math.round(squadPlayers.reduce((acc, p) => acc + p.overallRating, 0) / squadPlayers.length)
    : 0;

  const totalGoals = squadPlayers.reduce((acc, p) => acc + p.stats.goals, 0);
  const totalTrophies = squadPlayers.reduce((acc, p) => acc + p.stats.trophies, 0);

  const handleCopySquad = () => {
    const lines = [
      "⚽ PitchPulse Dream XI Lineup (4-3-3):",
      ...formation.positions.map((slot) => {
        const p = PLAYERS.find((pl) => pl.id === squad[slot.id]);
        return `• ${slot.label}: ${p ? `${p.name} (${p.overallRating} OVR)` : 'Empty'}`;
      }),
      `📊 Average Squad Rating: ${avgRating} OVR`,
      `🏆 Combined Trophies: ${totalTrophies}`,
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>Tactical Pitch Builder</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Dream XI Squad Builder
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Pick your all-time greatest 11 players in a 4-3-3 formation. Click any pitch position to assign.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={autoFillSquad}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold transition border border-slate-700"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Auto Fill Legends</span>
          </button>
          <button
            onClick={handleCopySquad}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold transition border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Lineup!' : 'Share Lineup'}</span>
          </button>
          <button
            onClick={clearSquad}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 text-xs font-bold transition border border-slate-800"
            title="Clear squad"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Squad Summary Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Squad Size</span>
            <span className="text-2xl font-black text-white">{filledSlots.length} / 11</span>
          </div>
          <span className="text-2xl">📋</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Average OVR</span>
            <span className="text-2xl font-black text-amber-300">{avgRating}</span>
          </div>
          <span className="text-2xl">⭐</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Combined Goals</span>
            <span className="text-2xl font-black text-emerald-400">{totalGoals}</span>
          </div>
          <span className="text-2xl">⚽</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Combined Trophies</span>
            <span className="text-2xl font-black text-teal-400">{totalTrophies}</span>
          </div>
          <span className="text-2xl">🏆</span>
        </div>
      </div>

      {/* Pitch & Selector Modal/Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: The Football Pitch View */}
        <div className="lg:col-span-8">
          <div className="relative rounded-3xl overflow-hidden border-4 border-slate-800 shadow-2xl pitch-bg aspect-[3/4] sm:aspect-[4/3] max-w-2xl mx-auto">
            {/* Pitch Markings (White lines) */}
            <div className="absolute inset-4 border-2 border-white/30 rounded-lg pointer-events-none">
              {/* Halfway line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30 -translate-y-1/2" />
              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full border-2 border-white/30 -translate-x-1/2 -translate-y-1/2" />
              {/* Center Spot */}
              <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white/40 -translate-x-1/2 -translate-y-1/2" />
              {/* Top Penalty Box (Opponent) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 border-b-2 border-x-2 border-white/30" />
              {/* Bottom Penalty Box (Home) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-20 border-t-2 border-x-2 border-white/30" />
            </div>

            {/* Position Markers on Pitch */}
            {formation.positions.map((slot) => {
              const playerId = squad[slot.id];
              const player = PLAYERS.find((p) => p.id === playerId);

              return (
                <div
                  key={slot.id}
                  style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
                  onClick={() => setActiveSlot(slot.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20 flex flex-col items-center"
                >
                  {player ? (
                    <div className="flex flex-col items-center">
                      <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden border-2 border-amber-400 bg-slate-950 shadow-lg group-hover:scale-110 transition-transform">
                        <img
                          src={player.image}
                          alt={player.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                        <div className="absolute bottom-0 right-0 bg-slate-950 text-[8px] font-black text-amber-300 px-1 rounded-tl">
                          {player.overallRating}
                        </div>
                      </div>
                      <span className="mt-1 px-2 py-0.5 rounded bg-slate-950/90 text-[10px] font-extrabold text-white whitespace-nowrap shadow-md border border-slate-800">
                        {player.name.split(' ').pop()}
                      </span>
                      <span className="text-[8px] font-bold text-emerald-400 uppercase">
                        {slot.label}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-dashed border-white/60 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center text-white/80 group-hover:border-emerald-400 group-hover:text-emerald-400 group-hover:scale-110 transition-all">
                        <Plus className="w-5 h-5" />
                      </div>
                      <span className="mt-1 px-1.5 py-0.5 rounded bg-slate-950/80 text-[10px] font-bold text-white/90">
                        {slot.label}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Slot Assignment / Player Picker */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-extrabold text-base text-white">
                {activeSlot ? `Assign ${activeSlot}` : 'Squad Roster'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {activeSlot ? 'Choose player for this slot' : 'Click a player slot to swap'}
              </p>
            </div>
            {activeSlot && (
              <button
                onClick={() => setActiveSlot(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {activeSlot ? (
            /* Player Picker for activeSlot */
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {PLAYERS.map((p) => {
                const isAssigned = Object.values(squad).includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      assignPlayerToSquad(activeSlot, p.id);
                      setActiveSlot(null);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                      squad[activeSlot] === p.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-white'
                        : isAssigned
                        ? 'bg-slate-900/30 border-slate-800/60 text-slate-500 hover:text-slate-300'
                        : 'bg-slate-900/70 border-slate-800 text-slate-200 hover:border-emerald-500/40 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{p.flagEmoji}</span>
                      <div>
                        <span className="text-xs font-bold block">{p.name}</span>
                        <span className="text-[10px] text-slate-400">{p.position} • {p.club}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-amber-300">{p.overallRating} OVR</span>
                      {isAssigned && squad[activeSlot] !== p.id && (
                        <span className="text-[9px] text-slate-500 block">In Squad</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* List of current squad positions */
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {formation.positions.map((slot) => {
                const player = PLAYERS.find((p) => p.id === squad[slot.id]);
                return (
                  <div
                    key={slot.id}
                    onClick={() => setActiveSlot(slot.id)}
                    className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 flex items-center justify-between cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-black text-xs text-emerald-400">
                        {slot.label}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-white block">
                          {player ? player.name : 'Unassigned'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {player ? `${player.flagEmoji} ${player.club}` : slot.role}
                        </span>
                      </div>
                    </div>

                    {player ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-amber-300">
                          {player.overallRating}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removePlayerFromSquad(slot.id);
                          }}
                          className="p-1 text-slate-500 hover:text-rose-400"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-emerald-400 font-bold">+ Pick</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
