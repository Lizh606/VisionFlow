
import React from 'react';
import { Position, ThemeColors } from '../types';

interface ConnectionProps {
  start: Position;
  end: Position;
  theme: ThemeColors;
  active?: boolean;
}

export const ConnectionLine: React.FC<ConnectionProps> = ({ start, end, theme, active }) => {
  // Determine if we should curve horizontally or vertically
  // If vertical distance is significant and we are top-to-bottom, prefer vertical.
  const dx = Math.abs(end.x - start.x);
  const dy = Math.abs(end.y - start.y);
  
  // Heuristic: If we are mainly moving vertically (dy > dx), use vertical curve.
  // Or if the start/end positions suggest it (passed from parent).
  // Here we use simple coordinate delta check.
  const isVertical = dy > dx;

  let path = '';

  if (isVertical) {
      const controlPointOffset = Math.max(dy * 0.5, 50);
      path = `
        M ${start.x} ${start.y}
        C ${start.x} ${start.y + controlPointOffset},
          ${end.x} ${end.y - controlPointOffset},
          ${end.x} ${end.y}
      `;
  } else {
      const controlPointOffset = Math.max(dx * 0.5, 50);
      path = `
        M ${start.x} ${start.y}
        C ${start.x + controlPointOffset} ${start.y},
          ${end.x - controlPointOffset} ${end.y},
          ${end.x} ${end.y}
      `;
  }

  return (
    <g className="group">
      {/* Hover Target (wider invisible path) */}
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        className="cursor-pointer"
      />
      {/* Visible Path */}
      <path
        d={path}
        fill="none"
        stroke={theme.stroke}
        strokeWidth={2}
        className="transition-colors duration-300 group-hover:stroke-blue-400"
      />
      {/* Animated Flow (if active) */}
      {active && (
        <path
          d={path}
          fill="none"
          stroke={theme.primary}
          strokeWidth={2}
          strokeDasharray="8,8"
          className="animate-flow"
          style={{
            animation: 'dash 1s linear infinite',
          }}
        />
      )}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -16;
          }
        }
      `}</style>
    </g>
  );
};
