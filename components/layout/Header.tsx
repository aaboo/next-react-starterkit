import Link from 'next/link'
import { Code } from 'lucide-react'
import { ModeToggle } from './ModeToggle'
import { MobileMenu } from './MobileMenu'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { mainNavLinks } from '@/lib/nav-config'

// 반응형 헤더 컴포넌트
// 데스크톱: 로고 + 네비 링크 + 예제 드롭다운 + 토글
// 모바일: 로고 + 햄버거 메뉴
function HeaderContent() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 + 데스크톱 네비게이션 (좌측 배치) */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
                <Code className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="hidden font-bold text-lg sm:inline">
                Starter Kit
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {mainNavLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild className="px-2.5 py-1.5 text-base font-medium hover:bg-accent rounded-lg transition-colors">
                      <Link href={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            </nav>
          </div>

          {/* 오른쪽: 테마 토글 + 모바일 메뉴 */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

// 주의: useScrolled는 클라이언트 훅이지만,
// Header 자체는 Server Component로 유지 가능
// (ModeToggle, MobileMenu가 클라이언트 역할 담당)
export function Header() {
  return <HeaderContent />
}
