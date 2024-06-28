import { randomUUID } from "node:crypto";

export class Order {
  private _id: string;
  private _productId: string;
  private _createdAt: Date;
  private _approvedAt?: Date;
  private _price: number;

  get id(): string {
    return this._id;
  }

  get productId(): string {
    return this._productId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get approvedAt(): Date | null {
    return this._approvedAt ?? null;
  }

  get price(): number {
    return this._price;
  }

  public approve(): void {
    this._approvedAt = new Date();
  }

  public constructor(
    id: string,
    productId: string,
    createdAt: Date,
    price: number,
    approvedAt?: Date
  ) {
    this._id = id;
    this._productId = productId;
    this._createdAt = createdAt;
    this._price = price;
    this._approvedAt = approvedAt;
  }

  public static create(productId: string, price: number) {
    const id = randomUUID();
    const createdAt = new Date();
    return new Order(id, productId, createdAt, price);
  }
}
