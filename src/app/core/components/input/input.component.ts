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
  isSubmitDisabled = true;
  passwordType: 'password' | 'text' = 'password';

  constructor(private fb: FormBuilder, private router: Router, private itemService: ItemService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(16), Validators.max(99)]],
      musicGenre: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.isSubmitDisabled = !this.loginForm.valid;
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.itemService.addItem(formValue);
      
      document.body.classList.add('inverted-gradient');
      
      setTimeout(() => {
        this.router.navigate(['/registered']);
        document.body.classList.remove('inverted-gradient');
      }, 500);
    } else {
      console.log('Formulário inválido');
    }
  }

  togglePasswordVisibility(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.passwordType = checkbox.checked ? 'text' : 'password';
  }
}
