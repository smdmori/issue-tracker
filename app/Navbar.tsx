"use client"

import classnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'
import { useSession } from "next-auth/react"
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'

const Navbar = () => {


  return (
    <nav className='px-6 mb-6 py-3 border-b'>
      <Container>
        <Flex justify={'between'}>
          <Flex align={'center'} gap={'3'}>
            <Link href={'/'}><AiFillBug /></Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession()
  if (status === 'loading') return null
  if (status === 'unauthenticated') return <Link href={'/api/auth/signin'} className='nav-link'>Sign In</Link>

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback={'?'}
            size={'2'}
            radius='full'
            className='cursor-pointer'
            referrerPolicy='no-referrer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size={'2'}>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            {status === "authenticated" && <Link href={'/api/auth/signout'}>Sign Out</Link>}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}
const NavLinks = () => {
  const currentPath = usePathname()

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ]

  return (
    <ul className='flex space-x-6'>
      {links.map(link =>
        <li key={link.href}>
          <Link
            className={classnames({
              'nav-link': true,
              '!text-zinc-900': currentPath === link.href,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      )}
    </ul>
  )
}

export default Navbar