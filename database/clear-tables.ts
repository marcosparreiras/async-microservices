import postgres, { type Sql } from "postgres";

export async function clearTables(sql: Sql) {
  await sql`DELETE FROM orders`;
  await sql`DELETE FROM products`;
}

if (process.argv.includes("--run")) {
  const sql = postgres("postgresql://admin:admin@localhost:5432/my_db");
  clearTables(sql).then(() => {
    console.log("Tables reseted ✅");
    sql.end();
  });
}
