import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../../../core/components/registered-list/services/item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisteredListComponent } from '../../../../core/components/registered-list/registered-list.component';

@Component({
  selector: 'app-registered',
  standalone: true,
  imports: [CommonModule, FormsModule, RegisteredListComponent],
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.scss']
})
export class RegisteredComponent {
  constructor(private itemService: ItemService, private router: Router) {}

  goToInput(): void {
    this.router.navigate(['/input']);
  }
}
