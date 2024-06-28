import postgres from "postgres";

const sql = postgres("postgresql://admin:admin@localhost:5432/my_db");

async function seed() {
  await sql`
    INSERT INTO products(id, name, price)
    VALUES ('a5f6e14e-2b12-4c2b-ae63-f85fbe05f141', 'produto-01', 134.50)`;
}

seed().then(() => {
  console.log("Seeded ✅");
  sql.end();
});
