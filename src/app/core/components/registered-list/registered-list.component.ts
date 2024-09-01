import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../back-button/back-button.component';
import { Router } from '@angular/router';
import { ItemService } from './services/item.service';
import { Observable, Subscription } from 'rxjs';

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
  private items: any[] = [];

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
      this.items$.subscribe(items => this.items = items)
    );
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

  startEdit(index: number): void {
    this.editingIndex = index;
    this.editForm.patchValue(this.items[index]);
  }

  saveEdit(): void {
    if (this.editForm.valid && this.editingIndex !== null) {
      const updatedItem = this.editForm.value;
      const id = this.items[this.editingIndex]?.id;
      if (id) {
        this.itemService.updateItem(id, updatedItem).then(() => {
          this.editingIndex = null;
          this.itemService.getItems().subscribe(updatedItems => {
            this.items = updatedItems;
          });
        });
      }
    }
  }

  cancelEdit(): void {
    this.editingIndex = null;
  }

  deleteItem(index: number): void {
    const id = this.items[index]?.id;
    if (id) {
      this.itemService.deleteItem(id).then(() => {
        this.itemService.getItems().subscribe(updatedItems => {
          this.items = updatedItems;
        });
      });
    }
  }

  goToInput(): void {
    this.router.navigate(['/welcome']);
  }
}
