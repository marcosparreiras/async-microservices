import type { Product } from "../../enterprise/product";

export interface ProductsRepository {
  findById(id: string): Promise<Product | null>;
}
