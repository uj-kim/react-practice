import { useState } from "react";

export default function App() {
  const [checkedList, setCheckedList] = useState<boolean[]>(
    TERM_LIST.map((term) => term.defaultChecked)
  );
  const allChecked = checkedList.every((v) => v);

  const handleToggleItem = (index: number) => {
    setCheckedList((prev) => {
      const newCheckedList = [...prev];
      newCheckedList[index] = !newCheckedList[index];
      return newCheckedList;
    });
  };

  const handleToggleAll = () => {
    const newChecked = !allChecked;
    setCheckedList(TERM_LIST.map(() => newChecked));
  };

  const allRequiredChecked = TERM_LIST.every((term, index) =>
    term.required ? checkedList[index] : true
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
        {TERM_LIST.map((term, index) => (
          <ListItem
            key={term.id}
            term={term}
            checked={checkedList[index]}
            onToggle={() => handleToggleItem(index)}
          />
        ))}
      </ul>
      <button disabled={!allRequiredChecked}> 동의하기 </button>
    </div>
  );
}

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
