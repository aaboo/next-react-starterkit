// 네비게이션 메뉴 공통 설정
export interface NavItem {
  label: string
  href: string
  description?: string
}

// 최상위 메뉴 링크
export const mainNavLinks: NavItem[] = [
  { label: '홈', href: '/' },
  { label: '컴포넌트', href: '/examples' },
  { label: '레이아웃', href: '/examples/layout' },
]

// 컴포넌트 예제 목록 (예제 인덱스 페이지 카드에 사용)
export const exampleNavItems: NavItem[] = [
  { label: '컴포넌트 쇼케이스', href: '/examples/components', description: 'shadcn/ui 컴포넌트 전시' },
  { label: '폼 예제', href: '/examples/form', description: 'React Hook Form + Zod' },
  { label: '데이터그리드 예제', href: '/examples/data-grid', description: '테이블 및 필터링' },
  { label: 'usehooks-ts 예제', href: '/examples/usehooks-ts', description: '커스텀 React 훅' },
  { label: '데이터 페칭', href: '/examples/data-fetching', description: 'API 호출 및 데이터 관리' },
  { label: '설정 및 최적화', href: '/examples/settings', description: '성능 최적화 기법' },
]
