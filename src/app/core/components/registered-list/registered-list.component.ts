import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../back-button/back-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registered-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackButtonComponent],
  templateUrl: './registered-list.component.html',
  styleUrls: ['./registered-list.component.scss']
})
export class RegisteredListComponent {
  items: any[] = [];
  editingIndex: number | null = null;
  editForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.editForm = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
      phone: [''],
      age: [''],
      musicGenre: ['']
    });
  }

  startEdit(index: number): void {
    this.editingIndex = index;
    this.editForm.patchValue(this.items[index]);
  }

  saveEdit(): void {
    if (this.editForm.valid && this.editingIndex !== null) {
      this.items[this.editingIndex] = this.editForm.value;
      this.editingIndex = null;
    }
  }

  cancelEdit(): void {
    this.editingIndex = null;
  }

  deleteItem(index: number): void {
    this.items.splice(index, 1);
  }

  goToInput(): void {
    this.router.navigate(['/input']);
  }
}
