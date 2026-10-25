import { Component, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { HashRouter, Link, NavLink, Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { posts } from './content'
import { site } from './site'
import './App.css'

const currentYear = new Date().getFullYear()

function Arrow({ back = false }: { back?: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" style={back ? { transform: 'rotate(180deg)' } : undefined}><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
}
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
function PageTitle({ title }: { title?: string }) {
  useEffect(() => { document.title = title ? `${title} · ${site.title}` : site.title }, [title])
  return null
}
function Notes() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const category = params.get('category') ?? '전체'
  const categories = ['전체', ...new Set(posts.map(post => post.meta.category))]
  const visible = posts.filter(({ meta }) =>
    (category === '전체' || meta.category === category) &&
    `${meta.title} ${meta.description} ${meta.tags.join(' ')}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
  )
  function update(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (value && value !== '전체') next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }
  return <>
    <PageTitle />
    <section className="introduction"><h1>배운 것을<br /><span>내 언어로 기록합니다.</span></h1><p>{site.description}</p></section>
    <section aria-labelledby="notes-title" className="notes-section">
      <div className="section-heading"><h2 id="notes-title">학습 노트 <span>{posts.length}</span></h2>
        <label className="search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg><span className="sr-only">글 검색</span><input type="search" placeholder="궁금한 주제 찾기" value={query} onChange={event => update('q', event.target.value)} /></label>
      </div>
      <div className="filters" aria-label="주제 필터">{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => update('category', item)}>{item}</button>)}</div>
      <p className="sr-only" role="status">{visible.length}개의 글</p>
      <div className="post-list">{visible.map(({ meta }) => <article className="post-row" key={meta.slug}>
        <div className="post-date"><time dateTime={meta.date}>{meta.date.replaceAll('-', '.')}</time><span>{meta.category}</span></div>
        <div className="post-summary"><div className="post-labels">{meta.example && <span className="example-label">예제 글</span>}{meta.interactive && <span className="interactive-label">직접 해보기</span>}</div><h3><Link to={`/posts/${meta.slug}`}>{meta.title}</Link></h3><p>{meta.description}</p><div className="tags">{meta.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
        <Link to={`/posts/${meta.slug}`} className="read-link" aria-label={`${meta.title} 읽기`}><Arrow /></Link>
      </article>)}</div>
      {visible.length === 0 && <div className="empty-state"><h3>아직 일치하는 글이 없어요.</h3><p>다른 단어로 검색하거나 전체 글을 살펴보세요.</p><button type="button" onClick={() => setParams({})}>전체 글 보기</button></div>}
      {posts.some(post => post.meta.example) && <p className="sample-note">예제 글은 글 작성과 인터랙티브 기능을 살펴보기 위한 샘플입니다.</p>}
    </section>
  </>
}
function Post() {
  const { slug } = useParams()
  const post = posts.find(item => item.meta.slug === slug)
  if (!post) return <NotFound />
  const { meta, Content } = post
  return <article className="article-page"><PageTitle title={meta.title} /><Link className="back-link" to="/"><Arrow back /> 모든 글</Link>
    <header className="article-header"><div className="article-meta"><span>{meta.category}</span><time dateTime={meta.date}>{meta.date.replaceAll('-', '.')}</time>{meta.example && <span>예제 글</span>}</div><h1>{meta.title}</h1><p>{meta.description}</p></header>
    <div className="prose"><Content /></div>
    <div className="article-end"><span>이해한 만큼, 한 편씩.</span><Link to="/">다른 노트 읽기 <Arrow /></Link></div>
  </article>
}
function About() {
  return <section className="about-page prose"><PageTitle title="이 블로그" /><h1>이 블로그에 대하여</h1><p>기술을 하나씩 공부하고, 이해한 내용을 내 언어로 정리하는 공간입니다.</p><p>게임의 인벤토리, 거래소, 랭킹처럼 구체적인 상황에 기술을 대입해 봅니다. 코드와 그림으로 설명하고, 필요할 때는 직접 값을 바꿔 볼 수 있는 작은 예제를 곁들입니다.</p><h2>기록하고 싶은 것</h2><ul><li>어떤 문제를 풀려고 공부했는지</li><li>어떻게 동작하고, 왜 그런 선택을 했는지</li><li>어디까지 확인했고, 무엇이 아직 궁금한지</li></ul><p className="muted">소개 문구와 블로그 이름은 초기 설정입니다. 나만의 문장으로 바꿔 주세요.</p><Link className="back-link" to="/">학습 노트 읽기 <Arrow /></Link></section>
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
    <header className="site-header"><Link className="wordmark" to="/" aria-label={`${site.title} 홈`}><svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 5h8c2 0 2 2 2 2s0-2 2-2h8v18h-8c-2 0-2 1-2 1s0-1-2-1H4zM14 7v17M7 10h4M7 14h4M17 10h4M17 14h4" /></svg>{site.title}</Link><nav aria-label="주 메뉴"><NavLink to="/" end>글</NavLink><NavLink to="/about">이 블로그</NavLink></nav></header>
    <main id="main" tabIndex={-1}><PageErrorBoundary><Routes><Route path="/" element={<Notes />} /><Route path="/posts/:slug" element={<Post />} /><Route path="/about" element={<About />} /><Route path="*" element={<NotFound />} /></Routes></PageErrorBoundary></main>
    <footer className="site-footer"><span>{site.title}</span><span>조금씩 배우고, 차곡차곡 기록하기.</span><span>{currentYear}</span></footer>
  </div></HashRouter>
}
