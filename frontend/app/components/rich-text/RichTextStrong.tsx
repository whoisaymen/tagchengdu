import type { ReactNode } from 'react'

export default function RichTextStrong({ children }: { children: ReactNode }) {
  return <strong className='rich-text-strong'>{children}</strong>
}
