import sqlite3
from typing import Any, Dict, List, Optional

DATABASE_PATH = "sql_runner.db"  # file placed in backend/

def get_db_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row  # rows accessible by column name
    return conn

def fetch_all(query: str, params: Optional[tuple] = None) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(query, params or ())
        rows = cur.fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()

def execute_write(query: str, params: Optional[tuple] = None) -> Dict[str, Any]:
    # For INSERT/UPDATE/DELETE: run and return number of affected rows
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(query, params or ())
        conn.commit()
        return {"rowcount": cur.rowcount}
    finally:
        conn.close()
