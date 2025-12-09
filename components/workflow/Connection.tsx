import React from 'react';
import { Position, ThemeColors } from '../../types';

interface ConnectionProps {
  start: Position;
  end: Position;
  theme: ThemeColors;
  active?: boolean;
}

export const ConnectionLine: React.FC<ConnectionProps> = ({ start, end, theme, active }) => {
  const dx = Math.abs(end.x - start.x);
  const dy = Math.abs(end.y - start.y);
  
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
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        className="cursor-pointer"
      />
      <path
        d={path}
        fill="none"
        stroke={theme.stroke}
        strokeWidth={2}
        className="transition-colors duration-300 group-hover:stroke-blue-400"
      />
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