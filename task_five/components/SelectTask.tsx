// @ts-nocheck
import { SimpleTask } from "../utils/collections";
import { useState } from "react";

type SelectTaskProps = {
  tasks: SimpleTask[];
};

export function SelectTask({ tasks }: SelectTaskProps) {
  // TODO 05:
  // 클릭한 task의 id를 local state로 저장하고
  // 선택된 항목은 굵게 표시하세요.
  // selectedId 상태 만들기 (number | null)
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <ul>
      {tasks.map((t) => (
        <li
          key={t.id}
          // TODO: 클릭하면 selectedId 변경
          onClick={() => setSelectedId(t.id)}
          style={{
            fontWeight: selectedId === t.id ? "bold" : "normal",
            cursor: "pointer",
          }}
        >
          {t.title}
        </li>
      ))}
    </ul>
  );
}
