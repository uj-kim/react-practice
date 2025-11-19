import { useState } from "react";

export default function App() {
  const [checkedList, setCheckedList] = useState<CheckedList>(() => {
    // TERM_LIST.map((term) => term.defaultChecked)
    // 초기값 ('필수' 체크되어 있는 값 기준으로 렌더링)
    const firstValues: CheckedList = {};
    TERM_LIST.forEach((term) => {
      firstValues[term.id] = term.defaultChecked;
    });
    return firstValues;
  });
  // const allChecked = checkedList.every((term) => checkedList[term.id]);
  // 각 리스트에 대해 checkedList[term.id]가 전부 true인지 검사
  const allChecked = TERM_LIST.every((term) => checkedList[term.id]);

  const handleToggleItem = (id: number) => {
    // 피드백 :index 기반으로 하면 추후 데이터 추가/수정시 체크박스 상태랑 실제 항목이 안 맞을 우려가 있음
    // 해결 : index -> id기반으로 변경
    // setCheckedList((prev) => {
    // next -> newCheckedList 좀 더 시맨틱한 변수명 사용
    // const newCheckedList = [...prev];
    // newCheckedList = !newCheckedList[index];
    // return newCheckedList;

    setCheckedList((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleAll = () => {
    const newChecked = !allChecked;
    // setCheckedList(TERM_LIST.map(() => newChecked));
    const update: CheckedList = {};
    TERM_LIST.forEach((term) => {
      update[term.id] = newChecked;
    });
    setCheckedList(update);
  };

  const allRequiredChecked = TERM_LIST.every((term) =>
    term.required ? checkedList[term.id] : true
  );

  return (
    <div>
      <h1>약관 동의</h1>
      <div className="all-check">
        <label>
          <input
            type="checkbox"
            checked={allChecked}
            onChange={handleToggleAll}
          />
          <span>전체 동의</span>
        </label>
      </div>
      <ul>
        {TERM_LIST.map((term) => (
          <ListItem
            key={term.id}
            term={term}
            checked={checkedList[term.id]}
            onToggle={() => handleToggleItem(term.id)}
          />
        ))}
      </ul>
      <button disabled={!allRequiredChecked}> 동의하기 </button>
    </div>
  );
}

type CheckedList = Record<number, boolean>;

type ListItemProps = {
  term: Term;
  checked: boolean;
  onToggle: () => void;
};
function ListItem({ term, checked, onToggle }: ListItemProps) {
  const isRequired = term.required ? "[필수]" : "[선택]";
  return (
    <li>
      <input type="checkbox" checked={checked} onChange={onToggle} />
      <span>
        {isRequired} {term.name}
      </span>
    </li>
  );
}
const TERM_LIST: Term[] = [
  { id: 1, name: "이용약관 동의", defaultChecked: true, required: true },
  {
    id: 2,
    name: "개인정보 수집 및 이용 동의",
    defaultChecked: true,
    required: true,
  },
  {
    id: 3,
    name: "마케팅 정보 수신 동의",
    defaultChecked: true,
    required: true,
  },
  {
    id: 4,
    name: "마케팅 정보 수신 동의",
    defaultChecked: false,
    required: false,
  },
  {
    id: 5,
    name: "마케팅 정보 수신 동의",
    defaultChecked: false,
    required: false,
  },
];

type Term = {
  id: number;
  name: string;
  defaultChecked: boolean;
  required: boolean;
};
