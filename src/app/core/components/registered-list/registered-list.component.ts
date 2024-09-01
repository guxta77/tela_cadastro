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

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

  startEdit(index: number): void {
    this.editingIndex = index;
    // Subscribe to items$ to get the current items
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
      const id = this.editForm.value.id; // Obter o ID diretamente do formulário
      if (id) {
        this.itemService.updateItem(id, updatedItem).then(() => {
          this.editingIndex = null;
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
        });
      }
    });
  }

  goToInput(): void {
    this.router.navigate(['/welcome']);
  }
}
