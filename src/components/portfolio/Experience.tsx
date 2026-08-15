import { motion } from 'framer-motion'
import { experience, stack } from '#/data/portfolioData'
import { Fireflies } from './Fireflies'

function TimelineItem({ item, index }: { item: (typeof experience)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative pb-12 pl-10 last:pb-0"
    >
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, delay: index * 0.08 + 0.2 }}
        className="absolute top-1.5 left-0 h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]"
      />
      {index !== experience.length - 1 && (
        <motion.span
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: index * 0.08 + 0.3 }}
          style={{ transformOrigin: 'top' }}
          className="absolute top-4 left-[4px] h-full w-px bg-white/10"
        />
      )}
      <p className="hud-mono text-[11px] tracking-[0.2em] text-[var(--color-hud)] uppercase">{item.period}</p>
      <h4 className="mt-1 text-[19px] font-semibold tracking-tight">{item.role}</h4>
      <p className="hud-mono mt-0.5 text-[13px] tracking-[0.05em] text-[var(--color-accent)]">{item.org}</p>
      <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[var(--color-fg)]/60">{item.detail}</p>
    </motion.div>
  )
}

function SkillGroup({ category, items, index }: { category: string; items: readonly string[]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="mb-6"
    >
      <p className="hud-mono mb-2.5 text-[11px] tracking-[0.25em] text-[var(--color-spark-b)] uppercase">
        {category}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: index * 0.08 + i * 0.04 }}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] text-[var(--color-fg)]/80 transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export function Experience() {
  return (
    <section id="experience" className="relative w-full overflow-hidden bg-black px-6 py-32">
      <Fireflies count={24} />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="hud-mono relative mb-16 text-center text-[11px] tracking-[0.3em] text-[var(--color-accent)] uppercase"
      >
        Experience &amp; Stack
      </motion.p>
      <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2">
        <div>
          <h3 className="mb-8 text-[13px] tracking-[0.15em] text-[var(--color-hud)] uppercase">Timeline</h3>
          {experience.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} />
          ))}
        </div>
        <div>
          <h3 className="mb-8 text-[13px] tracking-[0.15em] text-[var(--color-hud)] uppercase">Stack</h3>
          {Object.entries(stack).map(([category, items], i) => (
            <SkillGroup key={category} category={category} items={items} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}