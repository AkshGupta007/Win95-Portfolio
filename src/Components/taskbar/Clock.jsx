import React, { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        padding: "0 8px",
        borderLeft: "1px solid #888",
        display: "flex",
        alignItems: "center",
        fontSize: "12px",
        minWidth: "70px",
      }}
    >
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </div>
  );
}

export default Clock;
