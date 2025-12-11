// @ts-nocheck
import { SimpleTask } from "../utils/collections";

type TaskListProps = {
  tasks: SimpleTask[];
};

export function TaskList({ tasks }: TaskListProps) {
  // TODO 04: tasks 배열을 <li>로 렌더링하세요.
  // done 이 true면 (완료) 라는 표시를 붙이세요.
  // 예: "할 일 A (완료)" 또는 "할 일 B"

  return (
    <>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title}
            {t.done ? "(완료)" : ""}
          </li>
        ))}
      </ul>
    </>
  );
}
