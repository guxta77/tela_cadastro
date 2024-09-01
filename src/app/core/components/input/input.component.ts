import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ItemService } from '../registered-list/services/item.service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;
  passwordType: 'password' | 'text' = 'password';
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private itemService: ItemService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(16), Validators.max(99)]],
      musicGenre: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = null;

      const formValue = this.loginForm.value;

      try {
        const existingItems = await this.itemService.getItems().toPromise();
        const itemExists = existingItems ? existingItems.some(item => item.username === formValue.username) : false;

        if (itemExists) {
          this.errorMessage = 'Item já cadastrado!';
        } else {
          await this.itemService.addItem(formValue);
          this.router.navigate(['/registered']);
        }
      } catch (error) {
        console.error('Erro ao cadastrar o item', error);
        this.errorMessage = 'Erro ao cadastrar o item. Tente novamente.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  togglePasswordVisibility(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.passwordType = checkbox.checked ? 'text' : 'password';
  }
}
