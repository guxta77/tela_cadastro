import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    setTimeout(() => {
      document.querySelector('.background-container')?.classList.add('transition-bg');
    }, 0);
  }
}
