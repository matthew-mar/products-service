import { Product } from "../../dto/product";

export type CreateResponseSchema = Product;

export class CreateProductResponse {
    constructor(private product: Product) {}

    public get json(): CreateResponseSchema {
        return this.product;
    }
}
