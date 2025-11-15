// src/App.jsx

import { useEffect, useState } from "react";
import { getTables, getTableInfo, runQuery } from "./api";

import Sidebar from "./components/Sidebar";
import QueryEditor from "./components/QueryEditor";
import ResultsTable from "./components/ResultsTable";

import "./styles.css";

export default function App() {
  const [tables, setTables] = useState([]);
  const [tableInfo, setTableInfo] = useState(null);
  const [queryResult, setQueryResult] = useState(null);
  const [error, setError] = useState("");

  // NEW: loading states
  const [loadingTables, setLoadingTables] = useState(false);
  const [loadingTableInfo, setLoadingTableInfo] = useState(false);
  const [loadingQuery, setLoadingQuery] = useState(false);

  // Load list of tables
  async function loadTables() {
    setLoadingTables(true);
    const list = await getTables();
    setTables(list);
    setLoadingTables(false);
  }

  useEffect(() => {
    loadTables();
  }, []);

  // When sidebar table clicked
  async function handleTableClick(name) {
    setError("");
    setQueryResult(null);
    setLoadingTableInfo(true);

    const info = await getTableInfo(name);
    setTableInfo(info);

    setLoadingTableInfo(false);
  }

  // When user runs SQL query
  async function handleRunQuery(sql) {
    setError("");
    setTableInfo(null);
    setQueryResult(null);
    setLoadingQuery(true);

    const data = await runQuery(sql);

    if (data.detail) {
      setError(data.detail);
      setLoadingQuery(false);
      return;
    }

    setQueryResult(data.rows);
    setLoadingQuery(false);

    // Reload tables after running the query
    loadTables();
  }

  return (
    <div className="app-container">
      <Sidebar tables={tables} onTableClick={handleTableClick} />

      <main className="main-area">
        <h1>SQL Runner</h1>

        <QueryEditor onRun={handleRunQuery} />

        {/* Loading + messages */}
        {loadingTables && <div className="loading">Loading tables...</div>}
        {loadingQuery && <div className="loading">Running query...</div>}
        {loadingTableInfo && <div className="loading">Loading table info...</div>}

        {error && <div className="error-box">{error}</div>}

        {/* Table Info */}
        {tableInfo && !loadingTableInfo && (
          <div className="table-info">
            <h2>Table Info</h2>

            <strong>Columns:</strong>
            <ul>
              {tableInfo.columns.map((c) => (
                <li key={c.name}>{c.name} — {c.type}</li>
              ))}
            </ul>

            <strong>Sample Rows:</strong>
            <ResultsTable rows={tableInfo.sample_rows} />
          </div>
        )}

        {/* Query Result */}
        {queryResult && !loadingQuery && (
          <div className="query-result">
            <h2>Query Result</h2>
            <ResultsTable rows={queryResult} />
          </div>
        )}
      </main>
    </div>
  );
}
