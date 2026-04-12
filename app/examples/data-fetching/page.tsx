'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { fadeInUp } from '@/lib/animations'

export default function DataFetchingPage() {
  const fetchingMethods = [
    {
      name: 'fetch API',
      description: '기본 JavaScript fetch로 데이터 요청',
    },
    {
      name: 'useEffect + fetch',
      description: 'useEffect에서 데이터 페칭 처리',
    },
    {
      name: 'SWR',
      description: '캐싱과 자동 갱신을 지원하는 라이브러리',
    },
    {
      name: 'React Query',
      description: '서버 상태 관리 라이브러리',
    },
    {
      name: '에러 처리',
      description: 'try-catch와 에러 바운더리',
    },
    {
      name: '로딩 상태',
      description: '로딩 중 표시 및 스켈레톤 UI',
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <Container>
        <motion.div initial="initial" animate="animate" variants={fadeInUp} className="space-y-12">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">HOME</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="/examples">컴포넌트</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>데이터 페칭</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* 헤더 */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">데이터 페칭</h1>
            <p className="text-lg text-muted-foreground">
              API 호출과 데이터 관리 방법들을 살펴보세요.
            </p>
          </div>

          {/* 페칭 방법 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fetchingMethods.map((method) => (
              <Card key={method.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{method.name}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">API</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 예제 */}
          <Card>
            <CardHeader>
              <CardTitle>기본 데이터 페칭 패턴</CardTitle>
              <CardDescription>useEffect와 fetch를 사용한 기본 패턴</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-slate-950 p-4 overflow-x-auto">
                <pre className="text-sm text-slate-100 font-mono">
                  <code>{`'use client'

import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>에러: {error}</div>

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* 팁 */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-base">💡 베스트 프랙티스</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-green-900">
              <p>• 로딩, 에러, 성공 상태를 모두 처리하세요</p>
              <p>• AbortController를 사용하여 컴포넌트 언마운트시 요청을 취소하세요</p>
              <p>• 캐싱이 필요하면 React Query나 SWR을 고려하세요</p>
              <p>• 민감한 데이터는 httpOnly 쿠키로 저장하세요</p>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  )
}
