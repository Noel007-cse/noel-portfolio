import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '#/data/portfolioData'

const COUNT = projects.length

function ProjectCard({
  project,
  index,
  progress,
}: {
  project: (typeof projects)[number]
  index: number
  progress: MotionValue<number>
}) {
  const slice = 1 / COUNT
  const start = index * slice
  const mid = start + slice * 0.5
  const end = start + slice

  const scale = useTransform(progress, [start, mid, end], [0.3, 1, 1.8])
  const opacity = useTransform(progress, [start, start + slice * 0.15, mid, end - slice * 0.15, end], [0, 1, 1, 1, 0])
  const blur = useTransform(progress, [start, mid, end], [8, 0, 6])
  const filter = useTransform(blur, (b) => `blur(${b}px)`)

  return (
    <motion.div
      style={{ scale, opacity, filter, zIndex: COUNT - index }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
        <div className="hud-mono mb-3 flex flex-wrap gap-2 text-[10px] tracking-[0.2em] text-[var(--color-accent)] uppercase">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[var(--color-accent)]/30 px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-[clamp(24px,3.5vw,40px)] font-bold tracking-tight">{project.name}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-fg)]/70">{project.pitch}</p>
        <div className="hud-mono mt-5 flex gap-5 text-[12px] tracking-[0.1em] text-[var(--color-hud)]">
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" className="hover:text-[var(--color-accent)]">
              LIVE ↗
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="hover:text-[var(--color-accent)]">
              REPO ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsWarp() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section ref={containerRef} style={{ height: `${COUNT * 100}vh` }} className="relative bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden px-6">
        <p className="hud-mono absolute top-10 left-1/2 z-50 -translate-x-1/2 text-[11px] tracking-[0.3em] text-[var(--color-accent)] uppercase">
          Projects
        </p>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}