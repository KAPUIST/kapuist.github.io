import { lazy, Suspense } from 'react'
const ComplexityChart = lazy(() => import('./ComplexityChart'))
export default function InteractiveSearch() {
  return <Suspense fallback={<div className="chart-loading" role="status">그래프를 준비하고 있어요…</div>}><ComplexityChart /></Suspense>
}
