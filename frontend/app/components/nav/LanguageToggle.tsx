// 'use client'

// import { useState } from 'react'
// import { motion } from 'framer-motion'

// const LANGUAGES = [
//   { code: 'EN', label: 'EN' },
//   { code: 'CN', label: 'CN' },
// ]

// export default function LanguageToggle({
//   onChange,
// }: {
//   onChange?: (lang: 'EN' | 'CN') => void
// }) {
//   const [language, setLanguage] = useState<'EN' | 'CN'>('EN')

//   const handleChange = (lang: 'EN' | 'CN') => {
//     setLanguage(lang)
//     onChange?.(lang)
//   }

//   return (
//     <div className='flex bg-[#05161F] rounded-full relative'>
//       {LANGUAGES.map((lang) => (
//         <button
//           key={lang.code}
//           onClick={() => handleChange(lang.code as 'EN' | 'CN')}
//           className='relative min-w-[2.3rem] lg:min-w-[2.3rem] px-[0.5rem] lg:px-3 transition-colors duration-300'
//           style={{ zIndex: 1 }}
//         >
//           <span
//             className={`relative z-10 transition-colors duration-300 ${
//               language === lang.code ? 'text-[#05161F]' : 'text-[#E9EDB9]'
//             }`}
//           >
//             {lang.label}
//           </span>
//           {language === lang.code && (
//             <motion.span
//               layoutId='lang-toggle'
//               className='absolute inset-0 rounded-full bg-[#E9EDB9] -z-10'
//               transition={{ type: 'spring', stiffness: 400, damping: 30 }}
//             />
//           )}
//         </button>
//       ))}
//     </div>
//   )
// }

'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { routing } from '@/i18n/routing'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'cn', label: 'CN' },
]

export default function LanguageToggle() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  console.log(routing.locales, 'routing.locales')
  const handleChange = (newLocale: string) => {
    // Remove current locale from pathname
    const pathSegments = pathname.split('/').filter(Boolean)
    if (routing.locales.includes(pathSegments[0] as any)) {
      pathSegments.shift()
    }
    const pathWithoutLocale =
      pathSegments.length > 0 ? `/${pathSegments.join('/')}` : ''

    // Always add the locale prefix, even for 'en'
    const newPath = `/${newLocale}${pathWithoutLocale}`

    if (pathname !== newPath) {
      router.push(newPath)
    }
  }
  return (
    <div className='flex bg-[#05161F] rounded-full relative'>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          className='relative min-w-[2.3rem] lg:min-w-[2.3rem] px-[0.5rem] lg:px-3 transition-colors duration-300'
          style={{ zIndex: 1 }}
        >
          <span
            className={`relative z-10 transition-colors duration-300 ${
              locale === lang.code ? 'text-[#05161F]' : 'text-[#E9EDB9]'
            }`}
          >
            {lang.label}
          </span>
          {locale === lang.code && (
            <motion.span
              layoutId='lang-toggle'
              className='absolute inset-0 rounded-full bg-[#E9EDB9] -z-10'
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
