import { useEffect, useRef, useState } from 'react'
import { init, use as registerCharts } from 'echarts/core'
import type { EChartsType } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'

registerCharts([LineChart, GridComponent, TooltipComponent, SVGRenderer])
const steps = (count: number) => Math.floor(Math.log2(count)) + 1
const format = (count: number) => count.toLocaleString('ko-KR')

export default function ComplexityChart() {
  const [count, setCount] = useState(128)
  const container = useRef<HTMLDivElement>(null)
  const chart = useRef<EChartsType | null>(null)
  useEffect(() => {
    if (!container.current) return
    const instance = init(container.current, undefined, { renderer: 'svg' })
    chart.current = instance
    const observer = new ResizeObserver(() => instance.resize())
    observer.observe(container.current)
    return () => { observer.disconnect(); instance.dispose(); chart.current = null }
  }, [])
  useEffect(() => {
    const xs = Array.from(new Set([1, ...Array.from({ length: 31 }, (_, i) => Math.max(1, Math.round(count * (i + 1) / 31)))]))
    chart.current?.setOption({
      animation: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      animationDurationUpdate: 180,
      grid: { left: 52, right: 22, top: 30, bottom: 45 },
      tooltip: { trigger: 'axis', confine: true },
      xAxis: { type: 'value', name: '아이템 수', nameLocation: 'middle', nameGap: 28, min: 1, max: count, axisLabel: { color: '#62665c' }, splitLine: { show: false } },
      yAxis: { type: 'value', name: '최대 비교 횟수', min: 0, max: count, axisLabel: { color: '#62665c' }, splitLine: { lineStyle: { color: '#e3e5db' } } },
      series: [
        { name: '순차 탐색', type: 'line', showSymbol: false, lineStyle: { width: 2.5, color: '#a66b46' }, itemStyle: { color: '#a66b46' }, data: xs.map(x => [x, x]) },
        { name: '이진 탐색', type: 'line', showSymbol: false, lineStyle: { width: 2.5, color: '#3e644d' }, itemStyle: { color: '#3e644d' }, data: xs.map(x => [x, steps(x)]) },
      ],
    })
  }, [count])
  return <figure className="experiment">
    <figcaption><strong>아이템 수를 바꿔 보세요.</strong><span>정렬된 배열에서 두 탐색 방식 비교하기</span></figcaption>
    <div className="range-heading"><label htmlFor="item-count">아이템 수</label><output htmlFor="item-count">{format(count)}개</output></div>
    <input id="item-count" type="range" min="8" max="1024" step="1" value={count} onChange={event => setCount(Number(event.target.value))} />
    <div className="range-ends"><span>8개</span><span>1,024개</span></div>
    <div ref={container} className="chart" role="img" aria-label={`아이템 ${format(count)}개에서 순차 탐색 최대 ${format(count)}회, 이진 탐색 최대 ${steps(count)}회 비교`} />
    <dl className="chart-results" aria-live="polite"><div><dt><i className="linear-dot" />순차 탐색</dt><dd>최대 {format(count)}회</dd></div><div><dt><i className="binary-dot" />이진 탐색</dt><dd>최대 {steps(count)}회</dd></div></dl>
    <p className="experiment-note">이론상 최악의 비교 횟수입니다. 정렬 비용은 제외하며, 실제 실행 시간이나 DB 성능 측정값이 아닙니다.</p>
  </figure>
}
