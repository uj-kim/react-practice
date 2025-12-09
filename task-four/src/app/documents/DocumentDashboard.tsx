"use client";

import { useMemo, useState } from "react";
import { DOCUMENTS, Document, DocumentStatus } from "@/data/documents";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SortKey = "updatedAt" | "title";
type SortDirection = "asc" | "desc";

export default function DocumentDashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | DocumentStatus>(
    "all"
  );
  const [sortKey, setSortKey] = useState<SortKey>("updatedAt");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const documents = DOCUMENTS;

  // ✅ TODO 1: 검색 + 상태 필터 + 정렬 로직 구현
  const filteredDocuments = useMemo(() => {
    let result = [...documents];

    // 1) 검색: title 에 search 포함 (대소문자 무시)
    const trimmedSearch = search.trim().toLowerCase();
    if (trimmedSearch) {
      result = result.filter((doc) => {
        return doc.title.toLowerCase().includes(trimmedSearch);
      });
    }
    // 2) 상태 필터: statusFilter !== "all" 이면 해당 status 만 남기기
    if (statusFilter !== "all") {
      result = result.filter((doc) => doc.status === statusFilter);
    }
    // 3) 정렬: sortKey + sortDir 기준으로 정렬
    //    - updatedAt: 최신순/오래된순
    //    - title: 사전순
    result.sort((a, b) => {
      let compare = 0;
      if (sortKey === "updatedAt") {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();
        compare = dateA - dateB;
      } else if (sortKey === "title") {
        compare = a.title.localeCompare(b.title);
      }
      return sortDir === "asc" ? compare : -compare;
    });

    return result;
  }, [documents, search, statusFilter, sortKey, sortDir]);

  const selectedDoc: Document | undefined = useMemo(
    () => filteredDocuments.find((d) => d.id === selectedId),
    [filteredDocuments, selectedId]
  );

  const handleHeaderClick = (key: SortKey) => {
    // ✅ TODO 2: 헤더 클릭 시 정렬 기준/방향 토글
    // 같은 컬럼을 다시 클릭하면 asc/desc 토글,
    // 다른 컬럼 클릭하면 해당 컬럼 desc 로 시작
    setSortKey((prevKey) => {
      if (prevKey === key) {
        setSortDir((prevDir) => (prevDir === "asc" ? "desc" : "asc"));
        return prevKey;
      } else {
        setSortDir("desc");
        return key;
      }
    });
  };

  const formatDate = (iso: string) => {
    // 최소한 yyyy-mm-dd hh:mm 형식으로 보여주기
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(
      2,
      "0"
    )}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  const statusLabel: Record<DocumentStatus, string> = {
    draft: "작성 중",
    active: "사용 중",
    archived: "보관됨",
  };

  return (
    <div className="flex flex-col gap-4 p-6 lg:flex-row">
      {/* 왼쪽: 리스트 */}
      <Card className="flex-1">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle>문서 목록</CardTitle>
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <Input
              placeholder="문서 제목 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64"
            />
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="draft">작성 중</SelectItem>
                <SelectItem value="active">사용 중</SelectItem>
                <SelectItem value="archived">보관됨</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {/* ✅ TODO 3: 빈 상태 처리 */}
          {/* 검색/필터 결과가 없을 경우 "검색 결과가 없습니다" 메시지 */}
          {filteredDocuments.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              검색 결과가 없습니다.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">문서 ID</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleHeaderClick("title")}
                  >
                    제목
                  </TableHead>
                  <TableHead>작성자</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead
                    className="cursor-pointer w-40"
                    onClick={() => handleHeaderClick("updatedAt")}
                  >
                    마지막 수정일
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow
                    key={doc.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedId(doc.id)}
                  >
                    <TableCell className="font-mono text-xs">
                      {doc.id}
                    </TableCell>
                    <TableCell className="font-medium">{doc.title}</TableCell>
                    <TableCell>{doc.owner}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          doc.status === "active"
                            ? "default"
                            : doc.status === "draft"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {statusLabel[doc.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(doc.updatedAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* 오른쪽: 상세 패널 */}
      <Card className="w-full lg:w-96">
        <CardHeader>
          <CardTitle>문서 상세</CardTitle>
        </CardHeader>
        <CardContent>
          {/* ✅ TODO 4: 선택된 문서가 없을 때 / 있을 때 UI */}
          {/* - 선택된 문서가 없으면: "좌측에서 문서를 선택하세요" */}
          {/* - 있을 때: id, title, owner, status, updatedAt 표시 */}
          {/*   + 간단한 설명 텍스트 한 줄 정도 추가 */}
          {!selectedDoc ? (
            <div className="text-sm text-muted-foreground py-10 text-center">
              좌측에서 문서를 선택하세요.
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="text-xs text-muted-foreground">문서ID</div>
                <div className="font-mono text-sm">{selectedDoc.id}</div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">문서 제목</div>
                <div className="font-medium">{selectedDoc.title}</div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">문서 상태</div>
                <Badge
                  variant={
                    selectedDoc.status === "active"
                      ? "default"
                      : selectedDoc.status === "draft"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {statusLabel[selectedDoc.status]}
                </Badge>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">문서 요약</div>
                <div className="text-sm">
                  이 문서는 {selectedDoc.title}에 관한 전자결재 문서이며, 최근
                  담당자({selectedDoc.owner})에 의해 업데이트되었습니다.
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
