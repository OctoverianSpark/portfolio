import React from 'react'
import { ContainerTextFlip } from './_components/ui/container-text-flip'
import { Avatar, AvatarImage } from './_components/ui/avatar'

export default function Page() {
  return (
    <div className="flex items-center gap-16 justify-center absolute inset-0">
      <Avatar className="scale-400">
        <AvatarImage src="/logo.png" />
      </Avatar>

      <div className="grid gap-6 place-items-center">
        <h1 className="text-6xl font-bold">Jean Rodriguez</h1>

        <div className="flex items-center" >
          <ContainerTextFlip  animationDuration={6000} className="min-w-[368px]" words={["Web", "Software", "Games"]} />
          <h1 className="text-6xl font-bold">Developer / Designer</h1>
        </div>
      </div>
    </div>
  )
}