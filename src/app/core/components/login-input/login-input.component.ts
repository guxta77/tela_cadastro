import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../registered-list/services/item.service';

@Component({
  selector: 'app-login-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.scss']
})
export class LoginInputComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private itemService: ItemService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.successMessage = navigation.extras.state['successMessage'] || null;
    }
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    this.itemService.authenticate(username, password).then(isAuthenticated => {
      if (isAuthenticated) {
        console.log('Login bem-sucedido, redirecionando para registered');
        localStorage.setItem('currentUser', JSON.stringify({ username })); // Salvando o usuário
        this.router.navigate(['/registered']);
      } else {
        this.errorMessage = 'Credenciais inválidas';
      }
    }).catch(error => {
      console.error('Erro ao autenticar', error);
      this.errorMessage = 'Erro ao autenticar. Tente novamente.';
    });
  }  

  goToRegister(): void {
    this.router.navigate(['/welcome']);
  }
}
