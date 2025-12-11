export type SimpleTask = {
  id: number;
  title: string;
  done: boolean;
};

export function getTitles(tasks: SimpleTask[]): string[] {
  // TODO 01: tasks 배열에서 모든 title만 모아서 반환하세요.
  // 예: [{title:'A'}, {title:'B'}] → ['A', 'B']
  return tasks.map((task) => task.title);
}

export function countDone(tasks: SimpleTask[]): number {
  // TODO 02: done === true 인 task가 몇 개인지 세어 반환하세요.
  return tasks.filter((task) => task.done).length;
}
