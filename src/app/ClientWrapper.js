"use client";

import { useState } from "react";

export default function ClientWrapper({ children }) {
  const [count, setCount] = useState(0); // example hook

  return (
    <div>
      {/* you can keep global state, context, providers here */}
      <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
      {children}
    </div>
  );
}
