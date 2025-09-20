"use client";

import { useEffect, useState } from "react";
import AddTransaction from "./AddTransaction";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTransactions() {
    try {
      const res = await fetch("/api/transactions", {
        method: "GET",
        credentials: "include", // 🔥 send cookies with the request
      });

      console.log("Fetch response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error response:", errorText);
        throw new Error("Failed to fetch transactions");
      }

      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <AddTransaction />

      <h2 className="text-xl font-semibold">Your Transactions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((t) => (
            <li
              key={t.id}
              className="border p-3 rounded flex justify-between"
            >
              <span>
                {t.category} — {t.description || "No desc"}
              </span>
              <span
                className={
                  t.type === "income" ? "text-green-600" : "text-red-600"
                }
              >
                {t.type === "income" ? "+" : "-"}₹{t.amount}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
