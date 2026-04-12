import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

interface FooterLink {
  label: string
  href: string
}

const productLinks: FooterLink[] = [
  { label: '홈', href: '#' },
  { label: '컴포넌트', href: '#components' },
  { label: '템플릿', href: '#templates' },
]

const companyLinks: FooterLink[] = [
  { label: '정보', href: '#about' },
  { label: '블로그', href: '#blog' },
  { label: '연락처', href: '#contact' },
]

// 반응형 푸터 컴포넌트
// 모바일: 세로 스택
// 데스크톱: 다중 열
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 상단 섹션 - 링크 그룹 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-8">
          {/* 브랜드 */}
          <div>
            <h3 className="text-base font-semibold mb-4">Starter Kit</h3>
            <p className="text-sm text-muted-foreground">
              현대적이고 빠른 웹 개발을 위한 완벽한 시작점.
            </p>
          </div>

          {/* 제품 링크 */}
          <div>
            <h4 className="text-sm font-semibold mb-4">제품</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 링크 */}
          <div>
            <h4 className="text-sm font-semibold mb-4">회사</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        {/* 하단 섹션 - 저작권 + 기술스택 */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Starter Kit. 모든 권리 보유.
          </p>

          {/* 기술스택 뱃지 */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Next.js 16</Badge>
            <Badge variant="secondary">React 19</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
          </div>
        </div>
      </div>
    </footer>
  )
}
