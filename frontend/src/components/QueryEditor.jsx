import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { oneDark } from "@codemirror/theme-one-dark";
import { autocompletion } from "@codemirror/autocomplete";

export default function QueryEditor({ onRun }) {
  const [query, setQuery] = useState("SELECT * FROM Customers LIMIT 5;");

  return (
    <div className="query-editor">
      <CodeMirror
        value={query}
        height="200px"
        theme={oneDark}
        extensions={[
            sql(),
            autocompletion()
        ]}
        onChange={(value) => setQuery(value)}
      />

      <button
        className="run-btn"
        style={{ marginTop: "10px" }}
        onClick={() => onRun(query)}
      >
        Run Query
      </button>
    </div>
  );
}
