import { Component } from '@angular/core';
import { InputComponent } from '../../../../core/components/input/input.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

}
