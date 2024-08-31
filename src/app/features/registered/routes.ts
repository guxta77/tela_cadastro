import { Routes } from "@angular/router";

export const registeredRoutes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    {
        path: 'registered',
        loadComponent: () =>
            import('./pages/registered/registered.component').then(
                (m) => m.RegisteredComponent
            )
    }
]