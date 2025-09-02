'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import LanguageToggle from './LanguageToggle'

export default function HeaderNav() {
  const t = useTranslations('navigation')
  const locale = useLocale()
  const pathname = usePathname()

  const navLinks = [
    { href: `/${locale}/about`, label: t('about'), match: `/${locale}/about` },
    {
      href: `/${locale}/events`,
      label: t('events'),
      match: `/${locale}/events`,
    },
    {
      href: `/${locale}/artists`,
      label: t('artists'),
      match: `/${locale}/artists`,
    },
    { href: `/${locale}/shop`, label: t('shop'), match: `/${locale}/shop` },
  ]

  return (
    <nav className='flex justify-between items-center w-full z-[10000] relative mix-blend-difference  '>
      <div className='flex items-center lg:gap-x-4 gap-x-2 w-full justify-between lg:w-auto lg:justify-start leading-[1.15]'>
        <LanguageToggle />
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`bg-[#05161F] px-[0.5rem] lg:px-3 rounded-full hover:bg-[#E9EDB9] hover:text-[#05161F] ${
              pathname.startsWith(link.match)
                ? 'bg-[#E9EDB9] text-[#05161F]'
                : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      {pathname.startsWith(`/${locale}/shop`) ? null : (
        <Link
          href={`/${locale}`}
          className='w-10 lg:w-16 fixed bottom-4 left-1/2 -translate-x-1/2 lg:static lg:left-auto lg:translate-x-0'
        >
          <svg
            viewBox='0 0 572 255'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M319.801 3.82217C319.801 3.82217 378.501 247.922 378.901 250.522C365.301 250.522 335.701 250.222 335.701 250.222C335.701 250.222 325.201 216.822 320.901 202.222C304.501 202.222 228.501 202.322 228.501 202.322L226.501 210.522L215.601 250.222C215.601 250.222 186.101 250.522 171.901 250.522C179.401 219.922 186.701 190.422 194.001 160.922C206.201 111.822 232.501 3.82217 232.501 3.82217H319.801ZM312.101 160.522C303.001 122.422 284.101 42.9222 284.101 42.9222C284.101 42.9222 270.901 43.0222 267.401 43.0222C257.701 82.7222 248.201 121.222 238.601 160.522H312.101ZM499.801 121.922V159.022H527.901V211.922C508.301 214.722 491.601 215.122 473.601 213.722C454.001 212.222 440.501 198.822 436.201 180.322C433.101 167.022 431.001 153.222 431.001 139.622C431.001 119.522 431.801 99.2222 435.001 79.5222C438.801 56.4222 451.801 45.2222 475.901 42.4222C488.801 40.9222 502.001 41.3222 515.001 42.0222C533.401 42.9222 551.701 44.8222 571.001 46.4222V9.72217C536.801 3.12217 502.401 -2.07783 467.201 0.822174C427.901 4.12217 402.701 23.4222 392.901 60.0222C381.101 104.022 381.301 148.622 392.701 192.722C401.901 228.322 426.601 248.822 464.501 253.022C500.401 257.022 535.901 251.422 571.601 246.222V121.922H499.801ZM185.101 4.52217H0.700676V45.0222H71.2007V249.922H115.701V44.9222H185.101V4.52217ZM24.1007 204.322C10.7007 204.622 0.100676 215.122 0.000676427 228.122C-0.0993236 241.522 10.9007 252.022 24.8007 251.922C38.7007 251.822 49.7007 241.122 49.5007 227.822C49.4007 214.822 37.7007 204.022 24.1007 204.322Z'
              fill='currentColor'
            />
          </svg>
        </Link>
      )}
    </nav>
  )
}
