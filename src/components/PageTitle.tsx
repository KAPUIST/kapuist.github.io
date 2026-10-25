import { useEffect } from 'react'
import { site } from '../site'

export default function PageTitle({ title }: { title?: string }) {
  useEffect(() => { document.title = title ? `${title} · ${site.title}` : site.title }, [title])
  return null
}
