import { createFileRoute } from '@tanstack/react-router'
import { Hud } from '#/components/portfolio/Hud'
import { WarpHero } from '#/components/portfolio/WarpHero'
import { Identity } from '#/components/portfolio/Identity'
import { ProjectsWarp } from '#/components/portfolio/ProjectsWarp'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="relative min-h-screen">
      <Hud />
      <WarpHero />
      <Identity />
      <ProjectsWarp />
    </div>
  )
}