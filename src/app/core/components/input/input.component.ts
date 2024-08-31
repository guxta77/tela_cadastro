import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemService } from '../registered-list/services/item.service';
import { Router } from '@angular/router';       // Importe o Router

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.itemService.addItem({
        name: formValue.username,
        email: formValue.password
      });
      this.loginForm.reset();
      this.router.navigate(['/registered']);  // Redireciona para a tela de itens cadastrados
    } else {
      console.log('Formulário inválido');
    }
  }
}
