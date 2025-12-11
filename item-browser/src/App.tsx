import { useState } from "react";

const ITEMS = [
  { id: 1, name: "사과", category: "과일" },
  { id: 2, name: "바나나", category: "과일" },
  { id: 3, name: "당근", category: "야채" },
  { id: 4, name: "브로콜리", category: "야채" },
  { id: 5, name: "우유", category: "유제품" },
  { id: 6, name: "치즈", category: "유제품" },
];

export default function ItemBrowser() {
  // TODO 1: 검색 기능 구현
  const [search, setSearch] = useState("");
  // TODO 2: 카테고리 필터링 구현
  const [category, setCategory] = useState("전체");

  const filtered = ITEMS.filter((item) => {
    const matchedName = item.name.toLowerCase().includes(search.toLowerCase());
    const matchedCategory = category === "전체" || item.category === category;
    return matchedName && matchedCategory;
  });

  // TODO 3: 정렬 기능 구현
  const [isSorted, setIsSorted] = useState<"오름차순" | "내림차순">("오름차순");

  const sorted = [...filtered].sort((a, b) => {
    if (isSorted === "오름차순") {
      return a.name.localeCompare(b.name);
    }
    return b.name.localeCompare(a.name);
  });

  // TODO 4: 상세보기 기능 구현
  const [isSelectedId, setIsSelectedId] = useState<number | null>(null);

  const selected = sorted.find((item) => item.id === isSelectedId);
  return (
    <div>
      {/* TODO */}
      <input onChange={(e) => setSearch(e.target.value)} />
      <div>
        <button onClick={() => setCategory("전체")}>전체</button>
        <button onClick={() => setCategory("과일")}>과일</button>
        <button onClick={() => setCategory("유제품")}>유제품</button>
        <button onClick={() => setCategory("야채")}>야채</button>
      </div>
      <div>
        <button onClick={() => setIsSorted("오름차순")}>오름차순</button>
        <button onClick={() => setIsSorted("내림차순")}>내림차순</button>
      </div>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ width: "200px" }}>
          <ul>
            {sorted.map((f) => (
              <li
                key={f.id}
                onClick={() => setIsSelectedId(f.id)}
                style={{
                  fontWeight: isSelectedId === f.id ? "bold" : "normal",
                }}
              >
                {f.name}
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{ flex: 1, borderLeft: "1px solid #ccc", paddingLeft: "20px" }}
        >
          {selected && (
            <div>
              <p>ID : {selected.id}</p>
              <p>이름 : {selected.name}</p>
              <p>카테고리 : {selected.category}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
