export interface Product {
    id: number;
    name: string;
    description: string; 
    specs: string[]; 
    price: number;
    oldPrice: number | null;
    imageUrl: string;
    stock: number;
    category: string;
}