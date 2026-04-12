'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, addDays } from 'date-fns'
import { ko } from 'date-fns/locale'
import type { DateRange } from 'react-day-picker'
import { Container } from '@/components/layout/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { fadeInUp } from '@/lib/animations'
import { CalendarIcon, CheckIcon, ChevronsUpDownIcon, AlertTriangleIcon, InfoIcon, CheckCircleIcon, XIcon, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

// 코드 블록 컴포넌트
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-lg bg-slate-950 overflow-x-auto">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 text-xs text-slate-400 hover:text-slate-200 transition-colors px-2 py-1 rounded border border-slate-700 hover:border-slate-500"
      >
        {copied ? '복사됨!' : '복사'}
      </button>
      <pre className="text-sm text-slate-100 font-mono p-4 pt-10">
        <code>{code}</code>
      </pre>
    </div>
  )
}

// 섹션 카드
function ExampleCard({
  title,
  description,
  children,
  code,
}: {
  title: string
  description?: string
  children: React.ReactNode
  code?: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">미리보기</div>
          <div className="rounded-lg border border-border/50 p-6 bg-muted/20">
            {children}
          </div>
        </div>
        {code && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">예제 코드</div>
            <CodeBlock code={code} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─── 기본 컴포넌트들 ───────────────────────────────────────────────
function BasicComponentsExamples() {
  return (
    <div className="space-y-6">
      {/* 버튼 */}
      <ExampleCard
        title="버튼"
        description="다양한 스타일의 버튼 변형"
        code={`import { Button } from '@/components/ui/button'

<Button>기본</Button>
<Button variant="secondary">보조</Button>
<Button variant="outline">외곽선</Button>
<Button variant="destructive">위험</Button>
<Button variant="ghost">투명</Button>
<Button variant="link">링크</Button>
<Button size="lg">크기 큼</Button>
<Button size="sm">크기 작음</Button>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button>기본</Button>
          <Button variant="secondary">보조</Button>
          <Button variant="outline">외곽선</Button>
          <Button variant="destructive">위험</Button>
          <Button variant="ghost">투명</Button>
          <Button variant="link">링크</Button>
          <Button size="lg">크기 큼</Button>
          <Button size="sm">크기 작음</Button>
        </div>
      </ExampleCard>

      {/* 배지 */}
      <ExampleCard
        title="배지"
        description="상태나 분류를 나타내는 배지"
        code={`import { Badge } from '@/components/ui/badge'

<Badge>기본</Badge>
<Badge variant="secondary">보조</Badge>
<Badge variant="destructive">위험</Badge>
<Badge variant="outline">외곽선</Badge>`}
      >
        <div className="flex flex-wrap gap-3">
          <Badge>기본</Badge>
          <Badge variant="secondary">보조</Badge>
          <Badge variant="destructive">위험</Badge>
          <Badge variant="outline">외곽선</Badge>
        </div>
      </ExampleCard>

      {/* 카드 */}
      <ExampleCard
        title="카드"
        description="콘텐츠를 담는 카드 컴포넌트"
        code={`import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>카드 설명입니다.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>카드 콘텐츠가 들어갑니다.</p>
  </CardContent>
</Card>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>카드 제목</CardTitle>
              <CardDescription>카드 설명입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>카드 콘텐츠가 들어갑니다.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">사용자</CardTitle>
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground mt-1">
                지난달 대비 +12% 증가
              </p>
            </CardContent>
          </Card>
        </div>
      </ExampleCard>

      {/* 알림 */}
      <ExampleCard
        title="알림"
        description="사용자에게 정보를 전달하는 알림"
        code={`import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, CheckCircle, AlertCircle } from 'lucide-react'

// 기본 정보 알림
<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>정보</AlertTitle>
  <AlertDescription>이것은 정보성 알림 메시지입니다.</AlertDescription>
</Alert>

// 성공 알림
<Alert className="border-green-500/50 bg-green-500/5">
  <CheckCircle className="h-4 w-4 text-green-600" />
  <AlertTitle>성공</AlertTitle>
  <AlertDescription>작업이 성공적으로 완료되었습니다.</AlertDescription>
</Alert>

// 경고 알림
<Alert className="border-destructive/50 bg-destructive/5">
  <AlertCircle className="h-4 w-4 text-destructive" />
  <AlertTitle>경고</AlertTitle>
  <AlertDescription>주의가 필요한 메시지입니다.</AlertDescription>
</Alert>`}
      >
        <div className="space-y-4">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>정보</AlertTitle>
            <AlertDescription>이것은 정보성 알림 메시지입니다.</AlertDescription>
          </Alert>

          <Alert className="border-green-500/50 bg-green-500/5">
            <CheckCircleIcon className="h-4 w-4 text-green-600" />
            <AlertTitle>성공</AlertTitle>
            <AlertDescription>작업이 성공적으로 완료되었습니다.</AlertDescription>
          </Alert>

          <Alert className="border-destructive/50 bg-destructive/5">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertTitle>경고</AlertTitle>
            <AlertDescription>주의가 필요한 메시지입니다.</AlertDescription>
          </Alert>
        </div>
      </ExampleCard>

      {/* 진행률 */}
      <ExampleCard
        title="진행률"
        description="작업 진행 상황을 표시하는 프로그레스 바"
        code={`import { Progress } from '@/components/ui/progress'

// 33% 진행
<Progress value={33} />

// 100% 완료
<Progress value={100} />`}
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">로딩 중...</p>
            <Progress value={33} />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">진행 완료</p>
            <Progress value={100} />
          </div>
        </div>
      </ExampleCard>

      {/* 토스트 알림 */}
      <ExampleCard
        title="토스트 알림"
        description="임시 알림 메시지를 표시합니다"
        code={`import { toast } from 'sonner'

// Toaster를 layout.tsx에 추가해야 합니다
// import { Toaster } from 'sonner'
// <Toaster richColors />

// 성공 토스트
toast.success('성공 메시지입니다!')

// 에러 토스트
toast.error('에러 메시지입니다!')

// 정보 토스트
toast.info('정보 메시지입니다!')`}
      >
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => toast.success('성공 메시지입니다!')}>
            성공 토스트
          </Button>
          <Button onClick={() => toast.error('에러 메시지입니다!')}>
            에러 토스트
          </Button>
          <Button onClick={() => toast.info('정보 메시지입니다!')}>
            정보 토스트
          </Button>
        </div>
      </ExampleCard>
    </div>
  )
}

// ─── 달력 컴포넌트들 ───────────────────────────────────────────────
function CalendarExamples() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date())
  const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(new Date())
  const [dayRange, setDayRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })
  const [monthRange, setMonthRange] = useState<DateRange | undefined>()
  const [dayPickerOpen, setDayPickerOpen] = useState(false)
  const [monthPickerOpen, setMonthPickerOpen] = useState(false)
  const [dayRangeOpen, setDayRangeOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* 일(Day) 선택 */}
      <ExampleCard
        title="날짜 선택 (일 단위)"
        description="특정 날짜를 선택합니다"
        code={`import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const [date, setDate] = useState<Date | undefined>(new Date())
const [open, setOpen] = useState(false)

// 인라인 캘린더
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  locale={ko}
  className="rounded-md border"
/>

// 팝업 캘린더
<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="outline">
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, 'PPP', { locale: ko }) : '날짜 선택'}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar
      mode="single"
      selected={date}
      onSelect={(d) => { setDate(d); setOpen(false) }}
      locale={ko}
      initialFocus
    />
  </PopoverContent>
</Popover>`}
      >
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <Calendar
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            locale={ko}
            className="rounded-md border"
          />
          <div className="space-y-2">
            <p className="text-sm font-medium">팝업 형태 선택:</p>
            <Popover open={dayPickerOpen} onOpenChange={setDayPickerOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-52 justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDay ? format(selectedDay, 'PPP', { locale: ko }) : '날짜 선택'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDay}
                  onSelect={(d) => { setSelectedDay(d); setDayPickerOpen(false) }}
                  locale={ko}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </ExampleCard>

      {/* 월(Month) 선택 */}
      <ExampleCard
        title="월 선택"
        description="달(Month)을 선택합니다"
        code={`import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const [month, setMonth] = useState<Date | undefined>(new Date())
const [open, setOpen] = useState(false)

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="outline">
      <CalendarIcon className="mr-2 h-4 w-4" />
      {month ? format(month, 'yyyy년 MM월', { locale: ko }) : '월 선택'}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar
      mode="single"
      selected={month}
      onSelect={(d) => { setMonth(d); setOpen(false) }}
      locale={ko}
      captionLayout="dropdown"
      fromYear={2020}
      toYear={2030}
      initialFocus
    />
  </PopoverContent>
</Popover>`}
      >
        <Popover open={monthPickerOpen} onOpenChange={setMonthPickerOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-52 justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedMonth ? format(selectedMonth, 'yyyy년 MM월', { locale: ko }) : '월 선택'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedMonth}
              onSelect={(d) => { setSelectedMonth(d); setMonthPickerOpen(false) }}
              locale={ko}
              captionLayout="dropdown"
              fromYear={2020}
              toYear={2030}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </ExampleCard>

      {/* 일 기간(Day Range) 선택 */}
      <ExampleCard
        title="날짜 기간 선택 (일 단위)"
        description="시작일과 종료일을 선택합니다"
        code={`import { Calendar } from '@/components/ui/calendar'
import type { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const [range, setRange] = useState<DateRange | undefined>({
  from: new Date(),
  to: addDays(new Date(), 7),
})

// 인라인 범위 선택 (2개월 표시)
<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  locale={ko}
  numberOfMonths={2}
  className="rounded-md border"
/>`}
      >
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <Calendar
            mode="range"
            selected={dayRange}
            onSelect={setDayRange}
            locale={ko}
            numberOfMonths={2}
            className="rounded-md border"
          />
          <div className="space-y-2">
            <p className="text-sm font-medium">팝업 형태:</p>
            <Popover open={dayRangeOpen} onOpenChange={setDayRangeOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-64 justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dayRange?.from ? (
                    dayRange.to ? (
                      <>
                        {format(dayRange.from, 'yy.MM.dd')} ~ {format(dayRange.to, 'yy.MM.dd')}
                      </>
                    ) : (
                      format(dayRange.from, 'PPP', { locale: ko })
                    )
                  ) : '기간 선택'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="range"
                  selected={dayRange}
                  onSelect={setDayRange}
                  locale={ko}
                  numberOfMonths={2}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </ExampleCard>

      {/* 월 기간 선택 */}
      <ExampleCard
        title="월 기간 선택"
        description="시작 월과 종료 월을 선택합니다"
        code={`import { Calendar } from '@/components/ui/calendar'
import type { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const [range, setRange] = useState<DateRange | undefined>()

<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  locale={ko}
  captionLayout="dropdown"
  fromYear={2020}
  toYear={2030}
  className="rounded-md border"
/>

{range?.from && (
  <p>
    선택된 기간: {format(range.from, 'yyyy년 MM월', { locale: ko })}
    {range.to && <> ~ {format(range.to, 'yyyy년 MM월', { locale: ko })}</>}
  </p>
)}`}
      >
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">드롭다운 형태의 월 범위 선택기</p>
          <Calendar
            mode="range"
            selected={monthRange}
            onSelect={setMonthRange}
            locale={ko}
            captionLayout="dropdown"
            fromYear={2020}
            toYear={2030}
            className="rounded-md border"
          />
          {monthRange?.from && (
            <p className="text-sm">
              선택된 기간: {format(monthRange.from, 'yyyy년 MM월', { locale: ko })}
              {monthRange.to && <> ~ {format(monthRange.to, 'yyyy년 MM월', { locale: ko })}</>}
            </p>
          )}
        </div>
      </ExampleCard>
    </div>
  )
}

// ─── 모달 컴포넌트들 ───────────────────────────────────────────────
function ModalExamples() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [warningOpen, setWarningOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [basicOpen, setBasicOpen] = useState(false)
  const [resultMsg, setResultMsg] = useState('')

  return (
    <div className="space-y-6">
      {/* 기본 모달 */}
      <ExampleCard
        title="기본 모달 팝업"
        code={`import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>모달 열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>모달 제목</DialogTitle>
      <DialogDescription>모달 설명입니다.</DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <p>콘텐츠 영역</p>
    </div>
    <DialogFooter>
      <Button variant="outline">취소</Button>
      <Button>확인</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <div className="flex flex-wrap gap-3">
          <Dialog open={basicOpen} onOpenChange={setBasicOpen}>
            <DialogTrigger asChild>
              <Button>기본 모달 열기</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>모달 제목</DialogTitle>
                <DialogDescription>
                  이것은 기본 모달 팝업입니다. 다양한 내용을 담을 수 있습니다.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">
                  여기에 폼이나 콘텐츠를 배치할 수 있습니다.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setBasicOpen(false)}>취소</Button>
                <Button onClick={() => setBasicOpen(false)}>확인</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ExampleCard>

      {/* Confirm 모달 */}
      <ExampleCard
        title="Confirm 모달"
        description="사용자 확인이 필요한 동작에 사용"
        code={`import { XIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react'

// 삭제 확인 모달 (Destructive)
<Dialog>
  <DialogTrigger asChild>
    <Button>삭제</Button>
  </DialogTrigger>
  <DialogContent className="max-w-sm">
    <DialogHeader>
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
          <XIcon className="h-5 w-5 text-destructive" />
        </div>
        <DialogTitle>삭제 확인</DialogTitle>
      </div>
      <DialogDescription>
        이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">취소</Button>
      <Button variant="destructive">삭제</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// 경고 모달 (Warning)
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">경고</Button>
  </DialogTrigger>
  <DialogContent className="max-w-sm">
    <DialogHeader>
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
          <AlertTriangleIcon className="h-5 w-5 text-yellow-600" />
        </div>
        <DialogTitle>주의</DialogTitle>
      </div>
      <DialogDescription>계속 진행하시겠습니까?</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">취소</Button>
      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">계속</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <div className="flex flex-wrap gap-3">
          {resultMsg && (
            <div className="w-full mb-2 text-sm text-muted-foreground">결과: {resultMsg}</div>
          )}
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogTrigger asChild>
              <Button variant="default">삭제 확인 모달</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                    <XIcon className="h-5 w-5 text-destructive" />
                  </div>
                  <DialogTitle>삭제 확인</DialogTitle>
                </div>
                <DialogDescription>
                  이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => { setConfirmOpen(false); setResultMsg('취소됨') }}>
                  취소
                </Button>
                <Button variant="destructive" onClick={() => { setConfirmOpen(false); setResultMsg('삭제 완료') }}>
                  삭제
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Warning 모달 */}
          <Dialog open={warningOpen} onOpenChange={setWarningOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">경고 모달</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                    <AlertTriangleIcon className="h-5 w-5 text-yellow-600" />
                  </div>
                  <DialogTitle>주의</DialogTitle>
                </div>
                <DialogDescription>
                  이 작업은 시스템에 영향을 줄 수 있습니다. 계속 진행하시겠습니까?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setWarningOpen(false)}>취소</Button>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white" onClick={() => { setWarningOpen(false); setResultMsg('경고 수락됨') }}>
                  계속
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Info 모달 */}
          <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">정보 모달</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <InfoIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <DialogTitle>안내</DialogTitle>
                </div>
                <DialogDescription>
                  시스템 점검이 2026년 4월 15일 오전 2시~4시에 예정되어 있습니다. 해당 시간에는 서비스 이용이 불가합니다.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setInfoOpen(false)}>확인</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ExampleCard>
    </div>
  )
}

// ─── Radio & Checkbox ───────────────────────────────────────────────
function RadioCheckboxExamples() {
  const [radioValue, setRadioValue] = useState('option1')
  const [radioWithDesc, setRadioWithDesc] = useState('standard')
  const [checks, setChecks] = useState({ html: true, css: false, js: true, ts: false })

  return (
    <div className="space-y-6">
      {/* 기본 라디오 그룹 */}
      <ExampleCard
        title="라디오 버튼 (기본)"
        description="단일 선택만 가능"
        code={`import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const [value, setValue] = useState('option1')

<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="opt1" />
    <Label htmlFor="opt1">옵션 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="opt2" />
    <Label htmlFor="opt2">옵션 2</Label>
  </div>
</RadioGroup>`}
      >
        <div className="space-y-4">
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="opt1" />
              <Label htmlFor="opt1">옵션 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="opt2" />
              <Label htmlFor="opt2">옵션 2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="opt3" />
              <Label htmlFor="opt3">옵션 3</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-muted-foreground">선택된 값: <Badge variant="outline">{radioValue}</Badge></p>
        </div>
      </ExampleCard>

      {/* 카드형 라디오 */}
      <ExampleCard
        title="카드형 라디오 버튼"
        description="설명이 있는 카드 형태의 선택"
        code={`import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

const plans = [
  { value: 'basic', label: '기본', price: '무료', desc: '개인 프로젝트용' },
  { value: 'standard', label: '스탠다드', price: '₩9,900/월', desc: '소규모 팀용' },
  { value: 'pro', label: '프로', price: '₩29,900/월', desc: '기업용' },
]

<RadioGroup value={value} onValueChange={setValue} className="grid grid-cols-3 gap-3">
  {plans.map((plan) => (
    <label
      key={plan.value}
      htmlFor={plan.value}
      className={cn(
        'flex flex-col gap-1 rounded-lg border p-4 cursor-pointer hover:bg-accent',
        value === plan.value && 'border-primary bg-primary/5'
      )}
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem value={plan.value} id={plan.value} />
        <span className="font-medium">{plan.label}</span>
      </div>
      <p className="text-sm font-semibold text-primary">{plan.price}</p>
      <p className="text-xs text-muted-foreground">{plan.desc}</p>
    </label>
  ))}
</RadioGroup>`}
      >
        <RadioGroup value={radioWithDesc} onValueChange={setRadioWithDesc} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { value: 'basic', label: '기본', price: '무료', desc: '개인 프로젝트용' },
            { value: 'standard', label: '스탠다드', price: '₩9,900/월', desc: '소규모 팀용' },
            { value: 'pro', label: '프로', price: '₩29,900/월', desc: '기업용' },
          ].map((plan) => (
            <label
              key={plan.value}
              htmlFor={`plan-${plan.value}`}
              className={cn(
                'flex flex-col gap-1 rounded-lg border p-4 cursor-pointer transition-colors hover:bg-accent',
                radioWithDesc === plan.value && 'border-primary bg-primary/5'
              )}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value={plan.value} id={`plan-${plan.value}`} />
                <span className="font-medium">{plan.label}</span>
              </div>
              <p className="text-sm font-semibold text-primary">{plan.price}</p>
              <p className="text-xs text-muted-foreground">{plan.desc}</p>
            </label>
          ))}
        </RadioGroup>
      </ExampleCard>

      {/* 체크박스 그룹 */}
      <ExampleCard
        title="체크박스 그룹"
        description="다중 선택 가능"
        code={`import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const [checks, setChecks] = useState({
  html: true,
  css: false,
  js: true,
  ts: false,
})

<div className="grid grid-cols-2 gap-3">
  {Object.keys(checks).map((key) => (
    <div key={key} className="flex items-center space-x-2">
      <Checkbox
        id={key}
        checked={checks[key]}
        onCheckedChange={(v) => setChecks({ ...checks, [key]: !!v })}
      />
      <Label htmlFor={key}>{key.toUpperCase()}</Label>
    </div>
  ))}
</div>`}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(checks) as Array<keyof typeof checks>).map((key) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={checks[key]}
                  onCheckedChange={(v) => setChecks({ ...checks, [key]: !!v })}
                />
                <Label htmlFor={key} className="capitalize">{key.toUpperCase()}</Label>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            선택됨: {Object.entries(checks).filter(([, v]) => v).map(([k]) => k.toUpperCase()).join(', ') || '없음'}
          </p>
        </div>
      </ExampleCard>
    </div>
  )
}

// ─── SelectBox ───────────────────────────────────────────────
const frameworkOptions = [
  { value: 'react', label: 'React' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'angular', label: 'Angular' },
]

function SelectExamples() {
  const [singleValue, setSingleValue] = useState('')
  const [multiValues, setMultiValues] = useState<string[]>([])
  const [multiOpen, setMultiOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchSelected, setSearchSelected] = useState('')

  const toggleMulti = (val: string) => {
    setMultiValues((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    )
  }

  return (
    <div className="space-y-6">
      {/* 단일 선택 */}
      <ExampleCard
        title="SelectBox (단일 선택)"
        description="shadcn Select 컴포넌트"
        code={`import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select'

const [value, setValue] = useState('')

<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-64">
    <SelectValue placeholder="프레임워크 선택" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="react">React</SelectItem>
    <SelectItem value="nextjs">Next.js</SelectItem>
    <SelectItem value="vue">Vue.js</SelectItem>
  </SelectContent>
</Select>`}
      >
        <div className="space-y-3">
          <Select value={singleValue} onValueChange={setSingleValue}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="프레임워크 선택" />
            </SelectTrigger>
            <SelectContent>
              {frameworkOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {singleValue && (
            <p className="text-sm text-muted-foreground">
              선택됨: <Badge variant="outline">{frameworkOptions.find(o => o.value === singleValue)?.label}</Badge>
            </p>
          )}
        </div>
      </ExampleCard>

      {/* 복수 선택 */}
      <ExampleCard
        title="SelectBox (복수 선택)"
        description="Command 컴포넌트를 활용한 다중 선택"
        code={`import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'

const [values, setValues] = useState<string[]>([])
const [open, setOpen] = useState(false)

const toggle = (val: string) =>
  setValues((prev) => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="outline" className="justify-between">
      {values.length > 0 ? \`\${values.length}개 선택됨\` : '선택...'}
      <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="p-0">
    <Command>
      <CommandInput placeholder="검색..." />
      <CommandList>
        <CommandGroup>
          {options.map((opt) => (
            <CommandItem key={opt.value} onSelect={() => toggle(opt.value)}>
              <CheckIcon className={cn('mr-2 h-4 w-4', values.includes(opt.value) ? 'opacity-100' : 'opacity-0')} />
              {opt.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>`}
      >
        <div className="space-y-3">
          <Popover open={multiOpen} onOpenChange={setMultiOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-72 justify-between">
                {multiValues.length > 0
                  ? `${multiValues.length}개 선택됨`
                  : '프레임워크 선택 (복수)'}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0">
              <Command>
                <CommandInput placeholder="검색..." />
                <CommandList>
                  <CommandEmpty>결과 없음</CommandEmpty>
                  <CommandGroup>
                    {frameworkOptions.map((opt) => (
                      <CommandItem
                        key={opt.value}
                        value={opt.value}
                        onSelect={() => toggleMulti(opt.value)}
                        data-checked={multiValues.includes(opt.value)}
                      >
                        <CheckIcon
                          className={cn(
                            'mr-2 h-4 w-4',
                            multiValues.includes(opt.value) ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {opt.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {multiValues.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {multiValues.map((v) => (
                <Badge key={v} variant="secondary" className="cursor-pointer" onClick={() => toggleMulti(v)}>
                  {frameworkOptions.find(o => o.value === v)?.label}
                  <XIcon className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </ExampleCard>

      {/* 자동완성 검색 SelectBox */}
      <ExampleCard
        title="SelectBox (텍스트 자동 검색)"
        description="입력한 텍스트로 옵션 목록 자동 필터링"
        code={`import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const [selected, setSelected] = useState('')
const [open, setOpen] = useState(false)
const [search, setSearch] = useState('')

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="outline" role="combobox" className="justify-between">
      {selected ? options.find(o => o.value === selected)?.label : '검색 선택...'}
      <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="p-0">
    <Command>
      <CommandInput
        placeholder="검색..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>결과 없음</CommandEmpty>
        <CommandGroup>
          {options.map((opt) => (
            <CommandItem
              key={opt.value}
              value={opt.label}
              onSelect={() => {
                setSelected(opt.value === selected ? '' : opt.value)
                setOpen(false)
                setSearch('')
              }}
            >
              <CheckIcon className={cn('mr-2 h-4 w-4', selected === opt.value ? 'opacity-100' : 'opacity-0')} />
              {opt.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>`}
      >
        <div className="space-y-3">
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={searchOpen} className="w-64 justify-between">
                {searchSelected
                  ? frameworkOptions.find(o => o.value === searchSelected)?.label
                  : '프레임워크 검색 선택...'}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <Command>
                <CommandInput
                  placeholder="프레임워크 검색..."
                  value={searchValue}
                  onValueChange={setSearchValue}
                />
                <CommandList>
                  <CommandEmpty>'{searchValue}'에 해당하는 결과 없음</CommandEmpty>
                  <CommandGroup>
                    {frameworkOptions.map((opt) => (
                      <CommandItem
                        key={opt.value}
                        value={opt.label}
                        onSelect={() => {
                          setSearchSelected(opt.value === searchSelected ? '' : opt.value)
                          setSearchOpen(false)
                          setSearchValue('')
                        }}
                        data-checked={searchSelected === opt.value}
                      >
                        <CheckIcon
                          className={cn(
                            'mr-2 h-4 w-4',
                            searchSelected === opt.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {opt.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {searchSelected && (
            <p className="text-sm text-muted-foreground">
              선택됨: <Badge variant="outline">{frameworkOptions.find(o => o.value === searchSelected)?.label}</Badge>
              <button className="ml-2 text-xs underline" onClick={() => setSearchSelected('')}>초기화</button>
            </p>
          )}
        </div>
      </ExampleCard>
    </div>
  )
}

// ─── 메인 페이지 ───────────────────────────────────────────────
export default function ComponentShowcasePage() {
  return (
    <div className="min-h-screen py-20">
      <Container>
        <motion.div initial="initial" animate="animate" variants={fadeInUp} className="space-y-12">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">HOME</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/examples">컴포넌트</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>컴포넌트 쇼케이스</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* 헤더 */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">컴포넌트 쇼케이스</h1>
            <p className="text-lg text-muted-foreground">
              shadcn/ui 기반의 다양한 컴포넌트 예제들을 확인하세요.
            </p>
          </div>

          {/* 탭 */}
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">기본 컴포넌트</TabsTrigger>
              <TabsTrigger value="calendar">달력 선택</TabsTrigger>
              <TabsTrigger value="modal">모달 팝업</TabsTrigger>
              <TabsTrigger value="radio-check">Radio/Check</TabsTrigger>
              <TabsTrigger value="select">SelectBox</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-6">
              <BasicComponentsExamples />
            </TabsContent>

            <TabsContent value="calendar" className="mt-6">
              <CalendarExamples />
            </TabsContent>

            <TabsContent value="modal" className="mt-6">
              <ModalExamples />
            </TabsContent>

            <TabsContent value="radio-check" className="mt-6">
              <RadioCheckboxExamples />
            </TabsContent>

            <TabsContent value="select" className="mt-6">
              <SelectExamples />
            </TabsContent>
          </Tabs>
        </motion.div>
      </Container>
    </div>
  )
}
