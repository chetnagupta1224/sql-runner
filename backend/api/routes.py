from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import sqlite3

from db import fetch_all, get_db_connection, execute_write  # import db helpers


router = APIRouter()


class QueryRequest(BaseModel):
    sql: str


@router.get("/tables")
def list_tables():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
        return [row[0] for row in cur.fetchall()]
    finally:
        conn.close()


@router.get("/table/{table_name}")
def table_info(table_name: str):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        # Columns
        cur.execute(f"PRAGMA table_info({table_name});")
        cols = [{"cid": r[0], "name": r[1], "type": r[2]} for r in cur.fetchall()]

        # Foreign keys
        cur.execute(f"PRAGMA foreign_key_list({table_name});")
        fks = [{
            "column": r[3],
            "ref_table": r[2],
            "ref_column": r[4]
        } for r in cur.fetchall()]

        # Sample rows
        cur.execute(f"SELECT * FROM {table_name} LIMIT 5;")
        sample_rows = [dict(r) for r in cur.fetchall()]

        return {
            "name": table_name,
            "columns": cols,
            "sample_rows": sample_rows,
            "foreign_keys": fks
        }
    except sqlite3.Error as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()


@router.post("/run")
def run_query(req: QueryRequest):
    sql = req.sql.strip()

    if not sql:
        raise HTTPException(status_code=400, detail="Query is empty")

    try:
        results = fetch_all(sql)
        columns = list(results[0].keys()) if results else []

        return {
            "type": "select",
            "rows": results,
            "columns": columns
        }

    except sqlite3.Error as e:
        raise HTTPException(status_code=400, detail=str(e))
