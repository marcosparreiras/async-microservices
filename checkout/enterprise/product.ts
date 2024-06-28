import { randomUUID } from "node:crypto";

export class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get price(): number {
    return this._price;
  }

  public constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
  }

  public static create(name: string, price: number) {
    const id = randomUUID();
    return new Product(id, name, price);
  }
}
