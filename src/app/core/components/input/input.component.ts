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
      this.updateSubmitButtonState();
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.itemService.addItem(formValue);
      this.router.navigate(['/registered']);
    } else {
      console.log('Formulário inválido');
    }
  }

  get isSubmitDisabled(): boolean {
    return this.loginForm.invalid;
  }

  private updateSubmitButtonState(): void {
    const controls = this.loginForm.controls;
    const allFilled = Object.keys(controls).every(key => controls[key].value.trim() !== '');
    this.loginForm.patchValue({ allFilled });
  }
}
