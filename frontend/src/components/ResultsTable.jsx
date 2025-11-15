// src/components/ResultsTable.jsx

export default function ResultsTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <div className="no-data">No data found</div>;
  }

  const columns = Object.keys(rows[0]);

  return (
    <div className="table-wrapper">
      <table className="styled-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
