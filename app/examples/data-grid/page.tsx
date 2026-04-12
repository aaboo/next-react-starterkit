'use client'

import { useState, useMemo } from 'react'
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
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { fadeInUp } from '@/lib/animations'

// 샘플 데이터 타입
interface Employee {
  id: number
  name: string
  department: string
  position: string
  status: 'active' | 'inactive' | 'leave'
  joinDate: Date
  email: string
  phone: string
}

// 샘플 데이터 (20명)
const sampleEmployees: Employee[] = [
  { id: 1, name: '김철수', department: '개발', position: '선임 개발자', status: 'active', joinDate: new Date('2020-01-15'), email: 'kim.cs@company.com', phone: '010-1234-5678' },
  { id: 2, name: '이영희', department: '개발', position: '개발자', status: 'active', joinDate: new Date('2021-03-20'), email: 'lee.yh@company.com', phone: '010-2345-6789' },
  { id: 3, name: '박민준', department: '디자인', position: 'UI/UX 디자이너', status: 'active', joinDate: new Date('2020-06-10'), email: 'park.mj@company.com', phone: '010-3456-7890' },
  { id: 4, name: '최지은', department: '마케팅', position: '마케팅 매니저', status: 'active', joinDate: new Date('2019-09-01'), email: 'choi.je@company.com', phone: '010-4567-8901' },
  { id: 5, name: '정준호', department: '개발', position: '백엔드 개발자', status: 'active', joinDate: new Date('2021-07-15'), email: 'jung.jh@company.com', phone: '010-5678-9012' },
  { id: 6, name: '한미영', department: '영업', position: '영업사원', status: 'inactive', joinDate: new Date('2022-02-20'), email: 'han.my@company.com', phone: '010-6789-0123' },
  { id: 7, name: '오성수', department: '개발', position: '프론트엔드 개발자', status: 'active', joinDate: new Date('2021-11-05'), email: 'oh.ss@company.com', phone: '010-7890-1234' },
  { id: 8, name: '송다은', department: 'HR', position: 'HR 담당자', status: 'active', joinDate: new Date('2020-05-18'), email: 'song.de@company.com', phone: '010-8901-2345' },
  { id: 9, name: '유현준', department: '디자인', position: '그래픽 디자이너', status: 'leave', joinDate: new Date('2021-08-30'), email: 'yu.hj@company.com', phone: '010-9012-3456' },
  { id: 10, name: '임은진', department: '마케팅', position: '마케팅 팀장', status: 'active', joinDate: new Date('2018-04-12'), email: 'im.ej@company.com', phone: '010-0123-4567' },
  { id: 11, name: '권준영', department: '개발', position: '개발자', status: 'active', joinDate: new Date('2022-01-10'), email: 'kwon.jy@company.com', phone: '010-1111-2222' },
  { id: 12, name: '강희진', department: '영업', position: '영업 팀장', status: 'active', joinDate: new Date('2019-06-20'), email: 'kang.hj@company.com', phone: '010-3333-4444' },
  { id: 13, name: '조수빈', department: '개발', position: 'DevOps 엔지니어', status: 'active', joinDate: new Date('2021-02-25'), email: 'jo.sb@company.com', phone: '010-5555-6666' },
  { id: 14, name: '신미경', department: 'HR', position: '채용담당자', status: 'inactive', joinDate: new Date('2022-09-01'), email: 'shin.mk@company.com', phone: '010-7777-8888' },
  { id: 15, name: '홍준호', department: '마케팅', position: '마케팅 담당자', status: 'active', joinDate: new Date('2021-05-15'), email: 'hong.jh@company.com', phone: '010-9999-0000' },
  { id: 16, name: '문현진', department: '개발', position: '개발자', status: 'active', joinDate: new Date('2022-03-20'), email: 'moon.hj@company.com', phone: '010-1010-2020' },
  { id: 17, name: '장윤희', department: '디자인', position: 'UI 디자이너', status: 'leave', joinDate: new Date('2021-12-01'), email: 'jang.yh@company.com', phone: '010-3030-4040' },
  { id: 18, name: '노영수', department: '영업', position: '영업사원', status: 'active', joinDate: new Date('2022-06-10'), email: 'noh.ys@company.com', phone: '010-5050-6060' },
  { id: 19, name: '마다희', department: '개발', position: '개발자', status: 'active', joinDate: new Date('2021-09-15'), email: 'ma.dh@company.com', phone: '010-7070-8080' },
  { id: 20, name: '배준수', department: '마케팅', position: '마케팅 담당자', status: 'inactive', joinDate: new Date('2022-08-05'), email: 'bae.js@company.com', phone: '010-9090-1010' },
]

// 날짜 포맷팅 함수
function formatDate(date: Date): string {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

// 상태 배지 색상
function getStatusBadge(status: Employee['status']) {
  const variants = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    leave: 'bg-yellow-100 text-yellow-800',
  }
  const labels = {
    active: '근무중',
    inactive: '휴직',
    leave: '휴가',
  }
  return <Badge className={variants[status]}>{labels[status]}</Badge>
}

export default function DataGridPage() {
  const [filterName, setFilterName] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // 필터링된 데이터
  const filteredEmployees = useMemo(() => {
    return sampleEmployees.filter((emp) => {
      const matchName = emp.name.toLowerCase().includes(filterName.toLowerCase())
      const matchDept = !filterDepartment || emp.department === filterDepartment
      const matchStatus = !filterStatus || emp.status === filterStatus
      return matchName && matchDept && matchStatus
    })
  }, [filterName, filterDepartment, filterStatus])

  // 초기화
  const handleReset = () => {
    setFilterName('')
    setFilterDepartment('')
    setFilterStatus('')
  }

  // 행 더블클릭 핸들러
  const handleRowDoubleClick = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsDialogOpen(true)
  }

  // 부서 목록 추출
  const departments = Array.from(new Set(sampleEmployees.map((emp) => emp.department)))

  return (
    <div className="min-h-screen py-20">
      <Container>
        <motion.div initial="initial" animate="animate" variants={fadeInUp} className="space-y-6">
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
                <BreadcrumbPage>데이터그리드 예제</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* 헤더 */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">데이터그리드</h1>
            <p className="text-lg text-muted-foreground">직원 정보 조회 (행 더블클릭하여 상세 정보 확인)</p>
          </div>

          {/* 조회 영역 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">조회 조건</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4 mb-4">
                {/* 이름 검색 */}
                <div className="space-y-2">
                  <Label>이름</Label>
                  <Input
                    placeholder="이름으로 검색..."
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                  />
                </div>

                {/* 부서 필터 */}
                <div className="space-y-2">
                  <Label>부서</Label>
                  <Select
                    value={filterDepartment || 'all'}
                    onValueChange={(v) => setFilterDepartment(v === 'all' ? '' : v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="부서 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 상태 필터 */}
                <div className="space-y-2">
                  <Label>상태</Label>
                  <Select
                    value={filterStatus || 'all'}
                    onValueChange={(v) => setFilterStatus(v === 'all' ? '' : v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="상태 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="active">근무중</SelectItem>
                      <SelectItem value="inactive">휴직</SelectItem>
                      <SelectItem value="leave">휴가</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 버튼 */}
                <div className="space-y-2">
                  <Label>&nbsp;</Label>
                  <div className="flex gap-2">
                    <Button onClick={handleReset} variant="outline" className="flex-1">
                      초기화
                    </Button>
                  </div>
                </div>
              </div>

              {/* 검색 결과 수 */}
              <div className="text-sm text-muted-foreground">
                총 {filteredEmployees.length}명 / {sampleEmployees.length}명
              </div>
            </CardContent>
          </Card>

          {/* 데이터그리드 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">직원 목록</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">ID</TableHead>
                      <TableHead>이름</TableHead>
                      <TableHead>부서</TableHead>
                      <TableHead>직책</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>가입일</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee) => (
                        <TableRow
                          key={employee.id}
                          onClick={() => handleRowDoubleClick(employee)}
                          onDoubleClick={() => handleRowDoubleClick(employee)}
                          className="cursor-pointer hover:bg-muted/50 transition-colors"
                        >
                          <TableCell className="font-medium">{employee.id}</TableCell>
                          <TableCell>{employee.name}</TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell>{getStatusBadge(employee.status)}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(employee.joinDate)}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          검색 결과가 없습니다.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* 팁 */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-900">
                💡 <strong>팁:</strong> 데이터그리드의 행을 더블클릭하면 직원의 상세 정보를 확인할 수 있습니다.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      {/* 상세 정보 모달 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>직원 상세 정보</DialogTitle>
            <DialogDescription>근무자 정보를 확인하세요.</DialogDescription>
          </DialogHeader>

          {selectedEmployee && (
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">이름</Label>
                <p className="text-lg font-semibold">{selectedEmployee.name}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">이메일</Label>
                <p className="text-sm">{selectedEmployee.email}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">전화번호</Label>
                <p className="text-sm">{selectedEmployee.phone}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">부서</Label>
                <p className="text-sm">{selectedEmployee.department}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">직책</Label>
                <p className="text-sm">{selectedEmployee.position}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">상태</Label>
                <div className="mt-1">{getStatusBadge(selectedEmployee.status)}</div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">가입일</Label>
                <p className="text-sm">{formatDate(selectedEmployee.joinDate)}</p>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Button onClick={() => setIsDialogOpen(false)}>닫기</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
