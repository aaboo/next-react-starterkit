'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import { useAnimateOnView } from '@/hooks/useAnimateOnView'
import { Copy, Check, LayoutDashboard, FileText, Grid3X3, Lock, Layers } from 'lucide-react'

// ─────────────────────────────────────────────
// 코드 블록 컴포넌트
// ─────────────────────────────────────────────
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-lg bg-zinc-950 text-zinc-100 text-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
        <span className="text-zinc-400 text-xs">JSX / Tailwind CSS</span>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 px-2 text-zinc-400 hover:text-zinc-100"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span className="ml-1 text-xs">{copied ? '복사됨' : '복사'}</span>
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

// ─────────────────────────────────────────────
// 레이아웃 1: 랜딩 페이지 레이아웃
// ─────────────────────────────────────────────
function LandingPreview() {
  return (
    <div className="rounded-lg border bg-background overflow-hidden text-[10px] sm:text-xs">
      {/* 헤더 */}
      <div className="bg-zinc-900 text-white px-4 py-2 flex items-center justify-between">
        <span className="font-bold">Logo</span>
        <div className="flex gap-3 text-zinc-300">
          <span>홈</span><span>소개</span><span>가격</span>
        </div>
        <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-[9px]">시작하기</span>
      </div>
      {/* 히어로 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-800 dark:to-zinc-900 py-8 px-4 text-center">
        <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full text-[9px] mb-3">New Release v2.0</div>
        <div className="text-base font-bold mb-2">현대적인 웹 서비스를 위한<br />최고의 솔루션</div>
        <div className="text-zinc-500 dark:text-zinc-400 mb-4 text-[9px]">간단하고 빠르게 시작할 수 있는 풀스택 플랫폼</div>
        <div className="flex gap-2 justify-center">
          <span className="bg-blue-500 text-white px-3 py-1 rounded text-[9px]">무료 시작</span>
          <span className="border border-zinc-300 dark:border-zinc-600 px-3 py-1 rounded text-[9px]">데모 보기</span>
        </div>
      </div>
      {/* 피처 */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-background">
        {['빠른 속도', '안전한 보안', '쉬운 확장'].map((f) => (
          <div key={f} className="border rounded p-2 text-center">
            <div className="w-4 h-4 rounded bg-blue-100 dark:bg-blue-900/30 mx-auto mb-1" />
            <div className="font-medium text-[9px]">{f}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const landingCode = `{/* ① 전체 페이지를 flex 세로 방향으로 구성 */}
<div className="flex flex-col min-h-screen">

  {/* ② Sticky 헤더 - 스크롤해도 상단 고정 */}
  <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <span className="font-bold text-lg">Logo</span>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#">홈</a>
          <a href="#">소개</a>
          <a href="#">가격</a>
        </nav>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm">
          시작하기
        </button>
      </div>
    </div>
  </header>

  {/* ③ 히어로 섹션 - 화면 전체 높이 중앙 배치 */}
  <section className="flex flex-1 flex-col items-center justify-center
                      bg-gradient-to-br from-blue-50 to-indigo-100
                      py-24 px-4 text-center">
    <span className="mb-4 rounded-full bg-blue-100 px-4 py-1.5 text-sm text-blue-600">
      New Release v2.0
    </span>
    <h1 className="text-5xl font-bold tracking-tight mb-6">
      현대적인 웹 서비스를 위한<br />최고의 솔루션
    </h1>
    <p className="max-w-xl text-lg text-muted-foreground mb-8">
      간단하고 빠르게 시작할 수 있는 풀스택 플랫폼
    </p>
    <div className="flex gap-4">
      <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg">
        무료 시작
      </button>
      <button className="border px-6 py-3 rounded-lg">데모 보기</button>
    </div>
  </section>

  {/* ④ 피처 섹션 - 3열 그리드 */}
  <section className="py-24 px-4">
    <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((f) => (
        <div key={f.title} className="rounded-xl border p-6">
          <div className="mb-4 rounded-lg bg-blue-100 p-3 inline-block">
            <f.icon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
          <p className="text-muted-foreground">{f.description}</p>
        </div>
      ))}
    </div>
  </section>

  {/* ⑤ 푸터 */}
  <footer className="border-t py-8 px-4 text-center text-sm text-muted-foreground">
    © 2025 MyApp. All rights reserved.
  </footer>
</div>`

// ─────────────────────────────────────────────
// 레이아웃 2: 대시보드 레이아웃
// ─────────────────────────────────────────────
function DashboardPreview() {
  return (
    <div className="rounded-lg border bg-background overflow-hidden flex text-[10px] sm:text-xs" style={{ minHeight: 220 }}>
      {/* 사이드바 */}
      <div className="w-20 bg-zinc-900 text-white flex flex-col p-2 shrink-0">
        <div className="font-bold text-[10px] mb-3 text-zinc-300">Dashboard</div>
        {['개요', '분석', '사용자', '설정'].map((m) => (
          <div key={m} className={`px-2 py-1 rounded mb-1 text-[9px] ${m === '개요' ? 'bg-blue-500 text-white' : 'text-zinc-400 hover:text-white'}`}>
            {m}
          </div>
        ))}
      </div>
      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 상단 헤더 */}
        <div className="border-b px-3 py-2 flex items-center justify-between bg-background">
          <span className="font-semibold text-[10px]">개요</span>
          <div className="w-5 h-5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        </div>
        {/* 콘텐츠 */}
        <div className="flex-1 p-3 overflow-auto">
          {/* 스탯 카드 */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[['방문자', '12,345'], ['전환율', '3.2%']].map(([label, val]) => (
              <div key={label} className="border rounded p-2">
                <div className="text-zinc-400 text-[8px]">{label}</div>
                <div className="font-bold text-sm">{val}</div>
              </div>
            ))}
          </div>
          {/* 차트 자리 */}
          <div className="border rounded p-2 h-12 flex items-center justify-center text-zinc-400 text-[8px]">
            차트 영역
          </div>
        </div>
      </div>
    </div>
  )
}

const dashboardCode = `{/* ① 전체: 가로 flex - 사이드바 + 메인 */}
<div className="flex h-screen overflow-hidden">

  {/* ② 사이드바 - 고정 너비, 스크롤 가능 */}
  <aside className="w-64 shrink-0 overflow-y-auto border-r bg-zinc-900 text-white">
    <div className="sticky top-0 p-4 border-b border-zinc-800">
      <span className="font-bold text-lg">Dashboard</span>
    </div>
    <nav className="p-3 space-y-1">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
            isActive(item)
              ? "bg-blue-600 text-white"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </a>
      ))}
    </nav>
  </aside>

  {/* ③ 메인 영역: 세로 flex - 헤더 + 콘텐츠 */}
  <div className="flex flex-1 flex-col overflow-hidden min-w-0">

    {/* 상단 헤더 - sticky */}
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between
                       border-b bg-background px-6">
      <h1 className="text-lg font-semibold">{pageTitle}</h1>
      <div className="flex items-center gap-3">
        <button className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <Avatar className="h-8 w-8" />
      </div>
    </header>

    {/* 스크롤 가능한 콘텐츠 영역 */}
    <main className="flex-1 overflow-y-auto p-6">

      {/* 통계 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-xs text-green-600 mt-1">↑ {stat.change}</p>
          </div>
        ))}
      </div>

      {/* 메인 콘텐츠: 차트(2/3) + 사이드(1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border p-4">
          <h2 className="font-semibold mb-4">방문자 추이</h2>
          <Chart data={chartData} />
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-4">최근 활동</h2>
          <ActivityList items={activities} />
        </div>
      </div>
    </main>
  </div>
</div>`

// ─────────────────────────────────────────────
// 레이아웃 3: 블로그 아티클 레이아웃
// ─────────────────────────────────────────────
function BlogPreview() {
  return (
    <div className="rounded-lg border bg-background overflow-hidden text-[10px] sm:text-xs">
      <div className="border-b px-4 py-2 flex gap-4 text-zinc-400 text-[9px]">
        <span className="font-bold text-foreground text-[10px]">Blog</span>
        <span>홈</span><span>아티클</span><span>태그</span>
      </div>
      <div className="flex gap-0">
        {/* 아티클 */}
        <div className="flex-1 p-4 border-r min-w-0">
          <div className="text-[8px] text-blue-500 mb-1">Technology</div>
          <div className="font-bold text-xs mb-2">Next.js 15와 React 19의 새로운 기능들</div>
          <div className="flex gap-2 text-[8px] text-zinc-400 mb-3">
            <span>2025.04.12</span><span>·</span><span>5분 읽기</span>
          </div>
          <div className="space-y-1">
            {['서론', 'App Router의 변화', 'Server Actions', '마무리'].map((s) => (
              <div key={s} className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded" style={{ width: s === '서론' ? '100%' : s === 'App Router의 변화' ? '90%' : s === 'Server Actions' ? '85%' : '60%' }} />
            ))}
          </div>
        </div>
        {/* TOC 사이드바 */}
        <div className="w-24 p-3 shrink-0">
          <div className="font-semibold text-[9px] mb-2">목차</div>
          {['서론', 'App Router', 'Server Actions', '마무리'].map((h, i) => (
            <div key={h} className={`text-[8px] py-0.5 ${i === 0 ? 'text-blue-500 border-l-2 border-blue-500 pl-1' : 'text-zinc-400 pl-1'}`}>
              {h}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const blogCode = `{/* ① 외부 래퍼: max-width + 중앙 정렬 */}
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

  {/* ② 아티클 헤더 */}
  <header className="py-12 border-b mb-12">
    <div className="flex gap-2 mb-4">
      <Badge>Technology</Badge>
      <Badge variant="outline">Next.js</Badge>
    </div>
    <h1 className="text-4xl font-bold mb-4">
      Next.js 15와 React 19의 새로운 기능들
    </h1>
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <Avatar className="h-8 w-8" />
      <span>홍길동</span>
      <time>2025.04.12</time>
      <span>5분 읽기</span>
    </div>
  </header>

  {/* ③ 본문: 아티클(3/4) + 사이드바(1/4) - sticky TOC */}
  <div className="flex gap-12">

    {/* 메인 아티클 - prose로 타이포그래피 자동 적용 */}
    <article className="flex-1 min-w-0 prose prose-lg dark:prose-invert max-w-none">
      <h2 id="intro">서론</h2>
      <p>Next.js 15가 출시되면서 많은 변화가 생겼습니다...</p>

      <h2 id="app-router">App Router의 변화</h2>
      <p>App Router에서는 다음과 같은 기능이 추가되었습니다...</p>

      <h2 id="server-actions">Server Actions</h2>
      <p>Server Actions을 사용하면 클라이언트에서 서버 함수를...</p>
    </article>

    {/* TOC 사이드바 - sticky로 스크롤 따라옴 */}
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-24">
        <p className="text-sm font-semibold mb-3">목차</p>
        <nav className="space-y-1 border-l border-border pl-3">
          {headings.map((h) => (
            <a
              key={h.id}
              href={\`#\${h.id}\`}
              className={cn(
                "block text-sm py-0.5 transition-colors",
                activeHeading === h.id
                  ? "text-primary font-medium border-l-2 border-primary -ml-[13px] pl-3"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {h.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  </div>
</div>`

// ─────────────────────────────────────────────
// 레이아웃 4: 카드 그리드 레이아웃
// ─────────────────────────────────────────────
function GridPreview() {
  const items = ['디자인', '개발', '마케팅', '분석', '보안', '인프라']
  return (
    <div className="rounded-lg border bg-background overflow-hidden text-[10px] sm:text-xs">
      <div className="border-b px-4 py-2 flex items-center justify-between">
        <span className="font-bold">프로젝트</span>
        <div className="flex gap-1">
          <span className="border rounded px-2 py-0.5 text-[8px]">전체</span>
          <span className="border rounded px-2 py-0.5 text-[8px] bg-blue-50 dark:bg-blue-900/30 text-blue-600">개발</span>
          <span className="border rounded px-2 py-0.5 text-[8px]">디자인</span>
        </div>
      </div>
      <div className="p-3 flex gap-3">
        {/* 필터 사이드 */}
        <div className="w-16 shrink-0">
          <div className="text-[8px] font-semibold mb-1 text-zinc-400">카테고리</div>
          {['전체', '개발', '디자인', '기타'].map((c) => (
            <div key={c} className={`text-[8px] py-0.5 px-1 rounded mb-0.5 ${c === '개발' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : 'text-zinc-500'}`}>{c}</div>
          ))}
        </div>
        {/* 카드 그리드 */}
        <div className="grid grid-cols-2 gap-2 flex-1">
          {items.slice(0, 4).map((item) => (
            <div key={item} className="border rounded p-2">
              <div className="h-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-zinc-700 dark:to-zinc-800 rounded mb-1" />
              <div className="font-medium text-[8px]">{item}</div>
              <div className="text-zinc-400 text-[7px]">설명 텍스트</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const gridCode = `{/* ① 페이지 전체: flex 세로 */}
<div className="min-h-screen flex flex-col">

  {/* ② 검색/필터 바 */}
  <div className="sticky top-16 z-10 border-b bg-background/95 backdrop-blur-sm">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3
                    flex items-center gap-3 flex-wrap">
      <Input placeholder="검색..." className="max-w-xs" />
      <div className="flex gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition-colors",
              filter === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:border-primary hover:text-primary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="ml-auto flex gap-1">
        <button onClick={() => setView('grid')} className={cn("p-1.5 rounded", view === 'grid' && 'bg-accent')}>
          <Grid3X3 className="h-4 w-4" />
        </button>
        <button onClick={() => setView('list')} className={cn("p-1.5 rounded", view === 'list' && 'bg-accent')}>
          <List className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>

  {/* ③ 메인: 필터 사이드바(1/4) + 카드 그리드(3/4) */}
  <div className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 py-8 flex gap-8">

    {/* 필터 사이드바 */}
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-32 space-y-6">
        <div>
          <h3 className="font-semibold mb-3">카테고리</h3>
          <div className="space-y-1">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={selected.includes(cat)}
                          onCheckedChange={() => toggle(cat)} />
                <span className="text-sm">{cat}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>

    {/* 카드 그리드 */}
    <main className="flex-1 min-w-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id}
               className="group rounded-xl border bg-card overflow-hidden
                          hover:shadow-lg hover:border-primary/50 transition-all">
            <div className="aspect-video bg-muted overflow-hidden">
              <img src={item.image} alt={item.title}
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <Badge variant="secondary" className="mb-2">{item.category}</Badge>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
</div>`

// ─────────────────────────────────────────────
// 레이아웃 5: 인증 화면 레이아웃
// ─────────────────────────────────────────────
function AuthPreview() {
  return (
    <div className="rounded-lg border bg-background overflow-hidden flex text-[10px] sm:text-xs" style={{ minHeight: 200 }}>
      {/* 브랜드 패널 */}
      <div className="w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-4 flex flex-col justify-between hidden sm:flex">
        <div className="font-bold text-sm">Logo</div>
        <div>
          <div className="font-bold text-xs mb-1">더 빠른 개발을<br />시작하세요</div>
          <div className="text-blue-200 text-[8px]">수천 명의 개발자가 신뢰하는 플랫폼</div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-white/30 rounded p-1 text-[7px] text-blue-100">
              ★ 사용자 {i} 추천
            </div>
          ))}
        </div>
      </div>
      {/* 폼 패널 */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="font-bold text-xs mb-3">로그인</div>
        <div className="w-full space-y-2 max-w-[140px]">
          <div className="border rounded px-2 py-1 text-[8px] text-zinc-400">이메일</div>
          <div className="border rounded px-2 py-1 text-[8px] text-zinc-400">비밀번호</div>
          <div className="bg-blue-500 text-white rounded px-2 py-1 text-center text-[8px]">로그인</div>
          <div className="text-center text-[7px] text-zinc-400">계정이 없으신가요? <span className="text-blue-500">가입</span></div>
        </div>
      </div>
    </div>
  )
}

const authCode = `{/* ① 전체 화면을 절반으로 분할 */}
<div className="min-h-screen flex">

  {/* ② 브랜드 패널 (왼쪽 1/2) - 모바일 숨김 */}
  <div className="hidden lg:flex lg:flex-1 flex-col justify-between
                  bg-gradient-to-br from-blue-600 to-indigo-700
                  text-white p-12">
    {/* 로고 */}
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-lg bg-white/20" />
      <span className="font-bold text-xl">Logo</span>
    </div>

    {/* 메인 카피 */}
    <div>
      <blockquote className="text-2xl font-semibold leading-relaxed mb-4">
        "더 빠른 개발을 시작하세요"
      </blockquote>
      <p className="text-blue-200">수천 명의 개발자가 신뢰하는 플랫폼</p>
    </div>

    {/* 소셜 증명 */}
    <div className="grid grid-cols-3 gap-3">
      {testimonials.map((t) => (
        <div key={t.name} className="rounded-lg border border-white/20 p-3 bg-white/5">
          <div className="flex gap-1 text-yellow-400 mb-1">{"★★★★★"}</div>
          <p className="text-sm text-blue-100">{t.text}</p>
          <p className="text-xs text-blue-300 mt-1">— {t.name}</p>
        </div>
      ))}
    </div>
  </div>

  {/* ③ 폼 패널 (오른쪽 또는 전체) - 중앙 정렬 */}
  <div className="flex flex-1 flex-col items-center justify-center
                  p-6 sm:p-12 bg-background">
    <div className="w-full max-w-sm">

      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">다시 오신 것을 환영합니다</h1>
        <p className="text-muted-foreground">계정에 로그인하세요</p>
      </div>

      {/* 소셜 로그인 */}
      <div className="flex gap-3 mb-6">
        <button className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 text-sm">
          <GoogleIcon /> Google
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 text-sm">
          <GithubIcon /> GitHub
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs text-muted-foreground">
          <span className="bg-background px-2">또는 이메일로 계속</span>
        </div>
      </div>

      {/* 이메일 폼 */}
      <form className="space-y-4">
        <div>
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" placeholder="name@company.com" className="mt-1" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="password">비밀번호</Label>
            <a href="#" className="text-xs text-primary">비밀번호 찾기</a>
          </div>
          <Input id="password" type="password" className="mt-1" />
        </div>
        <button type="submit" className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium">
          로그인
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        계정이 없으신가요?{' '}
        <a href="/register" className="text-primary font-medium hover:underline">
          무료로 시작하기
        </a>
      </p>
    </div>
  </div>
</div>`

// ─────────────────────────────────────────────
// 레이아웃 데이터
// ─────────────────────────────────────────────
const layouts = [
  {
    id: 'landing',
    icon: <Layers className="h-5 w-5" />,
    title: '랜딩 페이지',
    description: 'Sticky 헤더 + 전체화면 히어로 + 피처 그리드로 구성된 마케팅 페이지의 표준 레이아웃',
    tags: ['Sticky Header', 'Hero', 'Grid'],
    Preview: LandingPreview,
    code: landingCode,
  },
  {
    id: 'dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    title: '대시보드',
    description: '고정 사이드바 + 상단 헤더 + 스크롤 가능한 콘텐츠 영역으로 구성된 관리자/앱 레이아웃',
    tags: ['Sidebar', 'Sticky Header', 'Overflow Scroll'],
    Preview: DashboardPreview,
    code: dashboardCode,
  },
  {
    id: 'blog',
    icon: <FileText className="h-5 w-5" />,
    title: '블로그 아티클',
    description: 'prose 타이포그래피 + Sticky 목차(TOC) 사이드바로 구성된 롱폼 콘텐츠 레이아웃',
    tags: ['Prose', 'TOC', 'Sticky Sidebar'],
    Preview: BlogPreview,
    code: blogCode,
  },
  {
    id: 'grid',
    icon: <Grid3X3 className="h-5 w-5" />,
    title: '카드 그리드',
    description: '필터 사이드바 + 반응형 카드 그리드로 구성된 포트폴리오/쇼핑몰 레이아웃',
    tags: ['Filter Sidebar', 'Responsive Grid', 'Masonry'],
    Preview: GridPreview,
    code: gridCode,
  },
  {
    id: 'auth',
    icon: <Lock className="h-5 w-5" />,
    title: '인증 화면',
    description: '브랜드 패널(좌) + 폼 패널(우) 의 split-screen 구조로 구성된 로그인/회원가입 레이아웃',
    tags: ['Split Screen', 'Centered Form', 'Social Login'],
    Preview: AuthPreview,
    code: authCode,
  },
]

// ─────────────────────────────────────────────
// 메인 페이지
// ─────────────────────────────────────────────
export default function LayoutExamplesPage() {
  const { ref, isInView } = useAnimateOnView()

  return (
    <main className="flex-1">
      {/* 페이지 헤더 */}
      <section className="py-12 border-b">
        <Container>
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">홈</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>레이아웃</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <motion.div initial="initial" animate="animate" variants={fadeInUp}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">레이아웃 예제</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              모던 웹사이트에서 가장 많이 사용되는 5가지 레이아웃 패턴입니다.
              각 레이아웃의 미리보기와 Tailwind CSS 소스코드를 확인하세요.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* 레이아웃 목록 */}
      <section ref={ref} className="py-12 sm:py-16">
        <Container>
          <motion.div
            className="space-y-16"
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            variants={staggerContainer}
          >
            {layouts.map((layout, index) => (
              <motion.div key={layout.id} variants={staggerItem}>
                {/* 레이아웃 헤더 */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="mt-1 inline-flex rounded-lg bg-accent p-3 text-primary shrink-0">
                    {layout.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm text-muted-foreground font-mono">#{String(index + 1).padStart(2, '0')}</span>
                      <h2 className="text-2xl font-bold">{layout.title}</h2>
                    </div>
                    <p className="text-muted-foreground mb-3">{layout.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {layout.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 미리보기 + 코드 탭 */}
                <Tabs defaultValue="preview">
                  <TabsList className="mb-4">
                    <TabsTrigger value="preview">미리보기</TabsTrigger>
                    <TabsTrigger value="code">소스코드</TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview">
                    <layout.Preview />
                  </TabsContent>
                  <TabsContent value="code">
                    <CodeBlock code={layout.code} />
                  </TabsContent>
                </Tabs>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </main>
  )
}
