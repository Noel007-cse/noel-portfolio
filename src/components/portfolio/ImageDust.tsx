import { useEffect, useRef, useState } from 'react'

interface Particle {
  ox: number // origin x, normalized 0..1
  oy: number // origin y, normalized 0..1
  sx: number // scatter x, normalized 0..1
  sy: number // scatter y, normalized 0..1
  cx: number // current x, normalized 0..1
  cy: number // current y, normalized 0..1
  r: number
  g: number
  b: number
  a: number
  seed: number
}

export function ImageDust({ src, className = '' }: { src: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -1, y: -1, active: false })
  const [inView, setInView] = useState(false)

  // Trigger loading/animating only once the component scrolls into view
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect() // only need to trigger once
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return // don't do any work until scrolled into view
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let raf = 0
    let w = 0
    let h = 0
    let cancelled = false
    let phase: 'full' | 'shattering' | 'dust' = 'full'
    let phaseStart = 0
    let fullImg: HTMLImageElement | null = null
    let fullImgDrawRect = { sx: 0, sy: 0, sw: 0, sh: 0 } // source crop rect for cover-fit

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio
      h = canvas.height = canvas.offsetHeight * devicePixelRatio
    }
    resize()
    window.addEventListener('resize', resize)

    const img = new Image()
    // NOTE: no crossOrigin set for same-origin local images (public/ folder).
    // Setting crossOrigin='anonymous' on a same-origin image with no CORS
    // headers can cause getImageData() to silently fail / throw in some
    // browsers, which is the most likely reason particles weren't forming
    // from real pixel data before.
    img.src = src
    img.onload = () => {

      if (cancelled) return
      // sample the image at a fixed working resolution for performance
      const SAMPLE_W = 340
      const SAMPLE_H = Math.round((img.height / img.width) * SAMPLE_W)
      const off = document.createElement('canvas')
      off.width = SAMPLE_W
      off.height = SAMPLE_H
      const offCtx = off.getContext('2d')
      if (!offCtx) return

      // cover-fit crop so the image fills the sample canvas
      const srcRatio = img.width / img.height
      const dstRatio = SAMPLE_W / SAMPLE_H
      let sx = 0, sy = 0, sw = img.width, sh = img.height
      if (srcRatio > dstRatio) {
        sw = img.height * dstRatio
        sx = (img.width - sw) / 2
      } else {
        sh = img.width / dstRatio
        sy = (img.height - sh) / 2
      }
      offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, SAMPLE_W, SAMPLE_H)

      let data: Uint8ClampedArray
      try {
        data = offCtx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data
      } catch (err) {
        console.error('ImageDust: getImageData failed (likely a CORS/tainted canvas issue):', err)
        return
      }

      const list: Particle[] = []
      const STEP = 1

      // First pass: find the photo's actual brightness range. Low-contrast
      // source photos (dark grey background, moderately-lit face) only use
      // a narrow slice of the 0-1 range — applying density/gamma curves to
      // raw values either crushes everything to sparse or blows everything
      // up to uniform, because the real content never reaches the extremes
      // the curve assumes. Stretching to the photo's own min/max first
      // fixes that at the source.
      const rawBrightnesses: number[] = []
      for (let y = 0; y < SAMPLE_H; y += STEP) {
        for (let x = 0; x < SAMPLE_W; x += STEP) {
          const i = (y * SAMPLE_W + x) * 4
          if (data[i + 3] < 20) continue
          rawBrightnesses.push((data[i] + data[i + 1] + data[i + 2]) / 3 / 255)
        }
      }
      const sorted = [...rawBrightnesses].sort((a, b) => a - b)
      const p5 = sorted[Math.floor(sorted.length * 0.05)] ?? 0
      const p97 = sorted[Math.floor(sorted.length * 0.97)] ?? 1
      const range = Math.max(0.05, p97 - p5) // avoid divide-by-zero on flat images

      for (let y = 0; y < SAMPLE_H; y += STEP) {
        for (let x = 0; x < SAMPLE_W; x += STEP) {
          const i = (y * SAMPLE_W + x) * 4
          const a = data[i + 3]
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          if (a < 20) continue // skip fully-transparent pixels

          const rawBrightness = (r + g + b) / 3 / 255
          // Stretch to the photo's actual dark/light range, then a mild
          // gamma lift for a slightly softer midtone falloff.
          const stretched = Math.min(1, Math.max(0, (rawBrightness - p5) / range))
          const gammaBrightness = Math.pow(stretched, 0.85)

          // Elliptical mask shaped like a headshot subject (taller than
          // wide, slightly above center where a head+shoulders portrait
          // typically sits) — pulled in tight so the dust cloud hugs just
          // the person, not the flat background filling the rest of the
          // square frame. There's no real subject segmentation here, so
          // this is a fitted approximation, not pixel-accurate cutout.
          const nx = (x / SAMPLE_W - 0.5) / 0.34 // ellipse half-width
          const ny = (y / SAMPLE_H - 0.42) / 0.5 // ellipse half-height, center shifted up
          const distFromCenter = Math.sqrt(nx * nx + ny * ny)
          const vignette = 1 - Math.min(1, Math.max(0, (distFromCenter - 0.55) / 0.5))
          const vignetteSmooth = vignette * vignette * (3 - 2 * vignette)

          const brightness = gammaBrightness * vignetteSmooth
          const density = Math.min(1, brightness * 0.92 + 0.02 * vignetteSmooth)
          if (Math.random() > density) continue

          // Dust must render in a bright/white color regardless of the
          // source pixel's own color — using the photo's actual dark
          // background/shadow RGB values makes those particles invisible
          // against the black canvas no matter what alpha they have.
          const dustR = 210 + brightness * 45
          const dustG = 212 + brightness * 43
          const dustB = 220 + brightness * 35

          list.push({
            ox: x / SAMPLE_W,
            oy: y / SAMPLE_H,
            sx: 0,
            sy: 0,
            cx: Math.random(),
            cy: Math.random(),
            r: dustR,
            g: dustG,
            b: dustB,
            a: (a / 255) * (0.4 + brightness * 0.6),
            seed: Math.random() * 1000,
          })
        }
      }

      // Scatter positions stay loosely clustered around each particle's own
      // origin instead of fully random across the whole canvas — this keeps
      // the dust cloud shaped like the subject's silhouette instead of
      // spreading into uniform noise across the whole frame.
      for (const p of list) {
        const scatterRadius = 0.06 + Math.random() * 0.06
        const angle = Math.random() * Math.PI * 2
        p.sx = Math.min(1, Math.max(0, p.ox + Math.cos(angle) * scatterRadius))
        p.sy = Math.min(1, Math.max(0, p.oy + Math.sin(angle) * scatterRadius))
      }

      if (list.length === 0) {
        console.warn('ImageDust: 0 particles generated — image may have failed to load or is fully transparent/dark.')
      }
      particles = list
      fullImg = img
      fullImgDrawRect = { sx, sy, sw, sh }
      phaseStart = performance.now()
    }
    img.onerror = (err) => {
      console.error('ImageDust: img.onerror fired at src =', src, err)
    }
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width),
        y: ((e.clientY - rect.top) / rect.height),
        active: true,
      }
    }
    const onLeave = () => { mouseRef.current.active = false }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    const REVEAL_RADIUS = 0.16 // fraction of canvas min-dimension
    const FULL_PHASE_MS = 900
    const SHATTER_PHASE_MS = 2200

    const loop = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const mouse = mouseRef.current
      const minDim = Math.min(w, h)
      const cssW = canvas.offsetWidth
      const cssH = canvas.offsetHeight
      const cssMinDim = Math.min(cssW, cssH)
      const time = t * 0.0006

      if (!fullImg) {
        raf = requestAnimationFrame(loop)
        return
      }

      const elapsed = performance.now() - phaseStart
      if (phase === 'full' && elapsed > FULL_PHASE_MS) {
        phase = 'shattering'
        phaseStart = performance.now()
      } else if (phase === 'shattering' && elapsed > SHATTER_PHASE_MS) {
        phase = 'dust'
      }

      if (phase === 'full') {
        // Draw the sharp image directly, fading out slightly at the very end
        const { sx, sy, sw, sh } = fullImgDrawRect
        ctx.globalAlpha = 1
        ctx.drawImage(fullImg, sx, sy, sw, sh, 0, 0, w, h)
        ctx.globalAlpha = 1
        raf = requestAnimationFrame(loop)
        return
      }

      let shatterProgress = 1
      if (phase === 'shattering') {
        shatterProgress = Math.min(1, elapsed / SHATTER_PHASE_MS)
        // ease-in-out for a slow, drifting "sand dissolving" feel
        shatterProgress = shatterProgress < 0.5
          ? 4 * shatterProgress * shatterProgress * shatterProgress
          : 1 - Math.pow(-2 * shatterProgress + 2, 3) / 2

        // Fade the sharp image out smoothly across the whole shatter duration
        const { sx, sy, sw, sh } = fullImgDrawRect
        ctx.globalAlpha = Math.max(0, 1 - shatterProgress)
        ctx.drawImage(fullImg, sx, sy, sw, sh, 0, 0, w, h)
        ctx.globalAlpha = 1
      }

      ctx.globalCompositeOperation = 'lighter'
      for (const p of particles) {
        const driftX = p.sx + Math.sin(time + p.seed) * 0.012
        const driftY = p.sy + Math.cos(time * 1.3 + p.seed) * 0.012

        let inMagnifier = false
        if (phase === 'dust' && mouse.active) {
          const dx = (p.ox - mouse.x) * (cssW / cssMinDim)
          const dy = (p.oy - mouse.y) * (cssH / cssMinDim)
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REVEAL_RADIUS) inMagnifier = true
        }

        // During 'shattering', particles start at origin (ox,oy) and drift
        // outward toward their scatter position as shatterProgress rises.
        // During 'dust', they just live at their gently drifting position.
        // Particles under the magnifier circle are skipped entirely — the
        // crisp image drawn above already covers that area.
        if (phase === 'dust' && inMagnifier) continue

        let targetX: number
        let targetY: number
        if (phase === 'shattering') {
          targetX = p.ox + (driftX - p.ox) * shatterProgress
          targetY = p.oy + (driftY - p.oy) * shatterProgress
        } else {
          targetX = driftX
          targetY = driftY
        }

        p.cx += (targetX - p.cx) * 0.1
        p.cy += (targetY - p.cy) * 0.1

        const px = p.cx * w
        const py = p.cy * h
        const size = (0.9 + (p.seed % 10) / 10 * 0.5) * devicePixelRatio
        const phaseAlpha = phase === 'shattering' ? shatterProgress : 1
        const alpha = 0.7 * p.a * phaseAlpha

        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`
        ctx.fillRect(px, py, size, size)
      }
      ctx.globalCompositeOperation = 'source-over'

      if (phase === 'dust' && mouse.active) {
        // Real "magnifying glass": draw the crisp source image clipped to a
        // soft-edged circle (radial gradient mask, not a hard clip) so it
        // blends into the surrounding dust instead of looking like a UI
        // element with a visible ring around it.
        const { sx, sy, sw, sh } = fullImgDrawRect
        const cx = mouse.x * w
        const cy = mouse.y * h
        const radius = REVEAL_RADIUS * minDim

        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.clip()

        // Draw the crisp image
        ctx.drawImage(fullImg, sx, sy, sw, sh, 0, 0, w, h)

        // Soft-edge fade: draw a radial gradient (transparent center,
        // opaque black at the rim) using 'destination-in' so only the
        // gradient's alpha remains, fading the image out toward the edge
        // instead of cutting off sharply.
        const grad = ctx.createRadialGradient(cx, cy, radius * 0.55, cx, cy, radius)
        grad.addColorStop(0, 'rgba(0,0,0,1)')
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.globalCompositeOperation = 'destination-in'
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalCompositeOperation = 'source-over'

        ctx.restore()
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [src, inView])

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}