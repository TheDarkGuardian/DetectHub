import React from 'react';
import { cn } from '@/lib/utils';
import { SeverityLevel } from '@/types/forensics';

interface StatusBadgeProps {
  status?: 'Clean' | 'Review' | 'Flagged' | 'Suspicious' | 'COMPLETED' | 'RUNNING' | 'PENDING';
  severity?: SeverityLevel;
  className?: string;
  children?: React.ReactNode;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  severity,
  className,
  children
}) => {
  let badgeStyle = "bg-zinc-800/60 text-zinc-300 border-zinc-700/50";
  let dotColor = "bg-zinc-400";
  let label = children || status || severity || 'INFO';

  if (status === 'Clean' || status === 'COMPLETED' || severity === 'SAFE') {
    badgeStyle = "bg-emerald-950/40 text-emerald-400 border-emerald-500/20";
    dotColor = "bg-emerald-400";
  } else if (status === 'Review' || status === 'PENDING' || severity === 'MEDIUM' || severity === 'LOW') {
    badgeStyle = "bg-amber-950/40 text-amber-400 border-amber-500/20";
    dotColor = "bg-amber-400";
  } else if (status === 'Flagged' || status === 'Suspicious' || severity === 'CRITICAL' || severity === 'HIGH') {
    badgeStyle = "bg-rose-950/40 text-rose-400 border-rose-500/20";
    dotColor = "bg-rose-400";
  } else if (status === 'RUNNING' || severity === 'INFO') {
    badgeStyle = "bg-blue-950/40 text-blue-400 border-blue-500/20";
    dotColor = "bg-blue-400";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium tracking-wide uppercase rounded-md border backdrop-blur-sm",
        badgeStyle,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", dotColor)} />
      {label}
    </span>
  );
};
