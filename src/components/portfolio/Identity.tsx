import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { identity } from '#/data/portfolioData'
import { Fireflies } from './Fireflies'
import { ImageDust } from './ImageDust'

export function Identity() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0.15, 0.4, 0.75, 0.95], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.15, 0.4], [40, 0])

  return (
    <section
      id="about"
      ref={ref}
      className="relative flex h-screen w-full items-center overflow-hidden bg-black px-6 md:px-16"
    >
      <Fireflies count={18} />
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <motion.div style={{ opacity, y }} className="relative text-left">
          <p className="hud-mono mb-4 text-[11px] tracking-[0.3em] text-[var(--color-accent)] uppercase">
            Identity
          </p>
          <h2 className="text-[clamp(32px,6vw,64px)] font-bold tracking-tight">{identity.name}</h2>
          <p className="hud-mono mt-3 text-[clamp(13px,1.6vw,18px)] tracking-[0.15em] text-[var(--color-hud)] uppercase">
            {identity.role}
          </p>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[var(--color-fg)]/60">
            {identity.pitch}
          </p>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative aspect-square w-full max-w-md justify-self-center md:justify-self-end"
        >
          <ImageDust src="/images/noel.png" className="h-full w-full" />
        </motion.div>
      </div>
    </section>
  )
}