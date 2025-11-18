import { useState } from "react";
import "./App.css";
import { Button } from "./features/Button";
import { type Status, StatusBadge } from "./features/StatusBadge";

function App() {
  const [status, setStatus] = useState<Status>("offline");

  const handleToOnline = () => {
    setStatus("online");
  };
  const handleToOffline = () => {
    setStatus("offline");
  };

  return (
    <>
      <StatusBadge status={status} />
      <Button
        label="toOnline"
        variant={status === "online" ? "primary" : "secondary"}
        disabled={status === "online"}
        onClick={handleToOnline}
      />
      <Button
        label="toOffline"
        variant={status === "offline" ? "primary" : "secondary"}
        disabled={status === "offline"}
        onClick={handleToOffline}
      />
    </>
  );
}

export default App;
