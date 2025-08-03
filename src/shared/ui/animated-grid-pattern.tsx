'use client';

import { motion } from 'motion/react';
import { ComponentPropsWithoutRef, useEffect, useId, useRef, useState } from 'react';

import { cn } from '@/shared/lib/tw-utils';

export interface AnimatedGridPatternProps extends ComponentPropsWithoutRef<'svg'> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 반응형 그리드 크기 계산
  const getResponsiveGridSize = () => {
    if (dimensions.width === 0) return { width: 40, height: 40 };

    // 화면 크기에 따른 그리드 셀 크기 조정
    if (dimensions.width < 640) {
      // sm
      return { width: 20, height: 20 };
    } else if (dimensions.width < 768) {
      // md
      return { width: 25, height: 25 };
    } else if (dimensions.width < 1024) {
      // lg
      return { width: 30, height: 30 };
    } else if (dimensions.width < 1280) {
      // xl
      return { width: 35, height: 35 };
    } else {
      // 2xl+
      return { width: 40, height: 40 };
    }
  };

  function getPos() {
    const responsiveSize = getResponsiveGridSize();
    const gridWidth = responsiveSize.width;
    const gridHeight = responsiveSize.height;

    return [
      Math.floor((Math.random() * dimensions.width) / gridWidth),
      Math.floor((Math.random() * dimensions.height) / gridHeight),
    ];
  }

  // Adjust the generateSquares function to return objects with an id, x, and y
  function generateSquares(count: number) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)], // 초기값 사용
    }));
  }

  const [squares, setSquares] = useState(() => generateSquares(numSquares));

  // Function to update a single square's position
  const updateSquarePosition = (id: number) => {
    setSquares((currentSquares) =>
      currentSquares.map((sq) =>
        sq.id === id
          ? {
              ...sq,
              pos: getPos(),
            }
          : sq
      )
    );
  };

  // Update squares to animate in
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares));
    }
  }, [dimensions, numSquares]);

  // Resize observer to update container dimensions
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  const responsiveSize = getResponsiveGridSize();
  const gridWidth = responsiveSize.width;
  const gridHeight = responsiveSize.height;

  return (
    <svg
      ref={containerRef}
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30',
        className
      )}
      {...props}>
      <defs>
        <pattern
          id={id}
          width={gridWidth}
          height={gridHeight}
          patternUnits='userSpaceOnUse'
          x={x}
          y={y}>
          <path
            d={`M.5 ${gridHeight}V.5H${gridWidth}`}
            fill='none'
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width='100%' height='100%' fill={`url(#${id})`} />
      <svg x={x} y={y} className='overflow-visible'>
        {squares.map(({ pos: [x, y], id }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: 'reverse',
            }}
            onAnimationComplete={() => updateSquarePosition(id)}
            key={`${x}-${y}-${index}`}
            width={gridWidth - 1}
            height={gridHeight - 1}
            x={x * gridWidth + 1}
            y={y * gridHeight + 1}
            fill='currentColor'
            strokeWidth='0'
          />
        ))}
      </svg>
    </svg>
  );
}
