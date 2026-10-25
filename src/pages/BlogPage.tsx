import { Link, useSearchParams } from 'react-router-dom'
import { posts } from '../content'
import Arrow from '../components/Arrow'
import PageTitle from '../components/PageTitle'

export default function BlogPage() {
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
    <section aria-labelledby="posts-title" className="posts-section">
      <div className="section-heading"><h1 id="posts-title">글 <span>{posts.length}</span></h1>
        <label className="search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg><span className="sr-only">글 검색</span><input type="search" placeholder="글 검색" value={query} onChange={event => update('q', event.target.value)} /></label>
      </div>
      <div className="filters" aria-label="주제 필터">{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => update('category', item)}>{item}</button>)}</div>
      <p className="sr-only" role="status">{visible.length}개의 글</p>
      <div className="post-list">{visible.map(({ meta }) => <article className="post-row" key={meta.slug}>
        <div className="post-date"><time dateTime={meta.date}>{meta.date.replaceAll('-', '.')}</time><span>{meta.category}</span></div>
        <div className="post-summary"><div className="post-labels">{meta.example && <span className="example-label">예제 글</span>}{meta.interactive && <span className="interactive-label">직접 해보기</span>}</div><h2><Link to={`/posts/${meta.slug}`}>{meta.title}</Link></h2><p>{meta.description}</p><div className="tags">{meta.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
        <Link to={`/posts/${meta.slug}`} className="read-link" aria-label={`${meta.title} 읽기`}><Arrow /></Link>
      </article>)}</div>
      {visible.length === 0 && <div className="empty-state"><h3>아직 일치하는 글이 없어요.</h3><p>다른 단어로 검색하거나 전체 글을 살펴보세요.</p><button type="button" onClick={() => setParams({})}>전체 글 보기</button></div>}
      {posts.some(post => post.meta.example) && <p className="sample-note">예제 표시가 있는 글은 기능 확인용 샘플입니다.</p>}
    </section>
  </>
}
