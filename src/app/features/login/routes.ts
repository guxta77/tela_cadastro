import { Routes } from "@angular/router";

export const loginRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/login/login.component').then(
                (m) => m.LoginComponent
            )
    }
]