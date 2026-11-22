import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PLAYERS } from '../data/players';
import { GitCompare, Trophy, ArrowRightLeft, Check, Sparkles, Star } from 'lucide-react';

export default function ComparePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const p1Param = searchParams.get('p1') || 'lionel-messi';
  const p2Param = searchParams.get('p2') || 'cristiano-ronaldo';

  const [p1Id, setP1Id] = useState(p1Param);
  const [p2Id, setP2Id] = useState(p2Param);

  useEffect(() => {
    setSearchParams({ p1: p1Id, p2: p2Id });
  }, [p1Id, p2Id, setSearchParams]);

  const p1 = PLAYERS.find((p) => p.id === p1Id) || PLAYERS[0];
  const p2 = PLAYERS.find((p) => p.id === p2Id) || PLAYERS[1];

  const swapPlayers = () => {
    setP1Id(p2Id);
    setP2Id(p1Id);
  };

  const presetClashes = [
    { label: 'Messi vs Ronaldo', id1: 'lionel-messi', id2: 'cristiano-ronaldo' },
    { label: 'Pelé vs Maradona', id1: 'pele', id2: 'diego-maradona' },
    { label: 'Mbappé vs Haaland', id1: 'kylian-mbappe', id2: 'erling-haaland' },
    { label: 'Zidane vs Modrić', id1: 'zinedine-zidane', id2: 'luka-modric' },
    { label: 'Maldini vs Van Dijk', id1: 'paolo-maldini', id2: 'virgil-van-dijk' },
  ];

  const compareStat = (val1, val2) => {
    if (val1 > val2) return { p1Wins: true, p2Wins: false };
    if (val2 > val1) return { p1Wins: false, p2Wins: true };
    return { p1Wins: false, p2Wins: false };
  };

  const metrics = [
    { label: 'Overall Rating', key1: p1.overallRating, key2: p2.overallRating },
    { label: 'Career Goals', key1: p1.stats.goals, key2: p2.stats.goals },
    { label: 'Career Assists', key1: p1.stats.assists, key2: p2.stats.assists },
    { label: 'Total Trophies', key1: p1.stats.trophies, key2: p2.stats.trophies },
    { label: "Ballon d'Ors", key1: p1.stats.ballonDors, key2: p2.stats.ballonDors },
    { label: 'World Cups', key1: p1.stats.worldCups, key2: p2.stats.worldCups },
    { label: 'Champions Leagues', key1: p1.stats.championsLeagues, key2: p2.stats.championsLeagues },
  ];

  const attributeList = [
    { label: 'Pace (PAC)', val1: p1.attributes.pace, val2: p2.attributes.pace },
    { label: 'Shooting (SHO)', val1: p1.attributes.shooting, val2: p2.attributes.shooting },
    { label: 'Passing (PAS)', val1: p1.attributes.passing, val2: p2.attributes.passing },
    { label: 'Dribbling (DRI)', val1: p1.attributes.dribbling, val2: p2.attributes.dribbling },
    { label: 'Defending (DEF)', val1: p1.attributes.defending, val2: p2.attributes.defending },
    { label: 'Physical (PHY)', val1: p1.attributes.physical, val2: p2.attributes.physical },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wide">
          <GitCompare className="w-3.5 h-3.5" />
          <span>Head-to-Head Arena</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Compare Football Titans
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Analyze numbers, attributes, and honors head-to-head. Pick any two players from any era.
        </p>
      </div>

      {/* Preset Rivalry Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Rivalries:
        </span>
        {presetClashes.map((c) => (
          <button
            key={c.label}
            onClick={() => {
              setP1Id(c.id1);
              setP2Id(c.id2);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
              p1Id === c.id1 && p2Id === c.id2
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-sm'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Selector and Player Hero Cards */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        
        {/* Player 1 Card */}
        <div className="md:col-span-5 glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
            Player 1
          </label>
          <select
            value={p1Id}
            onChange={(e) => setP1Id(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
          >
            {PLAYERS.map((p) => (
              <option key={p.id} value={p.id} disabled={p.id === p2Id}>
                {p.name} ({p.countryCode} • {p.overallRating} OVR)
              </option>
            ))}
          </select>

          <div className="flex items-center gap-4 pt-2">
            <img
              src={p1.image}
              alt={p1.name}
              className="w-20 h-24 rounded-2xl object-cover object-top border-2 border-emerald-500/50"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="space-y-1">
              <span className="text-xs text-slate-400">{p1.flagEmoji} {p1.nationality} • {p1.position}</span>
              <h3 className="text-xl font-black text-white">{p1.name}</h3>
              <p className="text-xs text-emerald-400 font-semibold">{p1.clubLogo} {p1.club}</p>
              <Link to={`/player/${p1.id}`} className="text-[11px] text-slate-400 hover:text-white underline block pt-1">
                View Full Profile →
              </Link>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center py-2 md:py-0">
          <button
            onClick={swapPlayers}
            className="p-3 rounded-full bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 border border-slate-700 transition shadow-lg"
            title="Swap sides"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Player 2 Card */}
        <div className="md:col-span-5 glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
            Player 2
          </label>
          <select
            value={p2Id}
            onChange={(e) => setP2Id(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
          >
            {PLAYERS.map((p) => (
              <option key={p.id} value={p.id} disabled={p.id === p1Id}>
                {p.name} ({p.countryCode} • {p.overallRating} OVR)
              </option>
            ))}
          </select>

          <div className="flex items-center gap-4 pt-2">
            <img
              src={p2.image}
              alt={p2.name}
              className="w-20 h-24 rounded-2xl object-cover object-top border-2 border-teal-500/50"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="space-y-1">
              <span className="text-xs text-slate-400">{p2.flagEmoji} {p2.nationality} • {p2.position}</span>
              <h3 className="text-xl font-black text-white">{p2.name}</h3>
              <p className="text-xs text-teal-400 font-semibold">{p2.clubLogo} {p2.club}</p>
              <Link to={`/player/${p2.id}`} className="text-[11px] text-slate-400 hover:text-white underline block pt-1">
                View Full Profile →
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Head-to-Head Core Metrics Battle */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="font-extrabold text-lg text-white flex items-center justify-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span>Career Milestone Comparison</span>
        </h3>

        <div className="space-y-3 max-w-3xl mx-auto">
          {metrics.map((m) => {
            const { p1Wins, p2Wins } = compareStat(m.key1, m.key2);
            return (
              <div
                key={m.label}
                className="grid grid-cols-11 items-center p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center"
              >
                {/* P1 Score */}
                <div className={`col-span-4 text-left pl-3 flex items-center gap-1.5 ${
                  p1Wins ? 'font-black text-emerald-400' : 'text-slate-300 font-semibold'
                }`}>
                  <span className="text-base sm:text-lg">{m.key1}</span>
                  {p1Wins && <span className="text-xs bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">WIN</span>}
                </div>

                {/* Metric Label */}
                <div className="col-span-3 text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                  {m.label}
                </div>

                {/* P2 Score */}
                <div className={`col-span-4 text-right pr-3 flex items-center justify-end gap-1.5 ${
                  p2Wins ? 'font-black text-emerald-400' : 'text-slate-300 font-semibold'
                }`}>
                  {p2Wins && <span className="text-xs bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">WIN</span>}
                  <span className="text-base sm:text-lg">{m.key2}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attribute Tug-of-War Battle */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="text-center space-y-1">
          <h3 className="font-extrabold text-lg text-white flex items-center justify-center gap-2">
            <Star className="w-5 h-5 text-emerald-400" />
            <span>FIFA Attribute Comparison</span>
          </h3>
          <p className="text-xs text-slate-400">Pace, Shooting, Passing, Dribbling, Defending, Physical</p>
        </div>

        <div className="space-y-5 max-w-3xl mx-auto">
          {attributeList.map((attr) => {
            const { p1Wins, p2Wins } = compareStat(attr.val1, attr.val2);
            return (
              <div key={attr.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className={p1Wins ? 'text-emerald-400 font-extrabold' : 'text-slate-400'}>
                    {attr.val1} {p1.name.split(' ').pop()}
                  </span>
                  <span className="text-slate-200 uppercase tracking-wider">{attr.label}</span>
                  <span className={p2Wins ? 'text-teal-400 font-extrabold' : 'text-slate-400'}>
                    {p2.name.split(' ').pop()} {attr.val2}
                  </span>
                </div>

                {/* Dual Progress Bar */}
                <div className="grid grid-cols-2 gap-1 h-3 rounded-full overflow-hidden bg-slate-900 border border-slate-800">
                  {/* Left (P1) bar going right to left */}
                  <div className="flex justify-end bg-slate-900">
                    <div
                      className={`h-full rounded-l-full transition-all duration-500 ${
                        p1Wins ? 'bg-emerald-500' : 'bg-slate-700'
                      }`}
                      style={{ width: `${Math.min(attr.val1, 100)}%` }}
                    />
                  </div>
                  {/* Right (P2) bar going left to right */}
                  <div className="flex justify-start bg-slate-900">
                    <div
                      className={`h-full rounded-r-full transition-all duration-500 ${
                        p2Wins ? 'bg-teal-500' : 'bg-slate-700'
                      }`}
                      style={{ width: `${Math.min(attr.val2, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
