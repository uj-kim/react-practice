export type PriorityTask = {
  id: number;
  title: string;
  priority: "low" | "medium" | "high";
};

export function sortByPriority(tasks: PriorityTask[]): PriorityTask[] {
  // TODO 03:
  // priority 순서: high > medium > low
  // 이 순서대로 정렬된 새로운 배열을 반환하세요.
  const order = { high: 3, medium: 2, low: 1 };

  return [...tasks].sort((a, b) => order[a.priority] - order[b.priority]);
}
