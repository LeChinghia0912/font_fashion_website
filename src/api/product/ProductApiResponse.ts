export interface Product {
    _id: string;
    name: string;
    productCategory: string;
    price: string;
    introduce: string;
    detail: string;
    preserve: string;
    image: string;
}

export interface ProductApiResponse {
    products: any;
    details: Product | null;
}
