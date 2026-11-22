import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trophy, Globe, Code2, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 mt-20 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚽</span>
              <span className="font-extrabold text-xl text-white">PitchPulse</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                SPA + Routing
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Explore player profiles, head-to-head stat comparisons, records, and assemble your all-time Dream XI. Powered by modern React client-side routing.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                Ready for Vercel &amp; GitHub Pages
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-emerald-400 transition">Home Showcase</Link></li>
              <li><Link to="/players" className="hover:text-emerald-400 transition">Player Database</Link></li>
              <li><Link to="/compare" className="hover:text-emerald-400 transition">Head-to-Head Clash</Link></li>
              <li><Link to="/squad" className="hover:text-emerald-400 transition">Dream XI Pitch Builder</Link></li>
              <li><Link to="/favorites" className="hover:text-emerald-400 transition">My Shortlist</Link></li>
            </ul>
          </div>

          {/* Deployment Quick Guide */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Deployment</h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <p className="font-semibold text-slate-300">▲ Vercel Ready</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Includes <code className="text-emerald-400">vercel.json</code> rewrites for clean deep-link routing.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <p className="font-semibold text-slate-300">🐙 GitHub Pages</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Vite relative base paths &amp; SPA router configuration.</p>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PitchPulse. Dedicated to the beautiful game.</p>
          <p className="flex items-center gap-1">
            Built with React 18, React Router v6 &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
