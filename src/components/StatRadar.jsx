import React from 'react';

export default function StatRadar({ attributes }) {
  const stats = [
    { label: 'Pace (PAC)', value: attributes.pace, desc: 'Sprint speed & acceleration' },
    { label: 'Shooting (SHO)', value: attributes.shooting, desc: 'Finishing, shot power & positioning' },
    { label: 'Passing (PAS)', value: attributes.passing, desc: 'Vision, crossing & curve' },
    { label: 'Dribbling (DRI)', value: attributes.dribbling, desc: 'Agility, balance & ball control' },
    { label: 'Defending (DEF)', value: attributes.defending, desc: 'Interceptions & marking' },
    { label: 'Physical (PHY)', value: attributes.physical, desc: 'Jumping, stamina & strength' },
  ];

  const getColorClass = (val) => {
    if (val >= 90) return 'from-amber-400 to-amber-500 text-amber-300';
    if (val >= 80) return 'from-emerald-400 to-emerald-500 text-emerald-300';
    if (val >= 70) return 'from-teal-400 to-teal-500 text-teal-300';
    return 'from-slate-400 to-slate-500 text-slate-300';
  };

  return (
    <div className="space-y-3.5">
      {stats.map((stat) => (
        <div key={stat.label} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">{stat.label}</span>
            <span className="font-black text-white font-mono text-sm">{stat.value}</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getColorClass(stat.value)} transition-all duration-700 ease-out`}
              style={{ width: `${Math.min(stat.value, 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500 block">{stat.desc}</span>
        </div>
      ))}
    </div>
  );
}
