import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { identity } from '#/data/portfolioData'

export function Identity() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0.15, 0.4, 0.75, 0.95], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.15, 0.4], [40, 0])

  return (
    <section ref={ref} className="flex h-screen w-full items-center justify-center bg-black px-6">
      <motion.div style={{ opacity, y }} className="text-center">
        <p className="hud-mono mb-4 text-[11px] tracking-[0.3em] text-[var(--color-accent)] uppercase">
          Identity
        </p>
        <h2 className="text-[clamp(32px,6vw,72px)] font-bold tracking-tight">
          {identity.name}
        </h2>
        <p className="hud-mono mt-3 text-[clamp(13px,1.6vw,18px)] tracking-[0.15em] text-[var(--color-hud)] uppercase">
          {identity.role}
        </p>
        <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-[var(--color-fg)]/60">
          {identity.pitch}
        </p>
      </motion.div>
    </section>
  )
}