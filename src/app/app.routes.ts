import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { authRoutes } from './features/welcome/routes';
import { registeredRoutes } from './features/registered/routes';
import { loginRoutes } from './features/login/routes';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./core/layouts/login-layout/login-layout.component').then(
                (m) => m.LoginLayoutComponent
            ),
        children: [...loginRoutes]
    },
    {
        path: '',
        loadComponent: () =>
            import('./core/layouts/welcome-layout/welcome-layout.component').then(
                (m) => m.WelcomeLayoutComponent
            ),
        children: [...authRoutes]
    },
    {
        path: '',
        loadComponent: () =>
            import('./core/layouts/registered-layout/registered-layout.component').then(
                (m) => m.RegisteredLayoutComponent
            ),
        children: [...registeredRoutes],
        canActivate: [AuthGuard]
    },
    {
        path: 'input',
        loadComponent: () =>
            import('./core/components/input/input.component').then(
                (m) => m.InputComponent
            ),
        canActivate: [AuthGuard]
    },
    {
        path: 'registered',
        loadComponent: () =>
            import('./features/registered/pages/registered/registered.component').then(
                (m) => m.RegisteredComponent
            ),
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
