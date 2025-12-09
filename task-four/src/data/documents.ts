export type DocumentStatus = "draft" | "active" | "archived";

export type Document = {
  id: string;
  title: string;
  owner: string;
  status: DocumentStatus;
  updatedAt: string; // ISO string
};

export const DOCUMENTS: Document[] = [
  {
    id: "DOC-001",
    title: "계약서_2025_삼성전자_공급계약",
    owner: "김서연",
    status: "active",
    updatedAt: "2025-11-20T10:32:00Z",
  },
  {
    id: "DOC-002",
    title: "인사규정_개정안_v3",
    owner: "박민수",
    status: "draft",
    updatedAt: "2025-11-22T08:15:00Z",
  },
  {
    id: "DOC-003",
    title: "보안정책_사내교육_자료",
    owner: "이정은",
    status: "archived",
    updatedAt: "2025-10-10T14:05:00Z",
  },
  {
    id: "DOC-004",
    title: "개인정보 처리방침(외부공개용)",
    owner: "최지훈",
    status: "active",
    updatedAt: "2025-11-25T09:00:00Z",
  },
  {
    id: "DOC-005",
    title: "프로젝트_X_기획서",
    owner: "김서연",
    status: "draft",
    updatedAt: "2025-11-28T18:45:00Z",
  },
];
