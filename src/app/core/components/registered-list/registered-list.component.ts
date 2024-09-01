import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../back-button/back-button.component';
import { Router } from '@angular/router';
import { ItemService } from './services/item.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private itemsSubscription: Subscription = new Subscription();
  private itemsSubject = new BehaviorSubject<any[]>([]);

  genres = ['Rock', 'Pop', 'Jazz', 'Clássica'];
  passwordType: 'password' | 'text' = 'password';

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

    this.items$ = this.itemService.getItems();
  }

  ngOnInit(): void {
    this.itemsSubscription.add(
      this.items$.pipe(
        map(items => this.itemsSubject.next(items))
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

  startEdit(index: number): void {
    this.editingIndex = index;
    this.editForm.patchValue(this.itemsSubject.getValue()[index]);
  }

  saveEdit(): void {
    if (this.editForm.valid && this.editingIndex !== null) {
      const updatedItem = this.editForm.value;
      const id = this.itemsSubject.getValue()[this.editingIndex]?.id;

      if (id) {
        this.itemService.updateItem(id, updatedItem).then(() => {
          this.editingIndex = null;
          this.itemService.getItems().subscribe(items => {
            this.itemsSubject.next(items);
          });
        }).catch(error => {
          console.error('Error updating item:', error);
        });
      }
    } else {
      console.error('Form is invalid or editingIndex is null');
    }
  }

  cancelEdit(): void {
    this.editingIndex = null;
  }

  deleteItem(index: number): void {
    const id = this.itemsSubject.getValue()[index]?.id;
    if (id) {
      this.itemService.deleteItem(id).then(() => {
        this.itemService.getItems().subscribe(items => {
          this.itemsSubject.next(items);
        });
      }).catch(error => {
        console.error('Error deleting item:', error);
      });
    }
  }

  goToInput(): void {
    this.router.navigate(['/welcome']);
  }

  togglePasswordVisibility(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.passwordType = checkbox.checked ? 'text' : 'password';
  }
}
