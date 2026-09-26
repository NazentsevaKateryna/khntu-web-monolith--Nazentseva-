import { AppError } from '../utils/AppError';

export class ProductService {
  private products = [
    { id: 1, title: 'Ноутбук Lenovo', price: 25000 },
    { id: 2, title: 'Смартфон Samsung', price: 15000 },
    { id: 3, title: 'Навушники Sony', price: 6500 }
  ];

  getAll() {
    return this.products;
  }

  getById(id: number) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new AppError('Товар не знайдено', 404);
    }
    return product;
  }
}