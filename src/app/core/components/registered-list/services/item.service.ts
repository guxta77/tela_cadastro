import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: any[] = JSON.parse(localStorage.getItem('items') || '[]');

  constructor() {}

  getItems(): any[] {
    return this.items;
  }

  addItem(item: any): void {
    this.items.push(item);
    this.saveItems();
  }

  updateItem(index: number, updatedItem: any): void {
    this.items[index] = updatedItem;
    this.saveItems();
  }

  deleteItem(index: number): void {
    this.items.splice(index, 1);
    this.saveItems();
  }

  private saveItems(): void {
    localStorage.setItem('items', JSON.stringify(this.items));
  }
}
