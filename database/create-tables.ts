import postgres, { type Sql } from "postgres";

export async function createTables(sql: Sql) {
  await sql`
  CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY,
    name TEXT NOT NULL,
    price FLOAT NOT NULL
    );`;

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(36) PRIMARY KEY,
      product_id VARCHAR(36) NOT NULL,
      created_at DATE NOT NULL,
      approved_at DATE,
      price FLOAT NOT NULL,
      CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id)
      );`;
}
if (process.argv.includes("--run")) {
  const sql = postgres("postgresql://admin:admin@localhost:5432/my_db");
  createTables(sql).then(() => {
    console.log("Tables created ✅");
    sql.end();
  });
}
