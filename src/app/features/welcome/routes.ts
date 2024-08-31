import { Routes } from "@angular/router";

export const authRoutes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    {
        path: 'welcome',
        loadComponent: () =>
            import('./pages/welcome/welcome.component').then(
                (m) => m.WelcomeComponent
            )
    }
]