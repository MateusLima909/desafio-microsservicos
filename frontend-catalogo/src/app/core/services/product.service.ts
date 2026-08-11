import { Injectable } from "@angular/core";

import { Product } from "../../models/product.model";
import { PRODUCTS } from "../../data/product.mock";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private products: Product[] = PRODUCTS;

    getProducts(): Product[] {
        return this.products;
    }

    getProductById(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    getProductsByCategory(category: string): Product[] {
        if (category === 'Todos') {
            return this.products;
        }

        return this.products.filter(
            product => product.category === category
        );
    }
}