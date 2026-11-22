import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PLAYERS } from '../data/players';
import PlayerCard from '../components/PlayerCard';
import { Search, Filter, SlidersHorizontal, RotateCcw, Users, Trophy } from 'lucide-react';

export default function PlayersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [positionFilter, setPositionFilter] = useState('all');
  const [eraFilter, setEraFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'goals' | 'assists' | 'trophies' | 'ballonDors'

  // Sync state if url changes
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) {
      setSearch(q);
    }
  }, [searchParams]);

  const handleSearchChange = (val) => {
    setSearch(val);
    if (val.trim()) {
      setSearchParams({ search: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleReset = () => {
    setSearch('');
    setPositionFilter('all');
    setEraFilter('all');
    setSortBy('rating');
    setSearchParams({});
  };

  const filteredPlayers = useMemo(() => {
    return PLAYERS.filter((player) => {
      // Search
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesName = player.name.toLowerCase().includes(query);
        const matchesClub = player.club.toLowerCase().includes(query);
        const matchesCountry = player.nationality.toLowerCase().includes(query);
        const matchesNickname = player.nickname?.toLowerCase().includes(query);
        if (!matchesName && !matchesClub && !matchesCountry && !matchesNickname) {
          return false;
        }
      }

      // Position
      if (positionFilter !== 'all' && player.position !== positionFilter) {
        return false;
      }

      // Era
      if (eraFilter !== 'all' && player.era !== eraFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.overallRating - a.overallRating;
      if (sortBy === 'goals') return b.stats.goals - a.stats.goals;
      if (sortBy === 'assists') return b.stats.assists - a.stats.assists;
      if (sortBy === 'trophies') return b.stats.trophies - a.stats.trophies;
      if (sortBy === 'ballonDors') return b.stats.ballonDors - a.stats.ballonDors;
      return 0;
    });
  }, [search, positionFilter, eraFilter, sortBy]);

  const positions = ['all', 'Forward', 'Midfielder', 'Defender', 'Goalkeeper'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Complete Database</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Football Stars Directory
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Explore, filter and sort football icons across eras, positions, and career achievements.
          </p>
        </div>

        <div className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 self-start md:self-auto">
          Showing <span className="text-emerald-400 font-bold">{filteredPlayers.length}</span> of {PLAYERS.length} players
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, club (e.g. Real Madrid), country..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Era Filter */}
          <div className="md:col-span-3">
            <select
              value={eraFilter}
              onChange={(e) => setEraFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Era: All Players</option>
              <option value="current">Era: Active Modern Stars</option>
              <option value="legend">Era: All-Time Legends</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="rating">Sort: Overall Rating (Highest)</option>
              <option value="goals">Sort: Career Goals</option>
              <option value="assists">Sort: Career Assists</option>
              <option value="trophies">Sort: Career Trophies</option>
              <option value="ballonDors">Sort: Ballon d'Or Titles</option>
            </select>
          </div>

          {/* Reset */}
          <div className="md:col-span-1 flex justify-end">
            <button
              onClick={handleReset}
              title="Reset all filters"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Position Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800/60 pb-1">
          <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Position:
          </span>
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => setPositionFilter(pos)}
              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition whitespace-nowrap ${
                positionFilter === pos
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {pos === 'all' ? 'All Positions' : `${pos}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Players Grid */}
      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 space-y-4">
          <div className="text-4xl">🔍</div>
          <h3 className="text-lg font-bold text-white">No players found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            We couldn't find any players matching "{search}" with the current filters.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
          >
            Clear Filters &amp; Search
          </button>
        </div>
      )}
    </div>
  );
}
