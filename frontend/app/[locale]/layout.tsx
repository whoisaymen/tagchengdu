import './globals.css'

import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { VisualEditing, toPlainText } from 'next-sanity'
import { Toaster } from 'sonner'

import DraftModeToast from '@/app/components/DraftModeToast'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import * as demo from '@/sanity/lib/demo'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { settingsQuery } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { handleError } from '../client-utils'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

// Fonts
import localFont from 'next/font/local'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import AnimatedBackground from '../components/global/AnimatedBackground'
import AnimatedSwirl from '../components/global/AnimatedSwirl'

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  })
  const title = settings?.title || demo.title
  const description = settings?.description || demo.description

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

const kleber = localFont({
  src: '../../public/fonts/KleberUnlicensedTrialVersion-Stark.otf',
  display: 'swap',
  variable: '--font-kleber',
})

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { isEnabled: isDraftMode } = await draftMode()
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable} ${kleber.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <AnimatedBackground />

          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          <Toaster />

          {isDraftMode && (
            <>
              <DraftModeToast />
              {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
              <VisualEditing />
            </>
          )}
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
          <SanityLive onError={handleError} />
          <div className='relative mix-blend-difference z-[100000]'>
            <Header />
          </div>

          <main className='h-svh overflow-y-scroll no-scrollbar'>
            <AnimatedSwirl />
            {children}
          </main>
          {/* <Footer /> */}
          <div
            className='
    pointer-events-none
    fixed inset-0 z-30
    mix-blend-screen
    opacity-25
   '
            style={{
              background: 'linear-gradient(120deg, #05161F 0%, #05161F 100%)',
              filter: 'hue-rotate(-10deg) blur(0px)',
            }}
          >
            {/* <div
              style={{
                width: '100%',
                height: '100%',
                opacity: 0.18,
                backgroundImage: `url("data:image/svg+xml;utf8,<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.5'/></svg>")`,
                pointerEvents: 'none',
                position: 'absolute',
                inset: 0,
              }}
            /> */}
          </div>

          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
