import postgres, { type Sql } from "postgres";

export async function seed(sql: Sql) {
  await sql`
  INSERT INTO products(id, name, price)
  VALUES ('a5f6e14e-2b12-4c2b-ae63-f85fbe05f141', 'produto-01', 134.50)`;

  await sql`INSERT INTO orders(id, product_id, created_at, price)
  VALUES('f9fa9655-d96c-47ae-9c4f-cb83bfb644b8', 'a5f6e14e-2b12-4c2b-ae63-f85fbe05f141', '2024-06-28', 130.50)`;
}

if (process.argv.includes("--run")) {
  const sql = postgres("postgresql://admin:admin@localhost:5432/my_db");
  seed(sql).then(() => {
    console.log("Seeded ✅");
    sql.end();
  });
}
