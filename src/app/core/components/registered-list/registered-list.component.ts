import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemService } from './services/item.service';
import { BackButtonComponent } from '../back-button/back-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registered-list',
  standalone: true,
  imports: [FormsModule, BackButtonComponent, CommonModule],
  templateUrl: './registered-list.component.html',
  styleUrls: ['./registered-list.component.scss']
})
export class RegisteredListComponent implements OnInit {
  items: any[] = [];
  editingIndex: number | null = null;
  editForm: any = { username: '', password: '', musicGenre: '', email: '', phone: '', age: '' };
  musicGenres: string[] = ['Rock', 'Pop', 'Jazz', 'Classical', 'Hip-Hop', 'Country'];

  constructor(private itemService: ItemService, private router: Router) {}


  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }

  startEdit(index: number): void {
    this.editingIndex = index;
    this.editForm = { ...this.items[index] };
  }

  saveEdit(): void {
    if (this.editingIndex !== null) {
      this.itemService.updateItem(this.editingIndex, this.editForm);
      this.editingIndex = null;
      this.editForm = { username: '', password: '', musicGenre: '', email: '', phone: '', age: '' };
      this.items = this.itemService.getItems();
    }
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.editForm = { username: '', password: '', musicGenre: '', email: '', phone: '', age: '' };
  }

  deleteItem(index: number): void {
    this.itemService.deleteItem(index);
    this.items = this.itemService.getItems();
  }

  goToInput(): void {
    this.router.navigate(['/input']);
  }
}
