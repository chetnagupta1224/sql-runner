// src/components/Sidebar.jsx

import { useState } from "react";

export default function Sidebar({
  tables,
  schema,
  onTableClick,     // triggers data fetch from backend
  selectedTableInfo // data returned from backend for a table
}) {
  const [showInfo, setShowInfo] = useState(false);

  function handleTableSelect(table) {
    setShowInfo(true);
    onTableClick(table);
  }

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Tables</h2>

      <ul className="sidebar-list">
        {tables.map((table) => (
          <li key={table}>
            <button
              className="sidebar-btn"
              onClick={() => handleTableSelect(table)}
            >
              {table}
            </button>
          </li>
        ))}
      </ul>

      {/* Toggle Button */}
      {selectedTableInfo && (
        <button
          className="sidebar-toggle"
          onClick={() => setShowInfo(!showInfo)}
        >
          {showInfo ? "Hide Details" : "Show Details"}
        </button>
      )}

      {/* Table Info Panel */}
      {showInfo && selectedTableInfo && (
        <div className="table-info-panel">
          <h3>{selectedTableInfo.name}</h3>

          <strong>Columns</strong>
          <ul>
            {selectedTableInfo.columns.map((col) => (
              <li key={col.name}>
                {col.name} — {col.type}
              </li>
            ))}
          </ul>

          <strong>Relations</strong>
          <ul>
            {schema[selectedTableInfo.name]?.relations?.length ? (
              schema[selectedTableInfo.name].relations.map((rel, i) => (
                <li key={i}>
                  {rel.column} ➝ {rel.references.table}.{rel.references.column}
                </li>
              ))
            ) : (
              <li>No relations</li>
            )}
          </ul>

          <strong>Sample Rows</strong>
          <div className="sample-block">
            {selectedTableInfo.sample_rows.length === 0 ? (
              <p>No sample rows</p>
            ) : (
              selectedTableInfo.sample_rows.map((row, i) => (
                <pre key={i}>{JSON.stringify(row, null, 2)}</pre>
              ))
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
