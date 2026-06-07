'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import LanguageToggle from './LanguageToggle'
import { SITE_TITLE } from '@/app/lib/siteMetadata'

const logoMaskStyle: CSSProperties = {
  aspectRatio: '1212.4459 / 647.016',
  WebkitMaskImage: 'url(/images/t2-logo.svg)',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  WebkitMaskSize: 'contain',
  maskImage: 'url(/images/t2-logo.svg)',
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
  maskSize: 'contain',
}

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
    <nav className='flex justify-between items-center w-full relative'>
      <div className='flex items-center gap-x-2 max-[400px]:gap-x-1 min-[900px]:gap-x-4 w-full justify-between min-[900px]:w-auto min-[900px]:justify-start leading-[1.15]'>
        <LanguageToggle />
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`
              px-[0.5rem] max-[400px]:px-[0.375rem] md:px-[0.625rem] lg:px-3 rounded-full
              transition-all duration-200
              relative isolate overflow-hidden
              ${
                pathname.startsWith(link.match)
                  ? 'nav-dynamic-pill text-[var(--site-paper)] [text-shadow:0_1px_2px_rgba(5,22,31,0.5)]'
                  : 'bg-[var(--site-paper)] text-[var(--site-ink)] shadow-[2px_2px_4px_rgba(0,0,0,0.3),-1px_-1px_3px_rgba(255,255,255,0.4)] hover:bg-[var(--site-paper)] hover:text-[var(--site-ink)] hover:shadow-[inset_2px_2px_4px_rgba(5,22,31,0.34),inset_-1px_-1px_3px_rgba(255,255,255,0.45),0_0_12px_rgba(233,237,185,0.34)]'
              }
            `}
          >
            <span className='relative z-10'>{link.label}</span>
          </Link>
        ))}
      </div>
      {pathname.startsWith(`/${locale}/shop`) ? null : (
        <Link
          href={`/${locale}`}
          aria-label={`${SITE_TITLE} home`}
          className='fixed bottom-4 left-1/2 -translate-x-1/2 min-[900px]:static min-[900px]:left-auto min-[900px]:translate-x-0 inline-flex items-center justify-center leading-none text-[1.65rem] text-[var(--site-paper)] transition-[color,filter] duration-200 hover:text-[var(--site-paper)] hover:drop-shadow-[0_0_8px_rgba(233,237,185,0.72)] focus-visible:text-[var(--site-paper)] focus-visible:drop-shadow-[0_0_8px_rgba(233,237,185,0.72)] focus-visible:outline-none min-[900px]:text-[2.5rem]'
        >
          <span
            className='block w-8 min-[900px]:w-12 bg-current'
            style={logoMaskStyle}
            aria-hidden='true'
          />
        </Link>
      )}
    </nav>
  )
}
