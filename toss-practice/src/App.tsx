import "./App.css";
import { useState } from "react";
import FeatureCard from "./components/FeatureCard";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      {/* top */}
      <input
        type="text"
        placeholder="어떤 실험을 검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      ></input>
      <FeatureCard
        feature={{
          id: "1",
          name: "New Feature",
          description: "This is a new feature",
          status: "enabled",
          audience: "all",
        }}
      />
    </>
  );
}

export default App;
