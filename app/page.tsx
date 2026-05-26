"use client"
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Avatar, AvatarImage } from './_components/ui/avatar'
import { Button } from './_components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './_components/ui/card'
import { ChevronUp, ChevronDown } from 'lucide-react'
import {
  IconBrandReact, IconBrandNextjs, IconBrandTypescript,
  IconBrandPhp, IconBrandNodejs, IconBrandCSharp,
  IconBrandFigma, IconBrandTailwind, IconBox,
  IconBrandGithub, IconExternalLink,
} from '@tabler/icons-react'
import type { Icon } from '@tabler/icons-react'

type Tech = { name: string; icon: typeof Icon }
type StackItem = { title: string; techs: Tech[]; description: string }

const SECTIONS = [
  { key: 'hero',     label: 'Inicio'    },
  { key: 'stack',    label: 'Stack'     },
  { key: 'projects', label: 'Proyectos' },
] as const

const STACK: StackItem[] = [
  {
    title: 'Frontend',
    description: 'Interfaces modernas, componentes reutilizables y rendimiento optimizado.',
    techs: [
      { name: 'React',      icon: IconBrandReact      },
      { name: 'Next.js',    icon: IconBrandNextjs     },
      { name: 'TypeScript', icon: IconBrandTypescript },
    ],
  },
  {
    title: 'Backend',
    description: 'Lógica de servidor, APIs y aplicaciones de escritorio',
    techs: [
      { name: 'PHP',     icon: IconBrandPhp    },
      { name: 'Node.js', icon: IconBrandNodejs },
      { name: 'C#',      icon: IconBrandCSharp },
    ],
  },
  {
    title: 'Diseño',
    description: 'Prototipado, sistemas de diseño y estilos responsivos.',
    techs: [
      { name: 'Figma',    icon: IconBrandFigma    },
      { name: 'Tailwind', icon: IconBrandTailwind },
      { name: 'Shadcn',   icon: IconBox           },
    ],
  },
]

type Project = {
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
}

const PROJECTS: Project[] = [
  {
    title: 'Portfolio Personal',
    description: 'Sitio personal con animaciones, glassmorfismo y navegación por fade.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    github: '#',
    live: '#',
  },
  {
    title: 'E-Commerce',
    description: 'Tienda online con carrito, pasarela de pagos y panel de administración.',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: '#',
  },
  {
    title: 'Dashboard UI',
    description: 'Panel de métricas con gráficas interactivas y modo oscuro.',
    tags: ['Next.js', 'C#', 'Shadcn'],
    github: '#',
    live: '#',
  },
]

const fade = {
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  exit:       { opacity: 0 },
  transition: { duration: 0.6, ease: 'easeInOut' as const },
}

function ProjectCard({ title, description, tags, github, live }: Project) {
  return (
    <Card className="group/card bg-white/5 backdrop-blur-md border border-white/10 shadow-xl hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-300 gap-3">
      <CardHeader>
        <CardTitle className="text-white text-lg">{title}</CardTitle>
        <div className="flex flex-wrap gap-1 pt-1">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-violet-500/20 border border-violet-500/30 text-violet-300">
              {tag}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-white/50 text-sm">{description}</p>
        <div className="flex gap-3">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-violet-300 transition-colors"
            >
              <IconBrandGithub className="size-4" stroke={1.5} />
              Código
            </a>
          )}
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-violet-300 transition-colors"
            >
              <IconExternalLink className="size-4" stroke={1.5} />
              Ver live
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function TechCard({ title, techs, description }: StackItem) {
  return (
    <Card className="group/card bg-white/5 backdrop-blur-md border border-white/10 shadow-xl hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-300 gap-3">
      <CardHeader>
        <CardTitle className="text-white text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-end gap-0">
          {techs.map((tech, i) => (
            <div
              key={tech.name}
              className={`flex flex-col items-center transition-all duration-300 ease-out ${
                i > 0 ? '-ml-3 group-hover/card:ml-2' : 'group-hover/card:mr-1'
              }`}
              style={{ zIndex: techs.length - i }}
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500/40 to-violet-600/40 border border-white/20 group-hover/card:border-violet-400/50 flex items-center justify-center shadow-lg transition-all duration-300">
                <tech.icon className="size-4 text-violet-100" stroke={1.5} />
              </div>
              <span className="mt-1 text-[9px] text-white/0 group-hover/card:text-white/70 transition-all duration-300 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
        <p className="text-white/50 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function Page() {
  const [current, setCurrent] = useState(0)

  const navigate = useCallback((dir: 1 | -1) => {
    setCurrent(c => Math.min(Math.max(c + dir, 0), SECTIONS.length - 1))
  }, [])

  const goTo = useCallback((index: number) => {
    setCurrent(index)
  }, [])

  const onWheel = useCallback((e: React.WheelEvent) => {
    if (e.deltaY > 0) navigate(1)
    else navigate(-1)
  }, [navigate])

  return (
    <div className="h-screen overflow-hidden" onWheel={onWheel}>
      <AnimatePresence mode="wait">

        {current === 0 && (
          <motion.div key="hero" {...fade}
            className="flex items-center gap-16 justify-center h-screen"
          >
            <Avatar className="scale-400">
              <AvatarImage src="/logo.png" />
            </Avatar>

            <div className="grid gap-6 place-items-center">
              <h1 className="text-6xl font-bold bg-linear-to-r from-blue-300 via-violet-300 to-purple-400 bg-clip-text text-transparent">
                Jean Rodriguez
              </h1>
              <h2 className="text-6xl font-bold">Web Developer / Designer</h2>
            </div>
          </motion.div>
        )}

        {current === 1 && (
          <motion.div key="stack" {...fade}
            className="flex flex-col items-center justify-center gap-10 h-screen px-16"
          >
            <h2 className="text-4xl font-bold bg-linear-to-r from-blue-300 via-violet-300 to-purple-400 bg-clip-text text-transparent">
              Stack Tecnológico
            </h2>
            <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
              {STACK.map((item) => (
                <TechCard key={item.title} {...item} />
              ))}
            </div>
          </motion.div>
        )}

        {current === 2 && (
          <motion.div key="projects" {...fade}
            className="flex flex-col items-center justify-center gap-10 h-screen px-16"
          >
            <h2 className="text-4xl font-bold bg-linear-to-r from-blue-300 via-violet-300 to-purple-400 bg-clip-text text-transparent">
              Proyectos
            </h2>
            <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
              {PROJECTS.map(p => <ProjectCard key={p.title} {...p} />)}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {SECTIONS.map((section, i) => (
          <button key={section.key} onClick={() => goTo(i)}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <span className={`block w-2 h-2 rounded-full transition-all duration-300 ${
              current === i ? 'bg-violet-400 scale-125' : 'bg-white/30 group-hover:bg-violet-400/60'
            }`} />
            <span className={`text-xs tracking-widest uppercase transition-all duration-300 ${
              current === i ? 'text-violet-300 opacity-100' : 'text-white/40 opacity-0 group-hover:opacity-100'
            }`}>
              {section.label}
            </span>
          </button>
        ))}
      </nav>

      {current > 0 && (
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 border border-violet-400/50 rounded-full text-violet-200 hover:bg-violet-500/20 hover:border-violet-400 transition-all cursor-pointer"
        >
          <ChevronUp className="size-5" />
        </Button>
      )}
      {current < SECTIONS.length - 1 && (
        <Button variant="ghost" size="icon" onClick={() => navigate(1)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 border border-violet-400/50 rounded-full text-violet-200 hover:bg-violet-500/20 hover:border-violet-400 transition-all cursor-pointer"
        >
          <ChevronDown className="size-5" />
        </Button>
      )}
    </div>
  )
}
