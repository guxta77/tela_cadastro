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
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.logout();

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(16), Validators.max(99)]],
      musicGenre: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
      this.successMessage = null;
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = null;
      this.successMessage = null;

      const formValue = this.loginForm.value;

      try {
        await this.itemService.addItem({
          username: formValue.username,
          password: formValue.password,
          email: formValue.email,
          phone: formValue.phone,
          age: formValue.age,
          musicGenre: formValue.musicGenre
        });
        this.successMessage = 'Cadastro efetuado com sucesso';
        this.loginForm.reset();
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

  goToLogin(): void {
    this.itemService.logout();
    this.router.navigate(['/login']);
  }
}
