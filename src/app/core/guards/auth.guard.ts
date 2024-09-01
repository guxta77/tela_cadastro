import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ItemService } from '../components/registered-list/services/item.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private itemService: ItemService, private router: Router) {}

  canActivate(): boolean {
    const user = this.itemService.getCurrentUser();
    if (user) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
