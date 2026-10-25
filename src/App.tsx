import { Component, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { HashRouter, Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { posts } from './content'
import { site } from './site'
import './App.css'
import Arrow from './components/Arrow'
import PageTitle from './components/PageTitle'
import BlogPage from './pages/BlogPage'
import AboutPage from './pages/AboutPage'

const currentYear = new Date().getFullYear()

function ScrollToPage() {
  const { pathname } = useLocation()
  const previous = useRef(pathname)
  useEffect(() => {
    window.scrollTo(0, 0)
    if (previous.current !== pathname) document.getElementById('main')?.focus()
    previous.current = pathname
  }, [pathname])
  return null
}
function Post() {
  const { slug } = useParams()
  const post = posts.find(item => item.meta.slug === slug)
  if (!post) return <NotFound />
  const { meta, Content } = post
  return <article className="article-page"><PageTitle title={meta.title} /><Link className="back-link" to="/"><Arrow back /> 모든 글</Link>
    <header className="article-header"><div className="article-meta"><span>{meta.category}</span><time dateTime={meta.date}>{meta.date.replaceAll('-', '.')}</time>{meta.example && <span>예제 글</span>}</div><h1>{meta.title}</h1><p>{meta.description}</p></header>
    <div className="prose"><Content /></div>
    <div className="article-end"><Link to="/">글 목록 <Arrow /></Link></div>
  </article>
}
function NotFound() {
  return <section className="empty-state not-found"><PageTitle title="글을 찾을 수 없어요" /><h1>글을 찾을 수 없어요.</h1><p>주소가 바뀌었거나 아직 작성하지 않은 글이에요.</p><Link to="/">전체 글로 돌아가기 <Arrow /></Link></section>
}
class PageErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return <section className="empty-state"><h1>페이지를 불러오지 못했어요.</h1><p>새로고침 후 다시 시도해 주세요.</p><button onClick={() => window.location.reload()}>새로고침</button></section>
    return this.props.children
  }
}
export default function App() {
  return <HashRouter><ScrollToPage /><a className="skip-link" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main')?.focus() }}>본문으로 건너뛰기</a><div className="site-shell">
    <header className="site-header"><Link className="wordmark" to="/" aria-label={`${site.title} 홈`}>{site.title}</Link><nav aria-label="주 메뉴"><NavLink to="/" end>글</NavLink><NavLink to="/about">About Me</NavLink></nav></header>
    <main id="main" tabIndex={-1}><PageErrorBoundary><Routes><Route path="/" element={<BlogPage />} /><Route path="/posts/:slug" element={<Post />} /><Route path="/about" element={<AboutPage />} /><Route path="*" element={<NotFound />} /></Routes></PageErrorBoundary></main>
    <footer className="site-footer"><span>{site.title}</span><span>{currentYear}</span></footer>
  </div></HashRouter>
}
