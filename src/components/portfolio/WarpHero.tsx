import { useEffect, useRef } from 'react'

interface Line {
  angle: number
  dist: number
  len: number
  speed: number
  color: string
  width: number
}

const COLORS = ['#22D3EE', '#22D3EE', '#22D3EE', '#A3E635', '#E879F9']

export function WarpHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const velocityRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let cx = 0
    let cy = 0

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio
      h = canvas.height = canvas.offsetHeight * devicePixelRatio
      cx = w / 2
      cy = h / 2
    }
    resize()
    window.addEventListener('resize', resize)

    const lines: Array<Line> = Array.from({ length: 260 }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * Math.max(w, h) * 0.6,
      len: 30 + Math.random() * 120,
      speed: 1 + Math.random() * 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      width: 1 + Math.random() * 1.5,
    }))

    let raf = 0
    const loop = () => {
      const baseSpeed = 1 + velocityRef.current * 0.08
      // velocity decays back toward 0 each frame (scroll friction)
      velocityRef.current *= 0.9

      ctx.fillStyle = 'rgba(5,6,10,0.25)'
      ctx.fillRect(0, 0, w, h)

      for (const line of lines) {
        line.dist += line.speed * baseSpeed
        if (line.dist > Math.max(w, h) * 0.75) {
          line.angle = Math.random() * Math.PI * 2
          line.dist = 0
          line.len = 30 + Math.random() * (120 + Math.min(velocityRef.current, 200))
          line.speed = 1 + Math.random() * 4
          line.color = COLORS[Math.floor(Math.random() * COLORS.length)]
        }
        const x1 = cx + Math.cos(line.angle) * line.dist
        const y1 = cy + Math.sin(line.angle) * line.dist
        const x2 = cx + Math.cos(line.angle) * (line.dist + line.len)
        const y2 = cy + Math.sin(line.angle) * (line.dist + line.len)
        const grad = ctx.createLinearGradient(x1, y1, x2, y2)
        grad.addColorStop(0, 'rgba(0,0,0,0)')
        grad.addColorStop(1, line.color)
        ctx.strokeStyle = grad
        ctx.lineWidth = line.width
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onWheel = (e: WheelEvent) => {
      velocityRef.current += Math.abs(e.deltaY)
    }
    window.addEventListener('wheel', onWheel, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <h1 className="relative z-10 px-6 text-center text-[clamp(40px,9vw,120px)] font-extrabold leading-[0.95] tracking-tight">
        BUILD WITH INTENT
      </h1>
    </section>
  )
}