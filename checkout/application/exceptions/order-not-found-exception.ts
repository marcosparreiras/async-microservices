export class OrderNotFoundException extends Error {
  constructor() {
    super("Order not found");
  }
}
