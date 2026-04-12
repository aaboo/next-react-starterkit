'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { fadeInUp } from '@/lib/animations'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// React Hook Form + Zod 검증 스키마
const formSchema = z.object({
  name: z.string().min(2, '최소 2자 이상 입력하세요').max(50),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  department: z.string({ message: '부서를 선택하세요' }),
  message: z.string().min(10, '최소 10자 이상 입력하세요').max(500),
  subscribe: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

// 코드 예제 컴포넌트
function CodeBlock({ code, language = 'typescript' }: { code: string; language?: string }) {
  return (
    <div className="not-prose rounded-lg bg-slate-950 p-4 overflow-x-auto">
      <pre className="text-sm text-slate-100 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )
}

// 섹션 카드
function ExampleCard({ title, description, children, code }: { title: string; description?: string; children: React.ReactNode; code?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground">미리보기:</div>
          <div className="rounded-lg border border-border/50 p-6 bg-muted/20">
            {children}
          </div>
        </div>
        {code && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">사용 방법:</div>
            <CodeBlock code={code} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function FormExamplesPage() {
  const [charCount, setCharCount] = useState(0)
  const [selectValue, setSelectValue] = useState('')
  const [checkboxValues, setCheckboxValues] = useState({ react: false, next: false, typescript: false })
  const [switchValue, setSwitchValue] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      department: '',
      message: '',
      subscribe: false,
    },
  })

  function onSubmit(values: FormValues) {
    setSubmitMessage(`✓ 제출 완료! 이름: ${values.name}, 이메일: ${values.email}`)
    form.reset()
  }

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
                <BreadcrumbPage>폼 예제</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* 헤더 */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Form 예제</h1>
            <p className="text-lg text-muted-foreground">
              웹 개발에 필요한 모든 폼 요소와 사용 방법을 제공합니다.
            </p>
          </div>

          {/* 탭 네비게이션 */}
          <Tabs defaultValue="input" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="textarea">Textarea</TabsTrigger>
              <TabsTrigger value="select">Select</TabsTrigger>
              <TabsTrigger value="checkbox">Checkbox</TabsTrigger>
              <TabsTrigger value="switch">Switch</TabsTrigger>
              <TabsTrigger value="form">Form</TabsTrigger>
            </TabsList>

            {/* Input 탭 */}
            <TabsContent value="input" className="space-y-6">
              <ExampleCard
                title="기본 Input"
                description="텍스트 입력 필드"
                code={`import { Input } from '@/components/ui/input'

export function BasicInput() {
  return (
    <Input
      type="text"
      placeholder="이름을 입력하세요"
    />
  )
}`}
              >
                <Input type="text" placeholder="이름을 입력하세요" />
              </ExampleCard>

              <ExampleCard
                title="Email Input"
                description="이메일 주소 입력"
                code={`import { Input } from '@/components/ui/input'

export function EmailInput() {
  return (
    <Input
      type="email"
      placeholder="example@email.com"
    />
  )
}`}
              >
                <Input type="email" placeholder="example@email.com" />
              </ExampleCard>

              <ExampleCard
                title="Password Input"
                description="비밀번호 입력 (마스킹 처리)"
                code={`import { Input } from '@/components/ui/input'

export function PasswordInput() {
  return (
    <Input
      type="password"
      placeholder="비밀번호 입력"
    />
  )
}`}
              >
                <Input type="password" placeholder="비밀번호 입력" />
              </ExampleCard>

              <ExampleCard
                title="Number Input"
                description="숫자 입력 필드"
                code={`import { Input } from '@/components/ui/input'

export function NumberInput() {
  return (
    <Input
      type="number"
      placeholder="0"
      min="0"
      max="100"
    />
  )
}`}
              >
                <Input type="number" placeholder="0" min="0" max="100" />
              </ExampleCard>

              <ExampleCard
                title="Disabled State"
                description="비활성화된 입력 필드"
                code={`import { Input } from '@/components/ui/input'

export function DisabledInput() {
  return (
    <Input
      type="text"
      placeholder="입력 불가능"
      disabled
    />
  )
}`}
              >
                <Input type="text" placeholder="입력 불가능" disabled value="비활성화된 입력" readOnly />
              </ExampleCard>
            </TabsContent>

            {/* Textarea 탭 */}
            <TabsContent value="textarea" className="space-y-6">
              <ExampleCard
                title="기본 Textarea"
                description="여러 줄 텍스트 입력"
                code={`import { Textarea } from '@/components/ui/textarea'

export function BasicTextarea() {
  return (
    <Textarea
      placeholder="여러 줄을 입력할 수 있습니다."
      rows={5}
    />
  )
}`}
              >
                <Textarea placeholder="여러 줄을 입력할 수 있습니다." rows={5} />
              </ExampleCard>

              <ExampleCard
                title="Textarea with Character Count"
                description="입력 문자 수 표시"
                code={`import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

export function TextareaWithCount() {
  const [text, setText] = useState('')
  const maxLength = 200

  return (
    <>
      <Textarea
        placeholder="메시지를 입력하세요..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
        rows={4}
      />
      <div className="text-sm text-muted-foreground">
        {text.length} / {maxLength}
      </div>
    </>
  )
}`}
              >
                <div className="space-y-2">
                  <Textarea
                    placeholder="메시지를 입력하세요..."
                    value={charCount.toString()}
                    onChange={(e) => setCharCount(e.target.value.length)}
                    maxLength={200}
                    rows={4}
                  />
                  <div className="text-sm text-muted-foreground">
                    {charCount} / 200
                  </div>
                </div>
              </ExampleCard>
            </TabsContent>

            {/* Select 탭 */}
            <TabsContent value="select" className="space-y-6">
              <ExampleCard
                title="기본 Select"
                description="드롭다운 선택 필드"
                code={`import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function BasicSelect() {
  const [value, setValue] = useState('')

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger>
        <SelectValue placeholder="옵션을 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">옵션 1</SelectItem>
        <SelectItem value="option2">옵션 2</SelectItem>
        <SelectItem value="option3">옵션 3</SelectItem>
      </SelectContent>
    </Select>
  )
}`}
              >
                <Select value={selectValue} onValueChange={setSelectValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="옵션을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                  </SelectContent>
                </Select>
              </ExampleCard>
            </TabsContent>

            {/* Checkbox 탭 */}
            <TabsContent value="checkbox" className="space-y-6">
              <ExampleCard
                title="단일 Checkbox"
                description="하나의 체크박스"
                code={`import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export function BasicCheckbox() {
  const [checked, setChecked] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="agree"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <Label htmlFor="agree">
        이용약관에 동의합니다
      </Label>
    </div>
  )
}`}
              >
                <div className="flex items-center gap-2">
                  <Checkbox id="agree" />
                  <Label htmlFor="agree">이용약관에 동의합니다</Label>
                </div>
              </ExampleCard>

              <ExampleCard
                title="Checkbox 그룹"
                description="여러 개의 체크박스"
                code={`import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export function CheckboxGroup() {
  const [values, setValues] = useState({
    react: false,
    next: false,
    typescript: false,
  })

  return (
    <div className="space-y-3">
      {['React', 'Next.js', 'TypeScript'].map((item) => (
        <div key={item} className="flex items-center gap-2">
          <Checkbox
            id={item.toLowerCase()}
            checked={values[item.toLowerCase()]}
            onCheckedChange={(checked) =>
              setValues(prev => ({
                ...prev,
                [item.toLowerCase()]: checked
              }))
            }
          />
          <Label htmlFor={item.toLowerCase()}>{item}</Label>
        </div>
      ))}
    </div>
  )
}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="react"
                      checked={checkboxValues.react}
                      onCheckedChange={(checked) =>
                        setCheckboxValues({ ...checkboxValues, react: !!checked })
                      }
                    />
                    <Label htmlFor="react">React</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="next"
                      checked={checkboxValues.next}
                      onCheckedChange={(checked) =>
                        setCheckboxValues({ ...checkboxValues, next: !!checked })
                      }
                    />
                    <Label htmlFor="next">Next.js</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="typescript"
                      checked={checkboxValues.typescript}
                      onCheckedChange={(checked) =>
                        setCheckboxValues({ ...checkboxValues, typescript: !!checked })
                      }
                    />
                    <Label htmlFor="typescript">TypeScript</Label>
                  </div>
                </div>
              </ExampleCard>
            </TabsContent>

            {/* Switch 탭 */}
            <TabsContent value="switch" className="space-y-6">
              <ExampleCard
                title="기본 Switch"
                description="토글 스위치 컴포넌트"
                code={`import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export function BasicSwitch() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={enabled}
        onCheckedChange={setEnabled}
      />
      <Label>
        {enabled ? '활성화됨' : '비활성화됨'}
      </Label>
    </div>
  )
}`}
              >
                <div className="flex items-center gap-3">
                  <Switch checked={switchValue} onCheckedChange={setSwitchValue} />
                  <Label>{switchValue ? '활성화됨' : '비활성화됨'}</Label>
                </div>
              </ExampleCard>
            </TabsContent>

            {/* Form 탭 */}
            <TabsContent value="form" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>React Hook Form + Zod 완성된 폼</CardTitle>
                  <CardDescription>유효성 검사가 포함된 전체 폼 예제</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 폼 미리보기 */}
                  <div className="rounded-lg border border-border/50 p-6 bg-muted/20">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>이름</FormLabel>
                              <FormControl>
                                <Input placeholder="이름을 입력하세요" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>이메일</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="department"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>부서</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="부서를 선택하세요" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="dev">개발</SelectItem>
                                  <SelectItem value="design">디자인</SelectItem>
                                  <SelectItem value="marketing">마케팅</SelectItem>
                                  <SelectItem value="sales">영업</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>메시지</FormLabel>
                              <FormControl>
                                <Textarea placeholder="메시지를 입력하세요 (최소 10자)" {...field} />
                              </FormControl>
                              <FormDescription>최소 10자, 최대 500자</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subscribe"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <FormLabel className="mb-0">뉴스레터 구독</FormLabel>
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full">
                          제출
                        </Button>

                        {submitMessage && (
                          <div className="rounded-lg bg-green-50 p-4 text-green-800 text-sm border border-green-200">
                            {submitMessage}
                          </div>
                        )}
                      </form>
                    </Form>
                  </div>

                  {/* 코드 예제 */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">사용 방법:</div>
                    <CodeBlock
                      code={`import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// 1. 검증 스키마 정의
const formSchema = z.object({
  name: z.string().min(2, '최소 2자 이상'),
  email: z.string().email('올바른 이메일'),
  subscribe: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

// 2. 폼 설정
export function MyForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subscribe: false,
    },
  })

  // 3. 제출 핸들러
  function onSubmit(values: FormValues) {
    console.log(values)
  }

  // 4. 폼 렌더링
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">제출</Button>
      </form>
    </Form>
  )
}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </Container>
    </div>
  )
}
