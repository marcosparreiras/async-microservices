export class ProductNotFoundException extends Error {
  constructor() {
    super("Product not found");
  }
}
