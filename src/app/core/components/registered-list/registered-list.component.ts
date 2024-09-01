import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../back-button/back-button.component';
import { Router } from '@angular/router';
import { ItemService } from './services/item.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-registered-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackButtonComponent],
  templateUrl: './registered-list.component.html',
  styleUrls: ['./registered-list.component.scss']
})
export class RegisteredListComponent implements OnInit, OnDestroy {
  items$: Observable<any[]>;
  editingIndex: number | null = null;
  editForm: FormGroup;
  private itemsSubject = new BehaviorSubject<any[]>([]);
  private itemsSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private itemService: ItemService
  ) {
    this.editForm = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
      phone: [''],
      age: [''],
      musicGenre: ['']
    });

    this.items$ = this.itemsSubject.asObservable();
  }

  ngOnInit(): void {
    this.itemsSubscription.add(
      this.itemService.getItems().pipe(
        tap(items => this.itemsSubject.next(items))
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

  startEdit(index: number): void {
    this.editingIndex = index;
    this.items$.subscribe(items => {
      const item = items[index];
      if (item) {
        this.editForm.patchValue(item);
      }
    });
  }

  saveEdit(): void {
    if (this.editForm.valid && this.editingIndex !== null) {
      const updatedItem = this.editForm.value;
      const id = this.itemsSubject.getValue()[this.editingIndex]?.id;
      if (id) {
        this.itemService.updateItem(id, updatedItem).then(() => {
          this.editingIndex = null;
          this.itemService.getItems().subscribe(items => this.itemsSubject.next(items));
        }).catch(error => {
          console.error('Error updating item:', error);
        });
      }
    }
  }
  

  cancelEdit(): void {
    this.editingIndex = null;
  }

  deleteItem(index: number): void {
    this.items$.subscribe(items => {
      const id = items[index]?.id;
      if (id) {
        this.itemService.deleteItem(id).then(() => {
          this.itemService.getItems().subscribe(items => this.itemsSubject.next(items));
        });
      }
    });
  }

  goToInput(): void {
    this.router.navigate(['/welcome']);
  }
}
