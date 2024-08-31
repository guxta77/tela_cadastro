import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private storageKey = 'items';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  getItems(): { name: string; email: string }[] {
    const items = localStorage.getItem(this.storageKey);
    return items ? JSON.parse(items) : [];
  }

  addItem(item: { name: string; email: string }): void {
    const items = this.getItems();
    items.push(item);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  updateItem(index: number, item: { name: string; email: string }): void {
    const items = this.getItems();
    items[index] = item;
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  deleteItem(index: number): void {
    const items = this.getItems();
    items.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
