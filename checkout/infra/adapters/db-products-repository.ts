import postgres from "postgres";
import type { ProductsRepository } from "../../application/repositories/products-repository";
import { Product } from "../../enterprise/product";

export class DbProductsRepository implements ProductsRepository {
  private sql = postgres("postgresql://admin:admin@localhost:5432/my_db");

  async findById(id: string): Promise<Product | null> {
    const result = await this
      .sql`SELECT id, name, price FROM products WHERE id=${id}`;
    if (result.length === 0) {
      return null;
    }
    return new Product(result[0].id, result[0].name, result[0].price);
  }
}
