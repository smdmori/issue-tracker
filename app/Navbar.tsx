import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'

const Navbar = () => {
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]

  return (
    <nav className='flex space-x-6 px-6 mb-6 h-14 border-b items-center'>
      <Link href={'/'}><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        {links.map(link =>
          <li key={link.href}>
            <Link
              className='text-zinc-500 hover:text-zinc-800 transition-colors'
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