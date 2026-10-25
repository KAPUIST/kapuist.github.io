import type { ComponentType } from 'react'

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  interactive?: boolean
  example?: boolean
}
interface PostModule { default: ComponentType; meta: PostMeta }
const modules = import.meta.glob<PostModule>('./posts/*.mdx', { eager: true })
export const posts = Object.values(modules)
  .map(({ default: Content, meta }) => ({ Content, meta }))
  .sort((a, b) => b.meta.date.localeCompare(a.meta.date) || a.meta.slug.localeCompare(b.meta.slug))
