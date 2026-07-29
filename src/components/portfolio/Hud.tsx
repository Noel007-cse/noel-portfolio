import { useEffect, useState } from 'react'

export function Hud() {
  const [time, setTime] = useState('')
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      setTime(`${h}:${m}`)
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      {/* Top bar */}
      <div className="pointer-events-none fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-5 md:px-10">
        <div className="pointer-events-auto text-lg font-bold tracking-tight">
          NOEL<span className="text-[var(--color-accent)]">.</span>J.C
        </div>
        <nav className="hud-mono pointer-events-auto flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase text-[var(--color-hud)]">
          <a href="#work" className="transition-colors hover:text-[var(--color-fg)]">
            Work
          </a>
          <a href="#about" className="transition-colors hover:text-[var(--color-fg)]">
            About
          </a>
          <a href="#contact" className="transition-colors hover:text-[var(--color-fg)]">
            Contact
          </a>
          <span className="cursor-pointer transition-colors hover:text-[var(--color-fg)]">
            Sound[·]
          </span>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="hud-mono pointer-events-none fixed bottom-0 left-0 z-50 flex w-full items-center justify-between px-6 py-5 text-[11px] tracking-[0.15em] text-[var(--color-hud)] md:px-10">
        <span>GMT+5:30 IN {time}</span>
        <span>
          {String(coords.x).padStart(4, '0')} X {String(coords.y).padStart(4, '0')} Y
        </span>
      </div>

      {/* Crosshair guides */}
      <div className="pointer-events-none fixed top-6 left-6 z-40 h-3 w-3 border-t border-l border-[var(--color-hud)]/30 md:top-8 md:left-8" />
      <div className="pointer-events-none fixed top-6 right-6 z-40 h-3 w-3 border-t border-r border-[var(--color-hud)]/30 md:top-8 md:right-8" />
      <div className="pointer-events-none fixed bottom-6 left-6 z-40 h-3 w-3 border-b border-l border-[var(--color-hud)]/30 md:bottom-8 md:left-8" />
      <div className="pointer-events-none fixed bottom-6 right-6 z-40 h-3 w-3 border-b border-r border-[var(--color-hud)]/30 md:bottom-8 md:right-8" />
    </>
  )
}