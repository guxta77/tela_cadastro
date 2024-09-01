import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../../../firebase-config';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsCollection = collection(firestore, 'items');
  private itemsSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    this.loadItems();
  }

  private loadItems(): void {
    getDocs(this.itemsCollection).then(querySnapshot => {
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.itemsSubject.next(items);
    });
  }

  getItems(): Observable<any[]> {
    return this.itemsSubject.asObservable();
  }

  addItem(item: any): Promise<void> {
    return addDoc(this.itemsCollection, item).then(() => {
      this.loadItems();
    });
  }

  updateItem(id: string, item: any): Promise<void> {
    const itemDoc = doc(firestore, `items/${id}`);
    return updateDoc(itemDoc, item).then(() => {
      this.loadItems();
    });
  }

  deleteItem(id: string): Promise<void> {
    const itemDoc = doc(firestore, `items/${id}`);
    return deleteDoc(itemDoc).then(() => {
      this.loadItems();
    });
  }
}
