import postgres from "postgres";

const sql = postgres("postgresql://admin:admin@localhost:5432/my_db");

async function show() {
  await sql`DELETE FROM products`;
  await sql`DELETE FROM orders`;
}

show().then(() => {
  console.log("Tables reseted ✅");
  sql.end();
});
