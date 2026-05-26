'use client'
import { Sidebar, SidebarBody } from './ui/sidebar'
import { Avatar, AvatarImage } from './ui/avatar'

export default function SidebarComponent () {
  return (
    <Sidebar animate={false}>
      <SidebarBody className='justify-between gap-10 h-screen '>
        <Logo />
      </SidebarBody>
    </Sidebar>
  )
}
export const LogoIcon = (): React.ReactElement => {
  return (
    <Avatar>
      <AvatarImage src='/Logo.svg' />
    </Avatar>
  )
}
export const Logo = (): React.ReactElement => {
  return (
    <a
      href='#'
      className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black'
    >
      <LogoIcon />
      <span className='font-medium whitespace-pre text-black dark:text-white'>
        OctoSpark
      </span>
    </a>
  )
}
