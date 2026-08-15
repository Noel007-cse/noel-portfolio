import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface Firefly {
  id: number
  startX: number
  startY: number
  driftX: number
  driftY: number
  size: number
  duration: number
  delay: number
}

export function Fireflies({ count = 24 }: { count?: number }) {
  const flies = useMemo<Firefly[]>(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        driftX: (Math.random() - 0.5) * 30,
        driftY: (Math.random() - 0.5) * 40,
        size: 2 + Math.random() * 3,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 6,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {flies.map((fly) => (
        <motion.span
          key={fly.id}
          initial={{
            left: `${fly.startX}%`,
            top: `${fly.startY}%`,
            opacity: 0,
          }}
          animate={{
            left: [`${fly.startX}%`, `${fly.startX + fly.driftX}%`, `${fly.startX}%`],
            top: [`${fly.startY}%`, `${fly.startY + fly.driftY}%`, `${fly.startY}%`],
            opacity: [0, 0.9, 0.3, 0.9, 0],
          }}
          transition={{
            duration: fly.duration,
            delay: fly.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: fly.size,
            height: fly.size,
            borderRadius: '9999px',
            background: 'rgba(250, 204, 21, 0.9)',
            boxShadow: '0 0 6px 2px rgba(250, 204, 21, 0.6), 0 0 14px 4px rgba(163, 230, 53, 0.25)',
          }}
        />
      ))}
    </div>
  )
}