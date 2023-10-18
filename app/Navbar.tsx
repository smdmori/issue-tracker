"use client"

import classnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'

const Navbar = () => {
  const currentPath = usePathname()

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ]

  return (
    <nav className='flex space-x-6 px-6 mb-6 h-14 border-b items-center'>
      <Link href={'/'}><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        {links.map(link =>
          <li key={link.href}>
            <Link
              className={classnames({
                'text-zinc-900': currentPath === link.href,
                'text-zinc-500': currentPath !== link.href,
                'hover:text-zinc-800 transition-colors': true
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar