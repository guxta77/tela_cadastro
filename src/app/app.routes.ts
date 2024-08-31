import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authRoutes } from './features/welcome/routes';
import { registeredRoutes } from './features/registered/routes';

export const routes: Routes = [
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
        children: [...registeredRoutes]
    },
    {
        path: 'input',
        loadComponent: () =>
            import('./core/components/input/input.component').then(
                (m) => m.InputComponent
            )
    },
    {
        path: 'registered',
        loadComponent: () =>
            import('./features/registered/pages/registered/registered.component').then(
                (m) => m.RegisteredComponent
            )
    },
    { path: '**', redirectTo: '/welcome', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
