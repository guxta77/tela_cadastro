import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../../../firebase-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsCollection = collection(firestore, 'items');

  constructor() {}

  getItems(): Observable<any[]> {
    return new Observable(observer => {
      getDocs(this.itemsCollection).then(querySnapshot => {
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        observer.next(items);
      }).catch(error => observer.error(error));
    });
  }

  addItem(item: any) {
    return addDoc(this.itemsCollection, item);
  }

  updateItem(id: string, item: any) {
    const itemDoc = doc(firestore, `items/${id}`);
    return updateDoc(itemDoc, item);
  }

  deleteItem(id: string) {
    const itemDoc = doc(firestore, `items/${id}`);
    return deleteDoc(itemDoc);
  }
}
