import React from 'react';
import { cn } from '@/lib/utils';
import { SeverityLevel } from '@/types/forensics';

interface RiskGaugeProps {
  score: number;
  severity: SeverityLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  severity,
  size = 'md',
  showLabel = true
}) => {
  let strokeColor = "#22C55E";
  let labelText = "Safe System";
  let textColor = "text-emerald-400";

  if (score >= 70 || severity === 'CRITICAL' || severity === 'HIGH') {
    strokeColor = "#EF4444";
    labelText = "Critical Risk";
    textColor = "text-rose-400";
  } else if (score >= 30 || severity === 'MEDIUM') {
    strokeColor = "#EAB308";
    labelText = "Needs Review";
    textColor = "text-amber-400";
  } else if (score >= 10 || severity === 'LOW') {
    strokeColor = "#3B82F6";
    labelText = "Low Risk";
    textColor = "text-blue-400";
  }

  const radius = size === 'lg' ? 56 : size === 'md' ? 40 : 28;
  const strokeWidth = size === 'lg' ? 8 : size === 'md' ? 6 : 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;
  const svgSize = (radius + strokeWidth) * 2;

  return (
    <div className="flex items-center gap-4">
      <div className="relative inline-flex items-center justify-center">
        <svg width={svgSize} height={svgSize} className="-rotate-90 transform">
          {/* Background Ring */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke="#1F1F24"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Ring */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={cn("font-mono font-bold tracking-tighter", size === 'lg' ? "text-3xl" : size === 'md' ? "text-xl" : "text-sm", textColor)}>
            {score}
          </span>
          <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold">/ 100</span>
        </div>
      </div>

      {showLabel && (
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Calculated Risk</span>
          <span className={cn("text-base font-semibold tracking-tight", textColor)}>
            {labelText}
          </span>
        </div>
      )}
    </div>
  );
};
