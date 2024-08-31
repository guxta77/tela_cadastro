import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-welcome-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './welcome-layout.component.html',
  styleUrl: './welcome-layout.component.scss'
})
export class WelcomeLayoutComponent {

}
