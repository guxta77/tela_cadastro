import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { firestore } from '../../../../firebase-config';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsCollection = collection(firestore, 'items');
  private itemsSubject = new BehaviorSubject<any[]>([]);
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor() {
    this.loadItems();
  }

  private loadItems(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    let itemsQuery;
    if (currentUser?.username === 'Guxta77') {
      itemsQuery = this.itemsCollection;
    } else if (currentUser?.username) {
      itemsQuery = query(this.itemsCollection, where('username', '==', currentUser.username));
    } else {
      itemsQuery = query(this.itemsCollection, where('username', '==', ''));
    }

    console.log('Items Query:', itemsQuery);

    getDocs(itemsQuery).then(querySnapshot => {
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.itemsSubject.next(items);
    }).catch((error: any) => {
      console.error('Erro ao carregar os itens:', error);
    });
  }

  getItems(): Observable<any[]> {
    return this.itemsSubject.asObservable();
  }

  addItem(item: any): Promise<void> {
    return addDoc(this.itemsCollection, item).then(() => {
      this.loadItems();
    }).catch((error: any) => {
      console.error('Erro ao adicionar item:', error);
      throw error;
    });
  }

  updateItem(id: string, updatedItem: any): Promise<void> {
    const itemDoc = doc(firestore, `items/${id}`);
    return updateDoc(itemDoc, updatedItem).then(() => {
      this.loadItems();
    }).catch((error: any) => {
      console.error('Erro ao atualizar item:', error);
      throw error;
    });
  }

  deleteItem(id: string): Promise<void> {
    const itemDoc = doc(firestore, `items/${id}`);
    return deleteDoc(itemDoc).then(() => {
      this.loadItems();
    }).catch((error: any) => {
      console.error('Erro ao deletar item:', error);
      throw error;
    });
  }

  authenticate(username: string, password: string): Promise<boolean> {
    if (!username || !password) {
      console.error('Username ou password não fornecidos');
      return Promise.resolve(false);
    }

    const userQuery = query(this.itemsCollection, where('username', '==', username), where('password', '==', password));

    return getDocs(userQuery).then(snapshot => {
      if (!snapshot.empty) {
        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.currentUserSubject.next(userData);
        return true;
      } else {
        return false;
      }
    }).catch((error: any) => {
      console.error('Erro ao autenticar o usuário:', error);
      return false;
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    this.currentUserSubject.next(user);
    return this.currentUserSubject.asObservable();
  }
}
