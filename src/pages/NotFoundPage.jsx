import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Flag } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="py-20 text-center space-y-6 max-w-lg mx-auto">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-4xl shadow-xl">
        🚩
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-widest">
          Error 404 • Offside!
        </span>
        <h1 className="text-4xl font-black text-white">Ball Out of Play</h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          The pitch coordinate you're trying to reach doesn't exist or has been transferred to another league.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/players"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs transition"
        >
          <Users className="w-4 h-4" />
          <span>Players Directory</span>
        </Link>
      </div>
    </div>
  );
}
