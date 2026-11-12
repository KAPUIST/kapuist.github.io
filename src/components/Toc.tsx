import { useEffect, useState } from 'react'

type TocItem = { id: string; text: string; level: number }

const OFFSET = 96

export default function Toc({ slug }: { slug: string }) {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    let headings: HTMLElement[] = []
    const update = () => {
      const passed = headings.filter(heading => heading.getBoundingClientRect().top <= OFFSET + 8)
      setActiveId(passed.at(-1)?.id ?? '')
    }
    // 본문(MDX)이 그려진 다음 프레임에 제목을 읽는다.
    const frame = requestAnimationFrame(() => {
      headings = Array.from(document.querySelectorAll<HTMLElement>('.prose h2, .prose h3'))
      headings.forEach((heading, index) => { heading.id = `section-${index + 1}` })
      setItems(headings.map(heading => ({ id: heading.id, text: heading.textContent ?? '', level: heading.tagName === 'H3' ? 3 : 2 })))
      update()
    })
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [slug])

  if (items.length < 2) return null

  const jump = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - OFFSET, behavior: reduced ? 'auto' : 'smooth' })
  }

  return <aside className="toc-rail"><nav className="toc" aria-label="목차"><ul>
    {items.map(item => <li key={item.id} className={item.level === 3 ? 'toc-sub' : undefined}>
      <button type="button" className={item.id === activeId ? 'active' : undefined} aria-current={item.id === activeId ? 'location' : undefined} onClick={() => jump(item.id)}>{item.text}</button>
    </li>)}
  </ul></nav></aside>
}
