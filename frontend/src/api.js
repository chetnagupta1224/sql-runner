const API_BASE = "http://127.0.0.1:8000"; // todo: use env

export async function getTables() {
  const res = await fetch(`${API_BASE}/tables`);
  return res.json();
}

export async function getTableInfo(name) {
  const res = await fetch(`${API_BASE}/table/${name}`);
  return res.json();
}

export async function runQuery(sql) {
  const res = await fetch(`${API_BASE}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sql }),
  });

  return res.json();
}
