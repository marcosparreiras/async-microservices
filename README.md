## TODO's

- [x] Criar banco de dados com as tabelas de produtos e ordems

```sql
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(36) PRIMARY KEY,
  name TEXT NOT NULL,
  price FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(36) PRIMARY KEY,
  product_id VARCHAR(36) NOT NULL,
  created_at DATE NOT NULL,
  approved_at DATE,
  price FLOAT NOT NULL,
  CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products(id, name, price) VALUES ('a5f6e14e-2b12-4c2b-ae63-f85fbe05f141', 'produto-01', 134.50)
```

- [] Criar servico de checkout

- [] Criar servico de processar pagamentos

```ts
interface Input {
  orderId: string;
  price: number;
  paymentToken: string;
  createdAt: Date;
}
```
